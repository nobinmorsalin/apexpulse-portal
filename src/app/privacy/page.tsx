import { getPortalPage } from '@/lib/portal-service';

export const revalidate = 60;

export default async function PrivacyPage() {
  const page = await getPortalPage('privacy');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {page?.title || 'Privacy Policy'}
        </h1>
        <p className="text-xs text-slate-400">
          {page?.subtitle || 'GDPR & CCPA Compliant'}
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm leading-relaxed">
        {page?.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-lg font-bold text-white tracking-tight mt-6 mb-2">
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
    </div>
  );
}
