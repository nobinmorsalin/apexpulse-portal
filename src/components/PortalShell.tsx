'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdRenderer from '@/components/AdRenderer';
import MonetagEngine from '@/components/MonetagEngine';
import type { PortalSettings, PortalAd } from '@/types/portal';

interface PortalShellProps {
  children: React.ReactNode;
  settings: PortalSettings;
  ads: PortalAd[];
}

export default function PortalShell({ children, settings, ads }: PortalShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // If on admin route, isolate completely: NO public navbar, NO ads, NO footer, NO Monetag popup scripts
  if (isAdmin) {
    return (
      <div className="w-full min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans">
        {children}
      </div>
    );
  }

  // Public portal layout with complete news navigation, ads, and editorial footer
  return (
    <>
      {/* Automated Monetag Ad Engine */}
      <MonetagEngine
        ads={ads}
        customHeadScripts={settings?.custom_head_scripts}
        cooldownMinutes={settings?.ad_cooldown_minutes || 3}
      />

      <Navbar settings={settings} />

      {/* Header Ad Slot (728x90) */}
      <AdRenderer ads={ads} slot="header" />

      <main className="flex-grow w-full">
        {children}
      </main>

      <Footer settings={settings} />

      {settings?.custom_footer_scripts && (
        <div dangerouslySetInnerHTML={{ __html: settings.custom_footer_scripts }} />
      )}
    </>
  );
}
