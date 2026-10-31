import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticleBySlug, getPublishedArticles, getPortalAds, incrementArticleViews } from '@/lib/portal-service';
import AdRenderer from '@/components/AdRenderer';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Publication Not Found | ApexPulse Global' };

  return {
    title: `${article.title} | ApexPulse Global`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.created_at,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Increment views
  await incrementArticleViews(slug);

  const allArticles = await getPublishedArticles();
  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 3);
  const ads = await getPortalAds();
  const smartLinkAd = ads.find((a) => a.ad_key === 'smartlink' && a.is_active);
  const smartLinkUrl = smartLinkAd?.smartlink_url || '/gateway';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8 font-sans">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-cyan-400 transition">Dispatch</Link>
        <span>/</span>
        <span className="text-cyan-400">{article.category}</span>
        <span>/</span>
        <span className="text-slate-500 truncate max-w-[200px]">{article.title}</span>
      </nav>

      {/* Article Header Card */}
      <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
          <span>{article.category}</span>
          <span>&bull;</span>
          <span>Peer-Reviewed Publication</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-[#171e31]">
          <span className="font-semibold text-white">{article.author}</span>
          <span>&bull;</span>
          <span>{article.reading_time}</span>
          <span>&bull;</span>
          <span className="text-emerald-400 font-semibold">{article.views_count + 1} Reads</span>
        </div>

        {/* Lead Excerpt */}
        <p className="text-base text-slate-300 leading-relaxed italic pt-2 border-t border-[#171e31]">
          {article.excerpt}
        </p>
      </div>

      {/* In-Content Ad Placement */}
      <AdRenderer ads={ads} slot="content" />

      {/* Main Article Body */}
      <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
        {article.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-8 mb-3 border-b border-[#171e31] pb-2">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            const listItems = paragraph.split('\n').map((item) => item.replace(/^- /, ''));
            return (
              <ul key={idx} className="space-y-2.5 my-4 list-disc list-inside bg-[#06080e] border border-[#171e31] p-5 rounded-xl font-mono text-xs sm:text-sm">
                {listItems.map((li, lIdx) => (
                  <li key={lIdx} className="text-slate-300">
                    <span dangerouslySetInnerHTML={{ __html: li.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-slate-300 leading-relaxed">
              {paragraph}
            </p>
          );
        })}

        {/* Citation Notice */}
        <div className="mt-8 pt-6 border-t border-[#171e31] text-xs text-slate-400 font-mono space-y-1 bg-[#06080e] p-4 rounded-xl">
          <div className="font-bold text-white">Suggested Citation Format:</div>
          <div>{article.author}. "{article.title}." <em>ApexPulse Global Technical Review</em>, vol. 14, no. 4, 2026.</div>
        </div>
      </div>

      {/* Institutional Gateway Conversion Callout */}
      <div className="bg-gradient-to-r from-cyan-950 via-[#101524] to-blue-950 text-white rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-2xl border border-cyan-500/30">
        <h3 className="text-lg font-bold">Access the Verified Laboratory Sandbox</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Verify peer-reviewed software code, distributed network telemetry, and synthetic browser profiles directly through our secure repository node.
        </p>
        <div className="pt-2">
          <a
            href={smartLinkUrl}
            target={smartLinkUrl.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition"
          >
            Authenticate & Access Laboratory Pass &rarr;
          </a>
        </div>
      </div>

      {/* Related Publications Grid */}
      <div className="space-y-4 pt-6">
        <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
          Related Research Publications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.id}
              href={`/article/${rel.slug}`}
              className="block p-5 rounded-2xl bg-[#101524] border border-[#171e31] hover:border-cyan-500/40 hover:-translate-y-1 transition duration-300 group shadow-lg"
            >
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">{rel.category}</span>
              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition mt-1 line-clamp-2">
                {rel.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
