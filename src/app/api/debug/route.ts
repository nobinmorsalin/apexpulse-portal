import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getPublishedArticles } from '@/lib/portal-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const articles = await getPublishedArticles();
  const direct = await supabaseAdmin.from('portal_articles').select('slug, title').limit(3);
  return NextResponse.json({
    articlesCount: articles.length,
    articlesSample: articles.slice(0, 2).map((a) => a.slug),
    directCount: direct.data?.length || 0,
    directError: direct.error,
  });
}
