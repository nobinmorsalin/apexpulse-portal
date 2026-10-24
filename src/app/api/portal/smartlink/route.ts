import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const { data } = await supabaseAdmin
    .from('portal_ads')
    .select('smartlink_url, is_active')
    .eq('ad_key', 'smartlink')
    .single();

  const url = data?.is_active && data?.smartlink_url ? data.smartlink_url : '/#articles';
  return NextResponse.json({ url });
}
