import { getPortalPage } from '@/lib/portal-service';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Processing Governance | ApexPulse Global',
  description: 'ApexPulse Global data protection, privacy disclosures, and GDPR/CCPA compliance standards for readers and institutional partners.',
  alternates: {
    canonical: 'https://apexpulse-portal.vercel.app/privacy',
  },
};

export default async function PrivacyPage() {
  const page = await getPortalPage('privacy');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
      <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-8 sm:p-10 shadow-xl space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full">
          Data Governance
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          {page?.title || 'Privacy Policy & Data Processing Disclosures'}
        </h1>
        <p className="text-xs font-mono text-slate-400">
          {page?.subtitle || 'Effective Date: October 24, 2026 - GDPR & CCPA Disclosures'}
        </p>
      </div>

      <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-8 sm:p-10 shadow-xl space-y-6 text-slate-300 text-sm leading-relaxed font-sans">
        {page?.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight mt-6 mb-2 border-b border-[#171e31] pb-2">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          return (
            <p key={idx} className="text-slate-300 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>
    </div>
  );
}
