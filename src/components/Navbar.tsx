'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import type { PortalSettings } from '../types/portal';

interface NavbarProps {
  settings: PortalSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Dispatch', href: '/' },
    { label: 'Autonomous AI', href: '/article/autonomous-ai-agents-enterprise-orchestration' },
    { label: 'Cyber Defense', href: '/article/quantum-cryptography-and-zero-trust-networks' },
    { label: 'Digital Finance', href: '/portfolio' },
    { label: 'Research Sandbox', href: '/gateway' },
  ];

  return (
    <>
      {/* 1. Real-Time Global Market & Frontier Telemetry Bar */}
      <aside className="bg-[#0b0f19] border-b border-[#171e31] text-[10px] md:text-[11px] font-mono py-1 md:py-1.5 overflow-hidden select-none">
        <div className="flex items-center gap-6 md:gap-8 text-slate-400 whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 border-r border-[#232d48]/60">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white font-semibold">GLOBAL TECH TICKER</span>
            <span className="text-[8px] md:text-[9px] text-slate-400 bg-[#171e31] px-1 md:px-1.5 py-0.5 rounded">REALTIME</span>
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
      <header className="sticky top-0 z-50 bg-[#06080e]/95 backdrop-blur-xl border-b border-[#171e31] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="hover:opacity-95 transition flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <Logo size="md" showTagline={true} darkVariant={true} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`transition flex items-center gap-1.5 ${
                      isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Elements */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div className="hidden xl:flex flex-col text-right font-mono text-[10px] text-slate-400">
              <span className="text-slate-300 font-medium">Global Edition (Vol. IV)</span>
              <span className="text-emerald-400/90">TLS 1.3 Certified</span>
            </div>

            {/* Desktop CTA Button */}
            <Link
              href="/gateway"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-3.5 py-2 md:px-4 md:py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition shrink-0"
            >
              <span>Whitepapers</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#111728] border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#090d18]/98 border-b border-slate-800 backdrop-blur-2xl px-4 py-6 space-y-5 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-1.5 text-xs font-semibold uppercase tracking-wider">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-lg transition flex items-center justify-between ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-400 font-bold border-l-2 border-cyan-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-slate-500 text-xs font-mono">&rarr;</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <Link
                href="/gateway"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20"
              >
                <span>Access Research Whitepapers</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </Link>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1 pt-1">
                <span>TLS 1.3 Certified</span>
                <span className="text-cyan-400">ISSN 2984-184X</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
