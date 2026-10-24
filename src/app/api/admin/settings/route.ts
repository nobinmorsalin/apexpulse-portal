import { NextResponse } from 'next/server';
import { supabaseAdmin, supabasePublic } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabasePublic
    .from('portal_settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ settings: data });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      site_name,
      site_tagline,
      site_description,
      logo_url,
      favicon_url,
      primary_color,
      contact_email,
      monetag_verification_meta,
      google_verification_meta,
      custom_head_scripts,
      custom_footer_scripts,
    } = body;

    const { error } = await supabaseAdmin
      .from('portal_settings')
      .update({
        site_name,
        site_tagline,
        site_description,
        logo_url,
        favicon_url,
        primary_color,
        contact_email,
        monetag_verification_meta,
        google_verification_meta,
        custom_head_scripts,
        custom_footer_scripts,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
