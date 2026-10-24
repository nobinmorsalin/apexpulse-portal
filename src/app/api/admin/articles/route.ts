import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('portal_articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ articles: data });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, category, author, reading_time, is_published, is_featured } = body;

    const { data, error } = await supabaseAdmin
      .from('portal_articles')
      .insert([
        {
          title,
          slug,
          excerpt,
          content,
          category: category || 'Artificial Intelligence',
          author: author || 'ApexPulse Intelligence Group',
          reading_time: reading_time || '5 min read',
          is_published: is_published ?? true,
          is_featured: is_featured ?? false,
          views_count: 0,
        },
      ])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ article: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, slug, excerpt, content, category, author, reading_time, is_published, is_featured } = body;

    const { error } = await supabaseAdmin
      .from('portal_articles')
      .update({
        title,
        slug,
        excerpt,
        content,
        category,
        author,
        reading_time,
        is_published,
        is_featured,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const { error } = await supabaseAdmin.from('portal_articles').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
