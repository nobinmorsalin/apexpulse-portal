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
      <div className="w-full max-w-5xl mx-auto my-4 p-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-400 min-h-[90px]">
        {headerAd.code_snippet ? (
          <div dangerouslySetInnerHTML={{ __html: headerAd.code_snippet }} />
        ) : (
          <span>Sponsored Intelligence Broadcast [728x90]</span>
        )}
      </div>
    );
  }

  if (slot === 'content') {
    const contentAd = ads.find((a) => a.ad_key === 'banner_content' && a.is_active);
    if (!contentAd) return null;
    return (
      <div className="w-full my-6 p-4 bg-slate-900/90 border border-indigo-900/40 rounded-xl text-center">
        <div className="text-[10px] uppercase font-mono text-indigo-400 mb-2">Verified Partner Placement</div>
        {contentAd.code_snippet ? (
          <div dangerouslySetInnerHTML={{ __html: contentAd.code_snippet }} />
        ) : (
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white">Cloud Computing & Edge AI Sandbox Access</h4>
            <p className="text-xs text-slate-400">Deploy high-performance compute nodes with instant automated allocation.</p>
            <a
              href="/gateway"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
            >
              Access Resource Sandbox &rarr;
            </a>
          </div>
        )}
      </div>
    );
  }

  return null;
}
