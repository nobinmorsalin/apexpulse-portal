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
    <div className="max-w-xl mx-auto px-4 py-16 text-center w-full">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 border border-blue-200 text-blue-900">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
          <span>Institutional Verification Protocol</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
            Authenticating Laboratory Credentials
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Please wait while our verification cluster authenticates your connection token and prepares your destination resources.
          </p>
        </div>

        {/* Verification Matrix Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left font-mono text-xs space-y-2.5">
          <div className="flex items-center justify-between text-slate-600">
            <span>[1/3] Network Routing & SSL Handshake</span>
            <span className="text-emerald-700 font-bold">VALIDATED</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>[2/3] Institutional Token Signature</span>
            <span className="text-emerald-700 font-bold">CONFIRMED</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>[3/3] Laboratory Resource Bridge</span>
            <span className={isUnlocked ? 'text-emerald-700 font-bold' : 'text-blue-900 font-bold animate-pulse'}>
              {isUnlocked ? 'READY' : 'SYNCHRONIZING...'}
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-900 to-indigo-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${((3 - seconds) / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>Distribution cluster response:</span>
            <span className={`font-bold ${isUnlocked ? 'text-emerald-700' : 'text-slate-900'}`}>
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
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              Click Here to Claim Access & Continue &rarr;
            </a>
            <p className="text-[11px] text-slate-500 mt-2">
              Connecting directly to our authenticated partner repository node.
            </p>
          </div>
        ) : (
          <div className="pt-2">
            <button
              disabled
              className="w-full py-3.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed border border-slate-200"
            >
              Authenticating session tokens ({seconds}s)...
            </button>
          </div>
        )}

        {/* Security Footer Info */}
        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
          <p>TLS 1.3 Certified Encrypted Stream</p>
          <p>Session ID: <span className="font-mono text-slate-700 font-semibold">APG-ACADEMIC-AUTH-OK</span></p>
        </div>

      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-xs text-blue-900 font-bold hover:underline transition">
          &larr; Return to ApexPulse Institute Publications
        </Link>
      </div>
    </div>
  );
}
