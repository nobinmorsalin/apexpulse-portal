import type { Metadata } from 'next';
import './globals.css';
import { getPortalSettings, getPortalAds } from '@/lib/portal-service';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdRenderer from '@/components/AdRenderer';
import MonetagEngine from '@/components/MonetagEngine';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPortalSettings();
  return {
    title: 'ApexPulse Institute | Global Educational & Technology Review',
    description: 'Peer-reviewed academic analysis, computer science architectures, and educational research papers on emerging technology.',
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: 'googleebcf575ef351a810',
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
    <html lang="en" className="scroll-smooth bg-slate-50 text-slate-900">
      <head>
        {/* Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      academic: {
                        50: '#f0fdf4',
                        100: '#dcfce7',
                        700: '#15803d',
                        900: '#14532d'
                      }
                    }
                  }
                }
              }
            `,
          }}
        />
        <meta name="google-site-verification" content="googleebcf575ef351a810" />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col justify-between antialiased selection:bg-blue-900 selection:text-white">
        {/* Automated Monetag Ad Engine (Strictly isolated from Admin routes) */}
        <MonetagEngine ads={ads} customHeadScripts={settings.custom_head_scripts} />

        {/* Global Ad Injection: Popunder, In-Page Push, Vignette */}
        <AdRenderer ads={ads} slot="global" />

        <Navbar settings={settings} />

        {/* Header Ad Slot (728x90) */}
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
