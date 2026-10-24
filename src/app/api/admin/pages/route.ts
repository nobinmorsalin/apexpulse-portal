import { NextResponse } from 'next/server';
import { supabaseAdmin, supabasePublic } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabasePublic
    .from('portal_pages')
    .select('*')
    .order('slug', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pages: data });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { slug, title, subtitle, content } = body;

    const { error } = await supabaseAdmin
      .from('portal_pages')
      .upsert({
        slug,
        title,
        subtitle,
        content,
        updated_at: new Date().toISOString(),
      })
      .eq('slug', slug);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
