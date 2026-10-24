import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('portal_ads')
    .select('*')
    .order('ad_key', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ads: data });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, is_active, zone_id, script_url, code_snippet, smartlink_url } = body;

    const { error } = await supabaseAdmin
      .from('portal_ads')
      .update({
        is_active,
        zone_id,
        script_url,
        code_snippet,
        smartlink_url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
