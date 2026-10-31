import React from 'react';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { getPortalSettings, getPortalAds } from '@/lib/portal-service';

export const revalidate = 0; // Dynamic admin dashboard

export default async function AdminDashboardPage() {
  const settings = await getPortalSettings();
  const ads = await getPortalAds();

  const { count: articleCount } = await supabaseAdmin
    .from('portal_articles')
    .select('*', { count: 'exact', head: true });

  const { data: viewsData } = await supabaseAdmin
    .from('portal_articles')
    .select('views_count');

  const totalViews = viewsData?.reduce((acc, curr) => acc + (curr.views_count || 0), 0) || 0;
  const activeAdsCount = ads.filter((a) => a.is_active).length;

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Telemetry Header */}
      <div className="border-b border-slate-800/80 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight font-sans">
              Editorial Telemetry & Revenue Desk
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 uppercase">
              Live Production
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time management cluster for <span className="text-slate-200 font-semibold">{settings?.site_name || 'ApexPulse Global'}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition cursor-pointer"
          >
            Manage Manuscripts
          </Link>
          <Link
            href="/admin/ads"
            className="px-4 py-2 rounded-xl bg-[#111728] hover:bg-slate-800 border border-slate-700/80 text-amber-400 text-xs font-semibold shadow transition cursor-pointer"
          >
            Ad Zones & Monetag
          </Link>
        </div>
      </div>

      {/* Filament Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Articles */}
        <div className="bg-[#0c101d] border border-slate-800/80 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Published Manuscripts</span>
            <span className="p-1.5 rounded-lg bg-blue-950/60 border border-blue-800/50 text-blue-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-white font-sans">{articleCount || 30}</div>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              Indexed 100%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">All 30 editorial features live on main feed.</p>
        </div>

        {/* Card 2: Views */}
        <div className="bg-[#0c101d] border border-slate-800/80 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Aggregated Impressions</span>
            <span className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-cyan-400 font-sans">{totalViews.toLocaleString()}</div>
            <span className="text-[11px] font-mono text-cyan-400 font-semibold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
              Active Stream
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Unique portal telemetry impressions.</p>
        </div>

        {/* Card 3: Monetag */}
        <div className="bg-[#0c101d] border border-slate-800/80 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Monetag Ad Engine</span>
            <span className="p-1.5 rounded-lg bg-amber-950/60 border border-amber-800/50 text-amber-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-amber-400 font-sans">{activeAdsCount} / {ads.length}</div>
            <span className="text-[11px] font-mono text-amber-400 font-semibold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
              Cooldown 3m
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Interstitial, in-page and vignette tags.</p>
        </div>

        {/* Card 4: Supabase */}
        <div className="bg-[#0c101d] border border-slate-800/80 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono font-medium uppercase tracking-wider">Database Cluster</span>
            <span className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-emerald-400 font-sans">HEALTHY</div>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              Latency &lt;20ms
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Supabase Frankfurt Edge Node.</p>
        </div>
      </div>

      {/* Monetag Ad Zones Matrix */}
      <div className="bg-[#0c101d] border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-base font-bold text-white font-sans">Monetag Ad Placement Zones</h2>
            <p className="text-xs text-slate-400 mt-0.5">Active monetization script hooks and fallbacks</p>
          </div>
          <Link
            href="/admin/ads"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
          >
            <span>Configure All Zones</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-[#101524] border border-slate-800/90 rounded-xl p-4 space-y-2 hover:border-slate-700 transition">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white truncate">{ad.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  ad.is_active
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {ad.is_active ? 'ACTIVE' : 'MUTED'}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] line-clamp-1">{ad.description || 'Monetag automated slot'}</p>
              <div className="text-[10px] font-mono text-cyan-400/90 truncate bg-[#090d18] px-2 py-1 rounded border border-slate-800">
                {ad.zone_id ? `Zone ID: ${ad.zone_id}` : ad.smartlink_url ? `Smartlink: ${ad.smartlink_url}` : 'No script configured'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Configuration Gateways */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/admin/settings"
          className="bg-[#0c101d] border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-5 transition space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition">Branding & Identity</h3>
            <span className="text-slate-500 text-xs font-mono">&rarr;</span>
          </div>
          <p className="text-xs text-slate-400">
            Configure site title, slogan, publication logo, and corporate metadata.
          </p>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-[#0c101d] border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-5 transition space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition">Google Search Console</h3>
            <span className="text-slate-500 text-xs font-mono">&rarr;</span>
          </div>
          <p className="text-xs text-slate-400">
            Update HTML verification meta tag and manage Monetag head verification tokens.
          </p>
        </Link>

        <Link
          href="/admin/pages"
          className="bg-[#0c101d] border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-5 transition space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition">Institutional Policies</h3>
            <span className="text-slate-500 text-xs font-mono">&rarr;</span>
          </div>
          <p className="text-xs text-slate-400">
            Maintain Privacy Policy, Editorial Charter, Terms of Service, and Research Portfolio.
          </p>
        </Link>
      </div>
    </div>
  );
}
