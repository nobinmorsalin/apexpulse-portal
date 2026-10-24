import { NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase';

export async function GET() {
  const { data } = await supabasePublic
    .from('portal_ads')
    .select('smartlink_url, is_active')
    .eq('ad_key', 'smartlink')
    .single();

  const url = data?.is_active && data?.smartlink_url ? data.smartlink_url : '/#articles';
  return NextResponse.json({ url });
}
