'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { PortalAd } from '../types/portal';

interface AdRendererProps {
  ads: PortalAd[];
  slot?: 'header' | 'content' | 'footer' | 'global';
}

export default function AdRenderer({ ads, slot = 'global' }: AdRendererProps) {
  const pathname = usePathname();

  // Strictly block any ad rendering on admin pages
  const isAdmin = pathname && pathname.startsWith('/admin');

  useEffect(() => {
    // Only execute global ad scripts (popunder, in_page_push, vignette) once
    if (isAdmin || slot !== 'global') return;

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

      // Handle raw code snippets (Monetag HTML/Script tags)
      if (ad.code_snippet && !document.getElementById(`ad-container-${ad.ad_key}`)) {
        const wrapper = document.createElement('div');
        wrapper.id = `ad-container-${ad.ad_key}`;
        wrapper.innerHTML = ad.code_snippet;

        // Browsers do not automatically run scripts injected via innerHTML.
        // We extract each <script> tag and create active DOM script nodes.
        const scriptElements = wrapper.querySelectorAll('script');
        scriptElements.forEach((oldScript) => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });
          if (oldScript.textContent) {
            newScript.textContent = oldScript.textContent;
          }
          document.head.appendChild(newScript);
        });

        document.body.appendChild(wrapper);
      }
    });
  }, [ads, slot]);

  if (isAdmin) return null;

  // Handle in-content or banner slots
  if (slot === 'header') {
    const headerAd = ads.find((a) => a.ad_key === 'banner_header' && a.is_active);
    if (!headerAd) return null;
    return (
      <div className="w-full max-w-5xl mx-auto my-4 p-2 bg-[#101524] border border-[#171e31] rounded-xl shadow-lg flex flex-col items-center justify-center text-xs text-slate-400 min-h-[90px]">
        <span className="text-[10px] uppercase font-mono text-cyan-400 mb-1">Institutional Sponsored Partner</span>
        {headerAd.code_snippet ? (
          <div dangerouslySetInnerHTML={{ __html: headerAd.code_snippet }} />
        ) : (
          <span className="text-slate-400 font-mono text-xs">Sponsored Technical Placement [728x90 Leaderboard]</span>
        )}
      </div>
    );
  }

  if (slot === 'content') {
    const contentAd = ads.find((a) => a.ad_key === 'banner_content' && a.is_active);
    if (!contentAd) return null;
    return (
      <div className="w-full my-8 p-6 bg-gradient-to-r from-[#0b0f19] to-[#101524] border border-cyan-500/30 rounded-2xl text-center shadow-xl">
        <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold mb-2">
          Verified Academic Research Partner
        </div>
        {contentAd.code_snippet ? (
          <div dangerouslySetInnerHTML={{ __html: contentAd.code_snippet }} />
        ) : (
          <div className="space-y-2">
            <h4 className="text-lg font-serif font-bold text-white">
              Distributed Cloud Computing &amp; Research Sandbox
            </h4>
            <p className="text-xs text-slate-300 max-w-lg mx-auto font-sans leading-relaxed">
              Access high-performance compute clusters, inspect hardware telemetry, and verify distributed software architectures.
            </p>
            <div className="pt-2">
              <a
                href={contentAd.smartlink_url || '/gateway'}
                target={contentAd.smartlink_url ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold shadow-md shadow-cyan-500/20 transition"
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
