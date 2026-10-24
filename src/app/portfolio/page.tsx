import { getPortalPage } from '@/lib/portal-service';
import Link from 'next/link';

export const revalidate = 60;

export default async function PortfolioPage() {
  const page = await getPortalPage('portfolio');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {page?.title || 'Research Portfolio & Benchmark Sandboxes'}
        </h1>
        <p className="text-sm text-slate-400">
          {page?.subtitle || 'Technical demonstrations, autonomous testing systems, and enterprise architectures'}
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
        {page?.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-white tracking-tight mt-6 mb-2">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          return (
            <p key={idx} className="text-slate-300">
              {paragraph}
            </p>
          );
        })}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center space-y-3 mt-8">
        <h4 className="text-sm font-bold text-white">Access the Live Multi-Country Testing Sandbox</h4>
        <p className="text-xs text-slate-400">Validate real-time network routes, browser session isolation, and geo-targeted telemetry.</p>
        <div>
          <Link
            href="/gateway"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition"
          >
            Launch Testing Gateway &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
