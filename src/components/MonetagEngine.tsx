'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { PortalAd } from '@/types/portal';

interface MonetagEngineProps {
  ads: PortalAd[];
  customHeadScripts?: string;
}

export default function MonetagEngine({ ads, customHeadScripts }: MonetagEngineProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // STRICT ADMIN ISOLATION:
    // Never execute ad scripts, popunders, or push prompts on any admin route
    if (pathname && pathname.startsWith('/admin')) {
      return;
    }

    // 1. Inject the Official Monetag MultiTag (Wonderful tag: Popunder, Vignette, In-Page Push, Push)
    // ONLY executed for public visitors
    const multiTagId = 'monetag-multitag-official';
    if (!document.getElementById(multiTagId)) {
      const multiScript = document.createElement('script');
      multiScript.id = multiTagId;
      multiScript.src = 'https://quge5.com/88/tag.min.js';
      multiScript.setAttribute('data-zone', '301441');
      multiScript.setAttribute('data-cfasync', 'false');
      multiScript.async = true;
      document.head.appendChild(multiScript);
    }

    // 2. Service Worker Registration for Push Notifications (Public visitors only)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {});
    }

    // 3. Execute any custom head scripts provided in Admin Settings (Public visitors only)
    if (customHeadScripts && customHeadScripts.trim() !== '') {
      const container = document.createElement('div');
      container.innerHTML = customHeadScripts;
      container.querySelectorAll('script').forEach((oldScript) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        if (oldScript.textContent) {
          newScript.textContent = oldScript.textContent;
        }
        document.head.appendChild(newScript);
      });
    }

    // 4. Iterate through configured active ads and inject zone scripts (Public visitors only)
    ads.forEach((ad) => {
      if (!ad.is_active) return;

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
  }, [pathname, ads, customHeadScripts]);

  return null;
}
