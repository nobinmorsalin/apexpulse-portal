import { getPortalPage } from '@/lib/portal-service';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Research Demonstrations & Technical Portfolio | ApexPulse Global',
  description: 'Technical demonstrations, autonomous testing systems, and enterprise architecture blueprints by ApexPulse Global engineering bureaus.',
  alternates: {
    canonical: 'https://apexpulse-portal.vercel.app/portfolio',
  },
};

export default async function PortfolioPage() {
  const page = await getPortalPage('portfolio');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
      <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-8 sm:p-10 shadow-xl space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full">
          Research Demonstrations
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          {page?.title || 'Academic Laboratory Sandboxes & Software Portfolios'}
        </h1>
        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          {page?.subtitle || 'Technical demonstrations, autonomous testing systems, and enterprise architectures'}
        </p>
      </div>

      <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-8 sm:p-10 shadow-xl space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
        {page?.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-8 mb-3 border-b border-[#171e31] pb-2">
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

      <div className="bg-gradient-to-r from-cyan-950 via-[#101524] to-blue-950 border border-cyan-500/35 rounded-2xl p-8 text-center space-y-3 shadow-xl">
        <h4 className="text-lg font-serif font-bold text-white">
          Verify Distributed Multi-Country Sandbox Telemetry
        </h4>
        <p className="text-xs text-slate-300 max-w-lg mx-auto font-sans leading-relaxed">
          Validate real-time network routes, browser session isolation, and geo-targeted telemetry parameters.
        </p>
        <div className="pt-2">
          <Link
            href="/gateway"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-md transition"
          >
            Launch Laboratory Gateway &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
