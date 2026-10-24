'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type { PortalAd } from '@/types/portal';

interface MonetagEngineProps {
  ads: PortalAd[];
  customHeadScripts?: string;
  cooldownMinutes?: number;
}

export default function MonetagEngine({
  ads,
  customHeadScripts,
  cooldownMinutes = 3,
}: MonetagEngineProps) {
  const pathname = usePathname();
  const clickHandlerAttached = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. STRICT ADMIN ISOLATION:
    // Never execute ad scripts, popunders, or push prompts on any admin route
    if (pathname && pathname.startsWith('/admin')) {
      return;
    }

    // 2. SMART AD FREQUENCY CAPPING & COOLDOWN CONTROLLER
    // Prevent aggressive ad spamming: 3 minutes cooldown between ad triggers
    const COOLDOWN_KEY = 'apexpulse_ad_cooldown_expiry';
    const cooldownMs = (cooldownMinutes || 3) * 60 * 1000;

    const isCoolingDown = () => {
      try {
        const expiry = localStorage.getItem(COOLDOWN_KEY);
        if (!expiry) return false;
        return Date.now() < parseInt(expiry, 10);
      } catch {
        return false;
      }
    };

    const activateCooldown = () => {
      try {
        const nextAllowedTime = Date.now() + cooldownMs;
        localStorage.setItem(COOLDOWN_KEY, nextAllowedTime.toString());
      } catch {}
    };

    // If cooldown is currently active, do NOT load the popunder / redirect script!
    // The visitor can freely read, click, scroll, and explore without interruption!
    if (isCoolingDown()) {
      return;
    }

    // 3. Inject the Official Monetag MultiTag ONCE
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

    // 4. Listen for the FIRST visitor click to activate cooldown
    // Once the user clicks (which triggers the Monetag popunder / ad once),
    // we immediately activate the cooldown so subsequent clicks are 100% clean!
    const onFirstClick = () => {
      activateCooldown();
      window.removeEventListener('click', onFirstClick, true);
    };

    if (!clickHandlerAttached.current) {
      window.addEventListener('click', onFirstClick, { capture: true, once: true });
      clickHandlerAttached.current = true;
    }

    // 5. Service Worker Registration for Push Notifications (Public visitors only)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {});
    }

    // 6. Execute custom head scripts if any (excluding duplicates)
    if (customHeadScripts && customHeadScripts.trim() !== '') {
      const container = document.createElement('div');
      container.innerHTML = customHeadScripts;
      container.querySelectorAll('script').forEach((oldScript) => {
        const src = oldScript.getAttribute('src');
        if (src && document.querySelector(`script[src="${src}"]`)) return;

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
  }, [pathname, ads, customHeadScripts, cooldownMinutes]);

  return null;
}
