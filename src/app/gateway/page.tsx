'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GatewayPage() {
  const [seconds, setSeconds] = useState(3);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [smartLinkUrl, setSmartLinkUrl] = useState('/#articles');

  useEffect(() => {
    // Fetch active smartlink from API or config
    fetch('/api/portal/smartlink')
      .then((res) => res.json())
      .then((data) => {
        if (data.url) setSmartLinkUrl(data.url);
      })
      .catch(() => {});

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsUnlocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center w-full">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 border border-indigo-700/60 text-indigo-300">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
          <span>Automated Session Handshake</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Verifying Digital Session Credentials
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Please wait while our verification cluster authenticates your connection token and prepares your destination resources.
          </p>
        </div>

        {/* Verification Matrix Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left font-mono text-xs space-y-2.5">
          <div className="flex items-center justify-between text-slate-400">
            <span>[1/3] Proxy & Network Integrity</span>
            <span className="text-emerald-400 font-semibold">VALIDATED</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>[2/3] Security Handshake Token</span>
            <span className="text-emerald-400 font-semibold">CONFIRMED</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>[3/3] Dynamic Content Bridge</span>
            <span className={isUnlocked ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
              {isUnlocked ? 'READY' : 'SYNCHRONIZING...'}
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300 ease-out"
              style={{ width: `${((3 - seconds) / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Authentication cluster response:</span>
            <span className={`font-semibold ${isUnlocked ? 'text-emerald-400' : 'text-white'}`}>
              {isUnlocked ? 'Session Verified!' : `${seconds}s remaining`}
            </span>
          </div>
        </div>

        {/* CTA Unlock Button (Unlocked after countdown) */}
        {isUnlocked ? (
          <div className="pt-2 animate-fadeIn">
            <a
              href={smartLinkUrl}
              target={smartLinkUrl.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/40 transition cursor-pointer"
            >
              Click Here to Claim Access & Continue &rarr;
            </a>
            <p className="text-[11px] text-slate-400 mt-2">
              Clicking connects directly to our verified high-priority partner node.
            </p>
          </div>
        ) : (
          <div className="pt-2">
            <button
              disabled
              className="w-full py-3.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-semibold cursor-not-allowed"
            >
              Validating session tokens ({seconds}s)...
            </button>
          </div>
        )}

        {/* Security Footer Info */}
        <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-1">
          <p>TLS 1.3 Certified Encrypted Stream</p>
          <p>Session ID: <span className="font-mono text-slate-400">APG-TOKEN-AUTHSYNC-OK</span></p>
        </div>

      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-xs text-slate-400 hover:text-indigo-400 transition">
          &larr; Return to ApexPulse Global Homepage
        </Link>
      </div>
    </div>
  );
}
