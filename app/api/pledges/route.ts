import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/supabase/types'

// POST /api/pledges - Create a new pledge
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
    const { project_id, amount } = body

    // Validate required fields
    if (!project_id || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      )
    }

    // Create the pledge
    const pledgePayload = {
      project_id,
      user_id: user.id,
      amount,
    } as unknown as Database['public']['Tables']['pledges']['Insert']

    // use a typed-escape to avoid mismatched client generic inference in this build
    const { data, error } = await (supabase as any)
      .from('pledges')
      .insert(pledgePayload as any)
      .select()
      .single()

    if (error) throw error

    // Get updated project stats
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', project_id)
      .single()

    return NextResponse.json(
      {
        pledge: data,
        project,
        message: 'Pledge created successfully',
      },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create pledge' },
      { status: 500 }
    )
  }
}

// GET /api/pledges - Get user's pledges
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('pledges')
      .select(
        `
        *,
        projects (*)
      `
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ pledges: data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch pledges' },
      { status: 500 }
    )
  }
}