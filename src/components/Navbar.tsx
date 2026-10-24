import Link from 'next/link';
import type { PortalSettings } from '../types/portal';

interface NavbarProps {
  settings: PortalSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  return (
    <>
      {/* Top Ticker */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/40 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white font-semibold uppercase px-2 py-0.5 rounded text-[10px] tracking-wider">
              Live Intel
            </span>
            <span className="text-slate-300">
              Autonomous multi-agent systems reach unprecedented throughput across enterprise clusters.
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Global Edition</span>
            <span className="hidden sm:inline">|</span>
            <Link href="/gateway" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
              Launch Verified Gateway &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-indigo-400 transition">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-black text-white text-sm shadow-md">
                AP
              </div>
              <span>
                {settings.site_name || 'ApexPulse'}<span className="text-indigo-500">Global</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-indigo-400 transition">Home</Link>
              <Link href="/#articles" className="hover:text-indigo-400 transition">Analysis</Link>
              <Link href="/portfolio" className="hover:text-indigo-400 transition">Portfolio</Link>
              <Link href="/gateway" className="text-amber-400 hover:text-amber-300 font-medium transition">Reward Gateway</Link>
              <Link href="/contact" className="hover:text-indigo-400 transition">Contact</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/gateway"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition"
            >
              Claim Access Pass
            </Link>
            <Link
              href="/admin"
              className="text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 px-2.5 py-1.5 rounded-lg transition"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
