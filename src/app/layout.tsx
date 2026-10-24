import type { Metadata } from 'next';
import './globals.css';
import { getPortalSettings, getPortalAds } from '@/lib/portal-service';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdRenderer from '@/components/AdRenderer';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPortalSettings();
  return {
    title: `${settings.site_name} | ${settings.site_tagline}`,
    description: settings.site_description,
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: settings.google_verification_meta || undefined,
    },
    other: settings.monetag_verification_meta
      ? { 'monetag': settings.monetag_verification_meta }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getPortalSettings();
  const ads = await getPortalAds();

  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        {settings.custom_head_scripts && (
          <div dangerouslySetInnerHTML={{ __html: settings.custom_head_scripts }} />
        )}
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between antialiased">
        {/* Global Ad Injection: Popunder, In-Page Push, Vignette */}
        <AdRenderer ads={ads} slot="global" />

        <Navbar settings={settings} />

        {/* Optional Header Banner Slot */}
        <AdRenderer ads={ads} slot="header" />

        <main className="flex-grow w-full">
          {children}
        </main>

        <Footer settings={settings} />

        {settings.custom_footer_scripts && (
          <div dangerouslySetInnerHTML={{ __html: settings.custom_footer_scripts }} />
        )}
      </body>
    </html>
  );
}
