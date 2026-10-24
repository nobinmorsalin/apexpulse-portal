const { Client } = require('C:/WorldZone/worldzone-platform/node_modules/pg');
const connectionString = 'postgresql://postgres.knuxlyewqbidnahrvhfb:JwvlW3irY3zcw9pb@aws-0-us-west-1.pooler.supabase.com:5432/postgres';

async function main() {
  const client = new Client({ connectionString });
  await client.connect();

  await client.query("NOTIFY pgrst, 'reload schema'");
  console.log("NOTIFY pgrst, 'reload schema' executed successfully!");

  await client.end();
}

main().catch(err => {
  console.error("Reload failed:", err);
  process.exit(1);
});
