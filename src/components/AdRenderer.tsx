'use client';

import { useEffect } from 'react';
import type { PortalAd } from '../types/portal';

interface AdRendererProps {
  ads: PortalAd[];
  slot?: 'header' | 'content' | 'footer' | 'global';
}

export default function AdRenderer({ ads, slot = 'global' }: AdRendererProps) {
  useEffect(() => {
    // Only execute global ad scripts (popunder, in_page_push, vignette) once
    if (slot !== 'global') return;

    ads.forEach((ad) => {
      if (!ad.is_active) return;

      // Handle direct script URLs
      if (ad.script_url && !document.querySelector(`script[src="${ad.script_url}"]`)) {
        const s = document.createElement('script');
        s.src = ad.script_url;
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
      }

      // Handle raw code snippets
      if (ad.code_snippet && !document.getElementById(`ad-snippet-${ad.ad_key}`)) {
        const container = document.createElement('div');
        container.id = `ad-snippet-${ad.ad_key}`;
        container.innerHTML = ad.code_snippet;
        document.body.appendChild(container);
      }
    });
  }, [ads, slot]);

  // Handle in-content or banner slots
  if (slot === 'header') {
    const headerAd = ads.find((a) => a.ad_key === 'banner_header' && a.is_active);
    if (!headerAd) return null;
    return (
      <div className="w-full max-w-5xl mx-auto my-4 p-2 bg-white border border-slate-200 rounded-md shadow-sm flex flex-col items-center justify-center text-xs text-slate-500 min-h-[90px]">
        <span className="text-[10px] uppercase font-mono text-slate-400 mb-1">Institutional Sponsored Partner</span>
        {headerAd.code_snippet ? (
          <div dangerouslySetInnerHTML={{ __html: headerAd.code_snippet }} />
        ) : (
          <span className="text-slate-400">Sponsored Technical Placement [728x90 Leaderboard]</span>
        )}
      </div>
    );
  }

  if (slot === 'content') {
    const contentAd = ads.find((a) => a.ad_key === 'banner_content' && a.is_active);
    if (!contentAd) return null;
    return (
      <div className="w-full my-8 p-5 bg-blue-50/60 border border-blue-200/80 rounded-lg text-center shadow-sm">
        <div className="text-[10px] uppercase font-mono tracking-wider text-blue-800 font-bold mb-2">
          Verified Academic Research Partner
        </div>
        {contentAd.code_snippet ? (
          <div dangerouslySetInnerHTML={{ __html: contentAd.code_snippet }} />
        ) : (
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-900">
              Distributed Cloud Computing & Research Sandbox
            </h4>
            <p className="text-xs text-slate-600 max-w-lg mx-auto">
              Access high-performance compute clusters and verify distributed software architectures.
            </p>
            <div className="pt-2">
              <a
                href="/gateway"
                className="inline-flex items-center px-4 py-2 rounded bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition"
              >
                Access Research Sandbox &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
