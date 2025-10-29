// app/api/pledges/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

type Pledge = Database['public']['Tables']['pledges']['Row'];
type PledgeInsert = Database['public']['Tables']['pledges']['Insert'];
type Project = Database['public']['Tables']['projects']['Row'];

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = (await request.json()) as Partial<PledgeInsert>;
    const { project_id, amount } = body;

    if (!project_id || amount === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Amount must be > 0' }, { status: 400 });
    }

    // Correct: 2 type args
    const { data: pledge, error: pledgeError } = await supabase
      .from<Pledge, PledgeInsert>('pledges')
      .insert({
        project_id,
        user_id: user.id,
        amount,
      })
      .select()
      .single();

    if (pledgeError) throw pledgeError;

    const { data: project, error: projectError } = await supabase
      .from<Project>('projects')
      .select('*')
      .eq('id', project_id)
      .single();

    if (projectError) throw projectError;

    return NextResponse.json(
      { pledge, project, message: 'Pledge created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create pledge' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
      .from<Pledge, any>('pledges')
      .select(`
        *,
        project:projects (
          id,
          title,
          icon,
          goal,
          raised,
          backers,
          status
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ pledges: data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch pledges' },
      { status: 500 }
    );
  }
}