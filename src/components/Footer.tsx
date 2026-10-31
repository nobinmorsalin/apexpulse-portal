import Link from 'next/link';
import Logo from './Logo';
import type { PortalSettings } from '../types/portal';

interface FooterProps {
  settings: PortalSettings;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-[#0b0f19] text-slate-400 border-t border-[#171e31] py-14 mt-20 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand & Mission (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" showTagline={false} darkVariant={true} />
            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              ApexPulse Global is an independent research publication reporting on frontier semiconductor manufacturing, multi-agent artificial intelligence runtimes, post-quantum cybersecurity protocols, and next-generation decentralized market infrastructure.
            </p>
            <div className="font-mono text-[11px] text-slate-400 space-y-1">
              <p>ISSN 2984-184X (Global Digital Edition)</p>
              <p>Bureaus: San Francisco &bull; Zurich &bull; Singapore &bull; Tokyo</p>
            </div>
          </div>

          {/* Editorial Desks */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-white font-bold">
              Editorial Desks
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition">Autonomous AI</Link></li>
              <li><Link href="/" className="hover:text-cyan-400 transition">Cyber Warfare</Link></li>
              <li><Link href="/portfolio" className="hover:text-cyan-400 transition">Digital Currencies</Link></li>
              <li><Link href="/gateway" className="hover:text-cyan-400 transition">Cloud Sandbox</Link></li>
            </ul>
          </div>

          {/* Standards & Legal */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-white font-bold">
              Standards &amp; Trust
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/privacy" className="hover:text-cyan-400 transition">Privacy &amp; GDPR Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cyan-400 transition">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition">Editorial Board &amp; Inquiries</Link></li>
              <li><Link href="/gateway" className="hover:text-cyan-400 transition">Distribution Gateway</Link></li>
            </ul>
          </div>

          {/* Compliance & Contact */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-white font-bold">
              Integrity
            </h4>
            <p className="leading-relaxed text-[11px] text-slate-400">
              Editorial content is independently peer-reviewed. Programmatic partner integrations conform to global IAB and digital privacy compliance standards.
            </p>
            <div className="p-2.5 rounded bg-[#101524] border border-[#171e31] text-[11px] font-mono text-cyan-400">
              Inquiries: {settings?.contact_email || 'editorial@apexpulse.top'}
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[#171e31] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 font-mono">
          <p>&copy; {new Date().getFullYear()} ApexPulse Global Media Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/contact" className="hover:text-white transition">Contact Desk</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
