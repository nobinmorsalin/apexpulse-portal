import { createClient } from '@supabase/supabase-js';

// Dedicated Supabase project credentials for ApexPulse Institute
// Note: We prioritize PORTAL_SUPABASE_* or the explicit project ref 'knuxlyewqbidnahrvhfb'
// where all portal_articles, portal_settings, portal_ads, portal_admins and portal_pages reside.
const supabaseUrl =
  process.env.PORTAL_SUPABASE_URL ||
  'https://knuxlyewqbidnahrvhfb.supabase.co';

const supabaseAnonKey =
  process.env.PORTAL_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtudXhseWV3cWJpZG5haHJ2aGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNzE3MDQsImV4cCI6MjEwNTc0NzcwNH0.-PmtOKR01ZuQJtmyhd5zo-nj5AFE5jLTvpX15A2G6Co';

const supabaseServiceRoleKey =
  process.env.PORTAL_SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtudXhseWV3cWJpZG5haHJ2aGZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDE3MTcwNCwiZXhwIjoyMTA1NzQ3NzA0fQ.3TtlQmMO09TPRlq2fqDFqTiratcERGwDIv8sG_mGOZ4';

// Public Client (Read operations)
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

// Admin Client (Bypass RLS for Admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
