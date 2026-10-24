const { Client } = require('C:/WorldZone/worldzone-platform/node_modules/pg');

const connectionString = 'postgresql://postgres.knuxlyewqbidnahrvhfb:JwvlW3irY3zcw9pb@aws-0-us-west-1.pooler.supabase.com:5432/postgres';

const sql = `
-- 1. Portal Settings Table
CREATE TABLE IF NOT EXISTS portal_settings (
  id INT PRIMARY KEY DEFAULT 1,
  site_name TEXT NOT NULL DEFAULT 'ApexPulse Global',
  site_tagline TEXT NOT NULL DEFAULT 'Next-Gen Tech, AI Trends & Digital Intelligence',
  site_description TEXT NOT NULL DEFAULT 'ApexPulse Global delivers real-time reporting on artificial intelligence, cybersecurity architectures, and digital finance.',
  logo_url TEXT DEFAULT '',
  favicon_url TEXT DEFAULT '',
  primary_color TEXT DEFAULT '#6366f1',
  contact_email TEXT DEFAULT 'editorial@apexpulse.top',
  monetag_verification_meta TEXT DEFAULT '',
  google_verification_meta TEXT DEFAULT '',
  custom_head_scripts TEXT DEFAULT '',
  custom_footer_scripts TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO portal_settings (id, site_name, site_tagline, site_description, contact_email)
VALUES (1, 'ApexPulse Global', 'Next-Gen Tech, AI Trends & Digital Intelligence', 'ApexPulse Global delivers real-time reporting on artificial intelligence, cybersecurity architectures, and digital finance.', 'editorial@apexpulse.top')
ON CONFLICT (id) DO NOTHING;

-- 2. Portal Ads Configuration Table
CREATE TABLE IF NOT EXISTS portal_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  network TEXT NOT NULL DEFAULT 'monetag',
  is_active BOOLEAN NOT NULL DEFAULT true,
  zone_id TEXT DEFAULT '',
  script_url TEXT DEFAULT '',
  code_snippet TEXT DEFAULT '',
  smartlink_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO portal_ads (ad_key, name, network, is_active, zone_id, script_url, smartlink_url, description)
VALUES 
  ('popunder', 'Monetag OnClick Popunder', 'monetag', true, '', '', '', 'Highest CPM ad format that triggers on user clicks'),
  ('vignette', 'Monetag Vignette Banner', 'monetag', true, '', '', '', 'Full-screen interstitial banner displayed on page transitions'),
  ('in_page_push', 'Monetag In-Page Push', 'monetag', true, '', '', '', 'Floating native notification banner'),
  ('smartlink', 'Monetag SmartLink (Direct Link)', 'monetag', true, '', '', 'https://example.com/monetag-direct-link', 'Direct offer link for CTA buttons and reward gateways'),
  ('banner_header', 'Top Header Banner 728x90', 'monetag', false, '', '', '', 'Header horizontal ad slot'),
  ('banner_content', 'In-Content Banner 300x250', 'monetag', true, '', '', '', 'In-article inline ad slot')
ON CONFLICT (ad_key) DO NOTHING;

-- 3. Portal Articles Table
CREATE TABLE IF NOT EXISTS portal_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Artificial Intelligence',
  cover_image TEXT DEFAULT '',
  author TEXT NOT NULL DEFAULT 'ApexPulse Intelligence Group',
  reading_time TEXT NOT NULL DEFAULT '5 min read',
  is_published BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  views_count INT NOT NULL DEFAULT 140,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Portal Pages Table (Privacy, Terms, Contact, Portfolio)
CREATE TABLE IF NOT EXISTS portal_pages (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Portal Admin Credentials Table
CREATE TABLE IF NOT EXISTS portal_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'superadmin',
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO portal_admins (email, password_hash, role)
VALUES ('nobinmorsalin7@gmail.com', '77441122nN@', 'superadmin')
ON CONFLICT (email) DO NOTHING;
`;

async function main() {
  const client = new Client({ connectionString });
  await client.connect();
  console.log('Connected to Supabase PostgreSQL database.');
  
  await client.query(sql);
  console.log('Tables created successfully.');
  
  const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'portal_%'");
  console.log('Confirmed portal tables:', tables.rows.map(r => r.table_name));
  
  await client.end();
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
