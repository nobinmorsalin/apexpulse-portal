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
    title: 'ApexPulse Global | Frontier Computing, Autonomous Systems & Global Economics',
    description: 'Independent global editorial covering semiconductor architectures, agentic AI frameworks, zero-trust infrastructure, and decentralized economics.',
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: 'googleebcf575ef351a810',
    },
    icons: {
      icon: '/logo.svg',
    },
    other: settings?.monetag_verification_meta
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
    <html lang="en" className="scroll-smooth bg-[#06080e] text-slate-100 dark">
      <head>
        {/* Google Fonts: Plus Jakarta Sans, Instrument Serif, Newsreader & JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Tailwind CDN Configuration with High-End News Portal Typography */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
                theme: {
                  extend: {
                    fontFamily: {
                      sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
                      serif: ['"Instrument Serif"', 'Newsreader', 'Georgia', 'serif'],
                      mono: ['"JetBrains Mono"', 'monospace'],
                    },
                    colors: {
                      noir: {
                        950: '#06080e',
                        900: '#0b0f19',
                        850: '#101524',
                        800: '#171e31',
                        700: '#232d48',
                        600: '#354368',
                      }
                    }
                  }
                }
              }
            `,
          }}
        />
        <meta name="google-site-verification" content="googleebcf575ef351a810" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className="bg-[#06080e] text-slate-100 min-h-screen flex flex-col justify-between antialiased selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
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
      </body>
    </html>
  );
}
