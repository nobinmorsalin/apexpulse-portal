import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const zoneId = searchParams.get('z') || '12114504';
    const domain = searchParams.get('d') || '5gvci.com';

    // Primary upstream Monetag tag URL
    const upstreamUrl = `https://${domain}/pfe/current/tag.min.js?z=${zoneId}`;

    const response = await fetch(upstreamUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
        'Accept': '*/*',
      },
    });

    if (!response.ok) {
      return new NextResponse(`// Upstream failed with status ${response.status}`, {
        status: 200,
        headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
      });
    }

    const scriptCode = await response.text();

    return new NextResponse(scriptCode, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new NextResponse(`// Error fetching script: ${String(error)}`, {
      status: 200,
      headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
    });
  }
}
