import { getPortalPage } from '@/lib/portal-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PrivacyPage() {
  const page = await getPortalPage('privacy');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded">
          Data Governance
        </span>
        <h1 className="text-3xl font-serif font-black text-slate-900 tracking-tight">
          {page?.title || 'Privacy Policy & Data Processing Disclosures'}
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {page?.subtitle || 'Effective Date: October 24, 2026 - GDPR & CCPA Disclosures'}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        {page?.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-lg font-serif font-bold text-slate-900 tracking-tight mt-6 mb-2 border-b border-slate-100 pb-2">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          return (
            <p key={idx} className="text-slate-700 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>
    </div>
  );
}
