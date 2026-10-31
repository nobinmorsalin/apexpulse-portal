import Link from 'next/link';
import Logo from './Logo';
import type { PortalSettings } from '../types/portal';

interface NavbarProps {
  settings: PortalSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  return (
    <>
      {/* 1. Real-Time Global Market & Frontier Telemetry Bar */}
      <aside className="bg-[#0b0f19] border-b border-[#171e31] text-[11px] font-mono py-1.5 overflow-hidden select-none">
        <div className="flex items-center gap-8 text-slate-400 whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-2 px-3 border-r border-[#232d48]/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white font-semibold">GLOBAL TECH TICKER</span>
            <span className="text-[9px] text-slate-400 bg-[#171e31] px-1.5 py-0.5 rounded">REALTIME</span>
          </div>
          <div className="flex items-center gap-2"><span>NASDAQ:COMP</span><span className="text-emerald-400 font-semibold">18,912.40 +1.14%</span></div>
          <div className="flex items-center gap-2"><span>NVDA</span><span className="text-emerald-400 font-semibold">$146.80 +2.85%</span></div>
          <div className="flex items-center gap-2"><span>TSM (2nm WAFER)</span><span className="text-emerald-400 font-semibold">$198.50 +1.92%</span></div>
          <div className="flex items-center gap-2"><span>BTC/USD</span><span className="text-cyan-400 font-semibold">$73,140 +3.40%</span></div>
          <div className="flex items-center gap-2"><span>ETH/USD</span><span className="text-cyan-400 font-semibold">$2,790 +1.80%</span></div>
          <div className="flex items-center gap-2"><span>CLOUD COMPUTE INDEX</span><span className="text-emerald-400 font-semibold">99.98% OPTIMAL</span></div>
        </div>
      </aside>

      {/* 2. Main Institutional Dark Glass Header */}
      <header className="sticky top-0 z-50 bg-[#06080e]/90 backdrop-blur-xl border-b border-[#171e31] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-95 transition">
              <Logo size="md" showTagline={true} darkVariant={true} />
            </Link>

            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <Link href="/" className="text-cyan-400 flex items-center gap-1.5 transition">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Dispatch
              </Link>
              <Link href="/article/autonomous-ai-agents-2026-orchestration" className="hover:text-cyan-400 transition">
                Autonomous AI
              </Link>
              <Link href="/article/quantum-cryptography-zero-trust-networks" className="hover:text-cyan-400 transition">
                Cyber Defense
              </Link>
              <Link href="/portfolio" className="hover:text-cyan-400 transition">
                Digital Finance
              </Link>
              <Link href="/gateway" className="text-amber-400/90 hover:text-amber-400 transition flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                Research Sandbox
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right font-mono text-[10px] text-slate-400">
              <span className="text-slate-300 font-medium">Global Edition (Vol. IV)</span>
              <span className="text-emerald-400/90">TLS 1.3 Certified</span>
            </div>
            <Link
              href="/gateway"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition"
            >
              <span>Access Whitepapers</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
