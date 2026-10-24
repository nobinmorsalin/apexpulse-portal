import Link from 'next/link';
import { getPublishedArticles, getPortalAds } from '@/lib/portal-service';
import ArticleExplorer from '@/components/ArticleExplorer';
import AdRenderer from '@/components/AdRenderer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const ads = await getPortalAds();
  const smartLinkAd = ads.find((a) => a.ad_key === 'smartlink' && a.is_active);
  const smartLinkUrl = smartLinkAd?.smartlink_url || '/gateway';

  const featuredArticle = articles.find((a) => a.is_featured) || articles[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">

      {/* Featured Lead Research Paper */}
      {featuredArticle && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 border border-blue-200 text-blue-900">
                <span>Featured Academic Whitepaper</span>
                <span>&bull;</span>
                <span>{featuredArticle.category}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-slate-900 tracking-tight leading-tight">
                <Link href={`/article/${featuredArticle.slug}`} className="hover:text-blue-900 transition">
                  {featuredArticle.title}
                </Link>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-3">
                <Link
                  href={`/article/${featuredArticle.slug}`}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-sm"
                >
                  Read Complete Paper &rarr;
                </Link>
                <div className="text-xs text-slate-500 font-medium">
                  Author: <span className="text-slate-800 font-semibold">{featuredArticle.author}</span> &bull; {featuredArticle.reading_time}
                </div>
              </div>
            </div>

            {/* Academic Registry Metrics */}
            <div className="lg:col-span-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-900 font-bold border-b border-slate-200 pb-2">
                  // Publication Telemetry
                </div>
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Peer Review Status</span>
                    <span className="text-emerald-700 font-bold">VERIFIED</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Indexation Priority</span>
                    <span className="text-blue-900 font-bold">HIGH (1.0)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Citation Factor</span>
                    <span className="text-slate-900 font-bold">98.4%</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Distribution Protocol</span>
                    <span className="text-emerald-700 font-bold">OPEN ACCESS</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-200 text-center">
                  <Link href="/gateway" className="text-xs font-bold text-blue-900 hover:text-blue-700 underline underline-offset-4">
                    Explore Laboratory Sandboxes &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Directory with Search & Category Filters (Shows all 30 Articles) */}
      <ArticleExplorer initialArticles={articles} />

      {/* In-Content Placement Slot */}
      <AdRenderer ads={ads} slot="content" />

      {/* Academic Resource Gateway Conversion Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-8 sm:p-10 text-center text-white shadow-md">
        <span className="inline-block text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full bg-blue-800/80 border border-blue-600/40 font-bold text-blue-200 mb-3">
          Institutional Access Pass
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3">
          Claim Verified Academic & Laboratory Sandbox Access
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
          Authorized researchers, software architects, and partner platform visitors are eligible for instant access to high-performance test nodes and verified software benchmark repositories.
        </p>
        <div>
          <a
            href={smartLinkUrl}
            target={smartLinkUrl.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg transition cursor-pointer"
          >
            Authenticate & Proceed to Resource Gateway &rarr;
          </a>
        </div>
        <p className="text-[11px] text-slate-400 mt-4">
          SSL 256-Bit Encrypted &bull; No Software Installation Required &bull; Certified Network Protocol
        </p>
      </section>

    </div>
  );
}
