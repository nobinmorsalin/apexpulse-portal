import Link from 'next/link';
import Logo from './Logo';
import type { PortalSettings } from '../types/portal';

interface NavbarProps {
  settings: PortalSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  return (
    <>
      {/* Top Academic Registry Header Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-mono">
            <span className="bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded text-[9px] uppercase tracking-wider">
              Academic Review
            </span>
            <span>ISSN 2940-112X &bull; Peer-Reviewed Computer Science & Engineering Journal</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Volume 14 &bull; Issue 4</span>
            <span className="hidden sm:inline">|</span>
            <Link href="/gateway" className="text-blue-400 hover:text-blue-300 font-medium transition">
              Academic Resource Repository &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Clean Institutional Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-95 transition">
              <Logo size="md" showTagline={true} />
            </Link>

            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-700">
              <Link href="/" className="text-blue-900 hover:text-blue-700 transition">
                Home
              </Link>
              <Link href="/#articles" className="hover:text-blue-900 transition">
                Research Publications
              </Link>
              <Link href="/portfolio" className="hover:text-blue-900 transition">
                Laboratory Sandboxes
              </Link>
              <Link href="/gateway" className="text-emerald-700 hover:text-emerald-800 font-bold transition">
                Resource Gateway
              </Link>
              <Link href="/contact" className="hover:text-blue-900 transition">
                Editorial Board
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gateway"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-md bg-blue-900 hover:bg-blue-800 text-white shadow-sm transition"
            >
              Access Resource Repository
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
