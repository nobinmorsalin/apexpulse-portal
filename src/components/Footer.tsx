import Link from 'next/link';
import Logo from './Logo';
import type { PortalSettings } from '../types/portal';

interface FooterProps {
  settings: PortalSettings;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 mt-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
          <div className="space-y-3">
            <Logo size="sm" showTagline={true} />
            <p className="text-slate-400 text-xs leading-relaxed">
              {settings.site_description || 'Independent global research publication reporting on emerging computing architectures, automated systems, and enterprise technology.'}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Publication</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-indigo-400 transition">Latest Analysis</Link></li>
              <li><Link href="/portfolio" className="hover:text-indigo-400 transition">Research Portfolio</Link></li>
              <li><Link href="/gateway" className="hover:text-indigo-400 transition">Verified Access Gateway</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Corporate & Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy" className="hover:text-indigo-400 transition">Privacy Policy (GDPR/CCPA)</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-400 transition">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition">Editorial Inquiries</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Syndicate Disclosures</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              This publication operates in compliance with international digital advertising standards. Content is verified by senior research analysts prior to syndication.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} {settings.site_name || 'ApexPulse Global'}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
