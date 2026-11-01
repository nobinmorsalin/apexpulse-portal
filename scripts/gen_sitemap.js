const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

async function generate() {
  const supabaseUrl = process.env.PORTAL_SUPABASE_URL || 'https://knuxlyewqbidnahrvhfb.supabase.co';
  const supabaseKey = process.env.PORTAL_SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtudXhseWV3cWJpZG5haHJ2aGZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDE3MTcwNCwiZXhwIjoyMTA1NzQ3NzA0fQ.3TtlQmMO09TPRlq2fqDFqTiratcERGwDIv8sG_mGOZ4';

  const client = createClient(supabaseUrl, supabaseKey);
  const { data: articles, error } = await client
    .from('portal_articles')
    .select('slug, updated_at, created_at')
    .eq('is_published', true);

  if (error) {
    console.error('Supabase query error:', error);
    return;
  }

  const baseUrl = 'https://apexpulse-portal.vercel.app';
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const mainPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/portfolio', priority: '0.8', changefreq: 'weekly' },
    { path: '/gateway', priority: '0.7', changefreq: 'weekly' },
    { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
    { path: '/terms', priority: '0.5', changefreq: 'monthly' },
    { path: '/contact', priority: '0.5', changefreq: 'monthly' },
  ];

  for (const page of mainPages) {
    xml += `  <url>\n    <loc>${baseUrl}${page.path}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
  }

  if (articles) {
    for (const art of articles) {
      const lastmod = (art.updated_at || art.created_at || new Date().toISOString()).split('T')[0];
      xml += `  <url>\n    <loc>${baseUrl}/article/${art.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }
  }

  xml += `</urlset>\n`;

  const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log('Successfully generated public/sitemap.xml with', articles?.length || 0, 'articles.');
}

generate().catch(console.error);
