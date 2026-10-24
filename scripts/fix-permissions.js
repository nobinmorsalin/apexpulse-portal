const { Client } = require('C:/WorldZone/worldzone-platform/node_modules/pg');
const connectionString = 'postgresql://postgres.knuxlyewqbidnahrvhfb:JwvlW3irY3zcw9pb@aws-0-us-west-1.pooler.supabase.com:5432/postgres';

async function fixPermissions() {
  const client = new Client({ connectionString });
  await client.connect();

  const sql = `
    -- Enable read access for anon and authenticated on portal tables
    ALTER TABLE portal_articles ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public can view published articles" ON portal_articles;
    CREATE POLICY "Public can view published articles" ON portal_articles FOR SELECT USING (true);

    ALTER TABLE portal_settings ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public can view portal settings" ON portal_settings;
    CREATE POLICY "Public can view portal settings" ON portal_settings FOR SELECT USING (true);

    ALTER TABLE portal_ads ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public can view portal ads" ON portal_ads;
    CREATE POLICY "Public can view portal ads" ON portal_ads FOR SELECT USING (true);

    ALTER TABLE portal_pages ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public can view portal pages" ON portal_pages;
    CREATE POLICY "Public can view portal pages" ON portal_pages FOR SELECT USING (true);

    -- Grant SELECT to anon and authenticated
    GRANT SELECT ON portal_articles TO anon, authenticated;
    GRANT SELECT ON portal_settings TO anon, authenticated;
    GRANT SELECT ON portal_ads TO anon, authenticated;
    GRANT SELECT ON portal_pages TO anon, authenticated;
  `;

  await client.query(sql);
  console.log('Granted public SELECT permissions and configured RLS policies.');
  await client.end();
}

fixPermissions().catch(err => {
  console.error('Failed to fix permissions:', err);
  process.exit(1);
});
