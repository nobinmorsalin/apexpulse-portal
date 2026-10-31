'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GatewayPage() {
  const [seconds, setSeconds] = useState(3);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [smartLinkUrl, setSmartLinkUrl] = useState('/#articles');

  useEffect(() => {
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
    <div className="max-w-xl mx-auto px-4 py-16 text-center w-full space-y-6">
      <div className="bg-[#101524] border border-cyan-500/25 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>CRYPTOGRAPHIC SESSION HANDSHAKE</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Authenticating Verified Reader Session
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Please wait while our verification cluster authenticates your connection token and decrypts your requested research documentation.
          </p>
        </div>

        {/* Verification Matrix Box */}
        <div className="bg-[#06080e] border border-[#171e31] rounded-xl p-4 text-left font-mono text-xs space-y-2.5">
          <div className="flex items-center justify-between text-slate-400">
            <span>[1/3] Origin Edge Integrity</span>
            <span className="text-emerald-400 font-bold">VALIDATED</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>[2/3] Digital Signature Verification</span>
            <span className="text-emerald-400 font-bold">CONFIRMED</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>[3/3] Research Whitepaper Decryption</span>
            <span className={isUnlocked ? 'text-emerald-400 font-bold' : 'text-cyan-400 font-bold animate-pulse'}>
              {isUnlocked ? 'DECRYPTED & VERIFIED' : 'SYNCHRONIZING...'}
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-[#171e31] h-2 rounded-full overflow-hidden border border-[#232d48]">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${((3 - seconds) / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>Connecting to distribution cluster...</span>
            <span className={`font-bold ${isUnlocked ? 'text-emerald-400' : 'text-white'}`}>
              {isUnlocked ? 'Authentication Complete!' : `${seconds}s remaining`}
            </span>
          </div>
        </div>

        {/* CTA Unlock Button (Unlocked after countdown) */}
        {isUnlocked && (
          <div className="pt-2 animate-fadeIn space-y-2">
            <a
              href={smartLinkUrl}
              target={smartLinkUrl.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/35 transition cursor-pointer"
            >
              <span>Access Verified Research Package Now &rarr;</span>
            </a>
            <p className="text-[11px] font-mono text-slate-400 mt-2">
              Redirecting to accredited partner distribution node &bull; Instant Secure Access
            </p>
          </div>
        )}

        {/* Token Footer */}
        <div className="pt-4 border-t border-[#171e31] text-[11px] font-mono text-slate-400 space-y-1">
          <p>Traffic encrypted using SHA-384 with P-384 ECDSA signatures.</p>
          <p>Token ID: <span className="text-cyan-400">APG-2026-X892-ACC</span></p>
        </div>

      </div>

      {/* Suggested Reading While Waiting */}
      <div className="text-left bg-[#101524] border border-[#171e31] rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Popular Dispatches In This Bureau</h3>
        <div className="space-y-2 font-mono text-xs">
          <Link href="/" className="block text-slate-200 hover:text-cyan-400 transition">
            &bull; Autonomous AI Agent Clusters Reach Industrial Parity &rarr;
          </Link>
          <Link href="/" className="block text-slate-200 hover:text-emerald-400 transition">
            &bull; Zero-Trust Architecture and Quantum Cryptography &rarr;
          </Link>
          <Link href="/portfolio" className="block text-slate-200 hover:text-cyan-400 transition">
            &bull; Decentralized Finance &amp; Global Digital Payments &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
