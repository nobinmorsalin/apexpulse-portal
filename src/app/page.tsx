import Link from 'next/link';
import { getPublishedArticles, getPortalAds } from '@/lib/portal-service';
import AdRenderer from '@/components/AdRenderer';

export const revalidate = 0; // Real-time dynamic rendering

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const ads = await getPortalAds();
  const smartLinkAd = ads.find((a) => a.ad_key === 'smartlink' && a.is_active);
  const smartLinkUrl = smartLinkAd?.smartlink_url || '/gateway';

  const featuredArticle = articles.find((a) => a.is_featured) || articles[0];
  const standardArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">

      {/* Hero Featured Story */}
      {featuredArticle && (
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/60 text-indigo-300">
                <span>Featured Whitepaper</span>
                <span>&bull;</span>
                <span>{featuredArticle.category}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                <Link href={`/article/${featuredArticle.slug}`} className="hover:text-indigo-400 transition">
                  {featuredArticle.title}
                </Link>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/article/${featuredArticle.slug}`}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition shadow-md"
                >
                  Read Analysis &rarr;
                </Link>
                <span className="text-xs text-slate-400">
                  {featuredArticle.reading_time} &bull; {featuredArticle.views_count} Views
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-900 border border-indigo-900/60 rounded-xl p-5 shadow-inner">
                <div className="text-xs font-mono text-indigo-400 mb-2">// Network Telemetry Matrix</div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Node Concurrency</span>
                    <span className="text-emerald-400 font-semibold">99.99% Online</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Verification Engine</span>
                    <span className="text-cyan-400 font-semibold">Active & Syncing</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Exit Route Bandwidth</span>
                    <span className="text-indigo-400 font-semibold">Optimized (Sub-150KB)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Ad Monetization Shield</span>
                    <span className="text-amber-400 font-semibold">Verified Safe</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800 text-center">
                  <Link href="/gateway" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4">
                    Launch Interactive Gateway &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Articles */}
      <section id="articles" className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white tracking-tight">Recent Editorial Analysis</h2>
          <span className="text-xs text-slate-400">Updated in real-time</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {standardArticles.map((article) => (
            <article
              key={article.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-600/60 transition group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition leading-snug">
                  <Link href={`/article/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>{article.reading_time}</span>
                <Link href={`/article/${article.slug}`} className="text-indigo-400 font-medium hover:underline">
                  Read Article &rarr;
                </Link>
              </div>
            </article>
          ))}

          {/* Dynamic Gateway Promotion Card */}
          <article className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-700/50 rounded-xl p-5 hover:border-indigo-500 transition group flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded">
                Verified Access Pass
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition leading-snug">
                <Link href="/gateway">Digital Session Verification & Reward Gateway</Link>
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Connect your session to verified distribution nodes. Fast verification for developer sandboxes and partner benefits.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-indigo-900/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Instant Access</span>
              <Link href="/gateway" className="text-amber-400 font-semibold hover:underline">
                Enter Gateway &rarr;
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* In-Content Banner Slot */}
      <AdRenderer ads={ads} slot="content" />

      {/* SmartLink Monetag Conversion Section */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-center">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Claim Your Verified Digital Pass</h3>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-6">
          Authorized readers and partner platform visitors are eligible for instant access to premium analytical toolkits and developer sandboxes.
        </p>
        <div>
          <a
            href={smartLinkUrl}
            target={smartLinkUrl.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer"
          >
            Continue to Verified Resource Gateway &rarr;
          </a>
        </div>
        <p className="text-[11px] text-slate-500 mt-3">SSL 256-Bit Encrypted &bull; Instant Authorization &bull; Safe Traffic Node</p>
      </section>

    </div>
  );
}
