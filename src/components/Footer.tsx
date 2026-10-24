import Link from 'next/link';
import Logo from './Logo';
import type { PortalSettings } from '../types/portal';

interface FooterProps {
  settings: PortalSettings;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-14 mt-20 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="space-y-3.5 md:col-span-1">
            <Logo size="sm" showTagline={false} darkVariant={true} />
            <p className="text-slate-400 text-xs leading-relaxed">
              ApexPulse Institute is an international independent research foundation dedicated to open-access computer science publications, distributed systems engineering, and educational benchmarking.
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              ISSN: 2940-112X (Online Edition)
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">
              Academic Divisions
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#articles" className="hover:text-blue-400 transition">Artificial Intelligence & Robotics</Link></li>
              <li><Link href="/#articles" className="hover:text-blue-400 transition">Cybersecurity & Defense Systems</Link></li>
              <li><Link href="/#articles" className="hover:text-blue-400 transition">Distributed Systems & Cloud</Link></li>
              <li><Link href="/#articles" className="hover:text-blue-400 transition">Computer Science & Algorithms</Link></li>
              <li><Link href="/portfolio" className="hover:text-blue-400 transition">Laboratory Sandboxes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">
              Institutional Ethics & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy" className="hover:text-blue-400 transition">Privacy & Data Governance (GDPR/CCPA)</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition">Terms of Academic Citation & Use</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition">Editorial Board & Peer Review Desk</Link></li>
              <li><Link href="/gateway" className="hover:text-blue-400 transition">Institutional Verification Gateway</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">
              Syndicate Disclosures
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Articles published within this journal undergo rigorous verification prior to publication. Contextual and sponsored partner links are evaluated for academic and technical relevance.
            </p>
            <div className="mt-3 p-2.5 rounded bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400">
              Inquiries: {settings.contact_email || 'editorial@apexpulse.top'}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} ApexPulse Educational Research Institute. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition">Editorial Desk</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
