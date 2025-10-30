import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/projects - Get all active projects (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let query: any = supabase
      .from('projects')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    if (search) {
      query = query.ilike('title', `%${search}%`)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ projects: data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project (authenticated)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, icon, goal, days_left, category } = body

    // Basic validation
    if (!title || !description || !goal || days_left == null) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const goalNum = parseFloat(goal)
    const daysNum = parseInt(String(days_left), 10)

    if (isNaN(goalNum) || goalNum <= 0) {
      return NextResponse.json({ error: 'Invalid goal amount' }, { status: 400 })
    }

    if (isNaN(daysNum) || daysNum < 0) {
      return NextResponse.json({ error: 'Invalid days_left' }, { status: 400 })
    }

    const projectPayload = {
      title,
      description,
      icon: icon ?? '🚀',
      goal: goalNum,
      days_left: daysNum,
      category: category ?? null,
      creator_id: user.id,
      status: 'active',
    }

    const { data, error } = await (supabase as any)
      .from('projects')
      .insert(projectPayload as any)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ project: data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create project' }, { status: 500 })
  }
}

