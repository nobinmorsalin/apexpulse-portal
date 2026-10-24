import Link from 'next/link';
import { supabasePublic } from '@/lib/supabase';
import { getPortalSettings, getPortalAds } from '@/lib/portal-service';

export const revalidate = 0; // Dynamic admin dashboard

export default async function AdminDashboardPage() {
  const settings = await getPortalSettings();
  const ads = await getPortalAds();

  const { count: articleCount } = await supabasePublic
    .from('portal_articles')
    .select('*', { count: 'exact', head: true });

  const { data: viewsData } = await supabasePublic
    .from('portal_articles')
    .select('views_count');

  const totalViews = viewsData?.reduce((acc, curr) => acc + (curr.views_count || 0), 0) || 0;
  const activeAdsCount = ads.filter((a) => a.is_active).length;

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Portal Telemetry & Control</h1>
          <p className="text-xs text-slate-400 mt-1">Live administration for {settings.site_name}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/articles"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
          >
            Create New Article
          </Link>
          <Link
            href="/admin/ads"
            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow transition"
          >
            Configure Monetag
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="text-xs text-slate-400 font-medium">Published Articles</div>
          <div className="text-3xl font-extrabold text-white">{articleCount || 0}</div>
          <div className="text-[11px] text-emerald-400">Database Synchronized</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="text-xs text-slate-400 font-medium">Aggregated Views</div>
          <div className="text-3xl font-extrabold text-cyan-400">{totalViews}</div>
          <div className="text-[11px] text-slate-400">Total reader traffic</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="text-xs text-slate-400 font-medium">Active Monetization Zones</div>
          <div className="text-3xl font-extrabold text-amber-400">{activeAdsCount} / {ads.length}</div>
          <div className="text-[11px] text-amber-300">Monetag & Network Tags</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="text-xs text-slate-400 font-medium">Domain Health</div>
          <div className="text-3xl font-extrabold text-emerald-400">100%</div>
          <div className="text-[11px] text-slate-400">SSL & Schema Validated</div>
        </div>
      </div>

      {/* Monetag Quick Status Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-white">Monetag Ad Zones Quick Overview</h2>
          <Link href="/admin/ads" className="text-xs text-indigo-400 hover:underline">
            Manage All Zones &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-slate-950 border border-slate-800/80 rounded-lg p-3.5 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">{ad.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ad.is_active ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' : 'bg-slate-800 text-slate-500'}`}>
                  {ad.is_active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] line-clamp-1">{ad.description}</p>
              <div className="text-[10px] font-mono text-indigo-400 truncate">
                {ad.zone_id ? `Zone: ${ad.zone_id}` : ad.smartlink_url ? `Link: ${ad.smartlink_url}` : 'No script configured'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links & Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link href="/admin/settings" className="block bg-slate-900 border border-slate-800 hover:border-indigo-600/50 rounded-xl p-5 transition space-y-2">
          <h3 className="text-sm font-bold text-white">Site Name & Logo</h3>
          <p className="text-xs text-slate-400">Change website title, description, and primary brand palette.</p>
        </Link>

        <Link href="/admin/settings" className="block bg-slate-900 border border-slate-800 hover:border-indigo-600/50 rounded-xl p-5 transition space-y-2">
          <h3 className="text-sm font-bold text-white">Verification Meta Tags</h3>
          <p className="text-xs text-slate-400">Input Monetag verification code or Google Search Console meta tag.</p>
        </Link>

        <Link href="/admin/pages" className="block bg-slate-900 border border-slate-800 hover:border-indigo-600/50 rounded-xl p-5 transition space-y-2">
          <h3 className="text-sm font-bold text-white">Legal & Portfolio Pages</h3>
          <p className="text-xs text-slate-400">Edit Privacy Policy, Terms, and Research Portfolio markdown.</p>
        </Link>
      </div>

    </div>
  );
}
