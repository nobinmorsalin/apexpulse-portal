import React from 'react';
import { getPortalSettings, getPortalAds } from '@/lib/portal-service';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdRenderer from '@/components/AdRenderer';
import MonetagEngine from '@/components/MonetagEngine';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getPortalSettings();
  const ads = await getPortalAds();

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#06080e] text-slate-100 selection:bg-cyan-500/30 font-sans">
      {/* Automated Monetag Ad Engine (Active strictly on public portal) */}
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
    </div>
  );
}
