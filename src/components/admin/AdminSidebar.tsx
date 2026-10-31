'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
  icon: (props: { className?: string }) => React.ReactElement;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    group: 'CORE TELEMETRY',
    items: [
      {
        label: 'Overview Dashboard',
        href: '/admin',
        icon: (props) => (
          <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        ),
      },
    ],
  },
  {
    group: 'EDITORIAL ENGINE',
    items: [
      {
        label: 'Articles Manager',
        href: '/admin/articles',
        badge: '30 live',
        icon: (props) => (
          <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        ),
      },
    ],
  },
  {
    group: 'MONETIZATION & ADS',
    items: [
      {
        label: 'Monetag Ad Zones',
        href: '/admin/ads',
        badge: 'Monetag',
        icon: (props) => (
          <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    group: 'SYSTEM CONFIG',
    items: [
      {
        label: 'Site & SEO Settings',
        href: '/admin/settings',
        icon: (props) => (
          <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
      },
      {
        label: 'Pages & Policy',
        href: '/admin/pages',
        icon: (props) => (
          <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('apex_admin_auth');
    localStorage.removeItem('apex_admin_email');
    window.dispatchEvent(new CustomEvent('apex-admin-logout'));
  };

  const navContent = (
    <div className="space-y-6">
      {navGroups.map((group) => (
        <div key={group.group} className="space-y-1">
          <div className="text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase px-3 py-1">
            {group.group}
          </div>
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-2.5'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
                        : 'bg-slate-800/80 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Top App Bar for Admin */}
      <div className="md:hidden bg-[#090d18] border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Logo size="sm" showTagline={false} darkVariant={true} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-1.5 py-0.5 rounded">
            Console
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg bg-[#111728] border border-slate-700/80 text-slate-300 hover:text-white"
          aria-label="Toggle admin navigation"
        >
          {mobileMenuOpen ? (
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090d18] border-b border-slate-800 p-4 space-y-5 animate-in slide-in-from-top duration-200">
          {navContent}

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-1.5 px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>nobin@gmail.com (Superadmin)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/"
                target="_blank"
                className="text-center py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-mono"
              >
                View Live Site &rarr;
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/50 text-xs font-mono"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#090d18] border-r border-slate-800/80 flex-col justify-between shrink-0 select-none min-h-screen">
        <div>
          {/* Filament Brand Header */}
          <div className="p-5 border-b border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <Logo size="sm" showTagline={false} darkVariant={true} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded">
                v3.2
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              Filament Control System
            </div>
          </div>

          {/* Desktop Navigation Groups */}
          <div className="p-4">
            {navContent}
          </div>
        </div>

        {/* Bottom Identity & Control Dock */}
        <div className="p-4 border-t border-slate-800/80 space-y-3 bg-[#080b15]/60">
          <div className="flex items-center gap-2.5 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-xs font-bold text-cyan-300 font-mono">
              OP
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-200 truncate">nobin@gmail.com</div>
              <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Superadmin Active
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 transition font-mono"
              title="Open Public Portal"
            >
              <span>Live Site</span>
              <span className="text-[10px]">&nearr;</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/50 text-[11px] transition font-mono cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
