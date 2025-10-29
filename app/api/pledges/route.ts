// app/api/pledges/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// ---------- Types (match your DB) ----------
interface PledgeInsert {
  project_id: string;   // UUID
  user_id: string;      // UUID
  amount: number;       // NUMERIC
}

interface Pledge extends PledgeInsert {
  id: string;
  created_at: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  goal: number;
  raised: number;
  backers: number;
  days_left: number | null;
  category_id: string | null;
  creator_id: string;
  status: 'active' | 'funded' | 'closed';
  created_at: string;
  updated_at: string;
}

// ---------- POST – create a pledge ----------
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 1. Auth
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 2. Body
    const body = (await request.json()) as Partial<PledgeInsert>;
    const { project_id, amount } = body;

    // 3. Validate
    if (!project_id || amount === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Amount must be > 0' }, { status: 400 });
    }

    // 4. Insert pledge
    const { data: pledge, error: pledgeError } = await supabase
      .from<Pledge>('pledges')
      .insert({
        project_id,
        user_id: user.id,
        amount,
      } as PledgeInsert)
      .select()
      .single();

    if (pledgeError) throw pledgeError;

    // 5. Refresh project (stats are updated by DB trigger)
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

// ---------- GET – list current user's pledges ----------
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
      .from<Pledge>('pledges')
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