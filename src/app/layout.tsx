import type { Metadata } from 'next';
import './globals.css';
import { getPortalSettings } from '@/lib/portal-service';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPortalSettings();
  return {
    metadataBase: new URL('https://apexpulse-portal.vercel.app'),
    title: {
      default: 'ApexPulse Global | Frontier Computing, Autonomous Systems & Global Economics',
      template: '%s | ApexPulse Global',
    },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#06080e] text-slate-100 dark">
      <head>
        {/* Google Fonts: Plus Jakarta Sans, Instrument Serif, Newsreader & JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Tailwind CDN Configuration */}
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
      <body className="bg-[#06080e] text-slate-100 min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
        {children}
      </body>
    </html>
  );
}
