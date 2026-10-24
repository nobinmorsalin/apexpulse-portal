const { Client } = require('C:/WorldZone/worldzone-platform/node_modules/pg');
const connectionString = 'postgresql://postgres.knuxlyewqbidnahrvhfb:JwvlW3irY3zcw9pb@aws-0-us-west-1.pooler.supabase.com:5432/postgres';

async function main() {
  const client = new Client({ connectionString });
  await client.connect();

  await client.query("DELETE FROM portal_admins");
  await client.query("INSERT INTO portal_admins (email, password_hash, role) VALUES ($1, $2, $3)", [
    'nobin@gmail.com',
    '77441122@nN',
    'superadmin'
  ]);

  const res = await client.query("SELECT email, role FROM portal_admins");
  console.log("Updated Admin credentials:", res.rows);

  await client.end();
}

main().catch(err => {
  console.error("Failed to update admin:", err);
  process.exit(1);
});
