import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const { data: admin, error } = await supabaseAdmin
      .from('portal_admins')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error || !admin) {
      return NextResponse.json({ error: 'Invalid admin email or access denied' }, { status: 401 });
    }

    // Direct match check
    if (admin.password_hash !== password) {
      return NextResponse.json({ error: 'Incorrect master password' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, email: admin.email, role: admin.role });
    // Set authentication cookie
    response.cookies.set('apex_admin_auth', 'true', {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
