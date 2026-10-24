import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'default';
  const hasAnon = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const hasService = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  return NextResponse.json({ url, hasAnon, hasService });
}
