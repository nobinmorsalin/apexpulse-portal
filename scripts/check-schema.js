const { Client } = require('C:/WorldZone/worldzone-platform/node_modules/pg');
const connectionString = 'postgresql://postgres.knuxlyewqbidnahrvhfb:JwvlW3irY3zcw9pb@aws-0-us-west-1.pooler.supabase.com:5432/postgres';

async function main() {
  const client = new Client({ connectionString });
  await client.connect();

  const res = await client.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_name LIKE 'portal_%'");
  console.log("Portal tables:", res.rows);

  // Check grants
  const grants = await client.query("SELECT grantee, privilege_type, table_name FROM information_schema.role_table_grants WHERE table_name = 'portal_articles'");
  console.log("Grants on portal_articles:", grants.rows);

  await client.end();
}

main().catch(console.error);
