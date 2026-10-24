'use client';

import { useEffect } from 'react';
import type { PortalAd } from '@/types/portal';

interface MonetagEngineProps {
  ads: PortalAd[];
}

export default function MonetagEngine({ ads }: MonetagEngineProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Service Worker Registration for Push Notifications
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {
          // Silent catch if SW registration is restricted
        });
    }

    // Helper to inject an ad script with an Anti-AdBlock fallback
    const injectZoneTag = (zoneId: string, formatName: string) => {
      const scriptId = `monetag-tag-${zoneId}`;
      if (document.getElementById(scriptId)) return;

      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute('data-zone', zoneId);

      // Primary source: verified Monetag CDN
      script.src = `https://5gvci.com/pfe/current/tag.min.js?z=${zoneId}`;

      // Anti-Adblock Fallback: if third-party CDN is blocked by browser extensions,
      // route via our first-party internal proxy on apexpulse-portal.vercel.app
      script.onerror = () => {
        const fallbackScript = document.createElement('script');
        fallbackScript.id = `monetag-fallback-${zoneId}`;
        fallbackScript.async = true;
        fallbackScript.setAttribute('data-cfasync', 'false');
        fallbackScript.setAttribute('data-zone', zoneId);
        fallbackScript.src = `/api/ad-proxy?z=${zoneId}`;
        document.head.appendChild(fallbackScript);
      };

      document.head.appendChild(script);
    };

    // 2. Iterate through configured active ads and inject zone scripts
    ads.forEach((ad) => {
      if (!ad.is_active) return;

      // If zone ID is present, inject tag
      if (ad.zone_id && ad.zone_id.trim() !== '') {
        injectZoneTag(ad.zone_id.trim(), ad.name);
      }

      // If custom script URL is present, inject it
      if (ad.script_url && !document.querySelector(`script[src="${ad.script_url}"]`)) {
        const s = document.createElement('script');
        s.src = ad.script_url;
        s.async = true;
        s.setAttribute('data-cfasync', 'false');
        document.head.appendChild(s);
      }

      // If raw HTML / JS code snippet is present
      if (ad.code_snippet && !document.getElementById(`monetag-raw-${ad.ad_key}`)) {
        const wrapper = document.createElement('div');
        wrapper.id = `monetag-raw-${ad.ad_key}`;
        wrapper.innerHTML = ad.code_snippet;
        const scriptTags = wrapper.querySelectorAll('script');
        scriptTags.forEach((oldScript) => {
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
  }, [ads]);

  return null;
}
