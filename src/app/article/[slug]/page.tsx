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
  if (!article) return { title: 'Publication Not Found | ApexPulse Institute' };

  return {
    title: `${article.title} | ApexPulse Institute`,
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-blue-900 transition">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-blue-900">{article.category}</span>
        <span>&rsaquo;</span>
        <span className="text-slate-400 truncate max-w-[200px]">{article.title}</span>
      </nav>

      {/* Article Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 border border-blue-200 text-blue-900">
          <span>{article.category}</span>
          <span>&bull;</span>
          <span>Peer-Reviewed Publication</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="font-semibold text-slate-900">{article.author}</span>
          <span>&bull;</span>
          <span>{article.reading_time}</span>
          <span>&bull;</span>
          <span>{article.views_count + 1} Readers</span>
        </div>

        {/* Lead Excerpt */}
        <p className="text-base text-slate-700 leading-relaxed font-serif italic pt-2 border-t border-slate-100">
          {article.excerpt}
        </p>
      </div>

      {/* In-Content Ad Placement */}
      <AdRenderer ads={ads} slot="content" />

      {/* Main Article Body */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed">
        {article.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight mt-8 mb-3 border-b border-slate-100 pb-2">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            const listItems = paragraph.split('\n').map((item) => item.replace(/^- /, ''));
            return (
              <ul key={idx} className="space-y-2.5 my-4 list-disc list-inside bg-slate-50 border border-slate-200 p-5 rounded-xl">
                {listItems.map((li, lIdx) => (
                  <li key={lIdx} className="text-xs sm:text-sm text-slate-700">
                    <span dangerouslySetInnerHTML={{ __html: li.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-slate-700 leading-relaxed">
              {paragraph}
            </p>
          );
        })}

        {/* Citation Notice */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-500 font-mono space-y-1 bg-slate-50 p-4 rounded-lg">
          <div className="font-bold text-slate-700">Suggested Citation Format:</div>
          <div>{article.author}. "{article.title}." <em>ApexPulse Academic Review</em>, vol. 14, no. 4, 2026.</div>
        </div>
      </div>

      {/* Institutional Gateway Conversion Callout */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-md">
        <h3 className="text-lg font-serif font-bold">Access the Verified Laboratory Sandbox</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Verify peer-reviewed software code, distributed network telemetry, and synthetic browser profiles directly through our secure repository node.
        </p>
        <div className="pt-2">
          <a
            href={smartLinkUrl}
            target={smartLinkUrl.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            Authenticate & Access Laboratory Pass &rarr;
          </a>
        </div>
      </div>

      {/* Related Publications Grid */}
      <div className="space-y-4 pt-6">
        <h3 className="text-base font-serif font-bold text-slate-900">
          Related Research Publications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.id}
              href={`/article/${rel.slug}`}
              className="block p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-900/40 hover:shadow-sm transition group"
            >
              <span className="text-[10px] font-bold text-blue-900 uppercase">{rel.category}</span>
              <h4 className="text-xs font-serif font-bold text-slate-900 group-hover:text-blue-900 transition mt-1 line-clamp-2">
                {rel.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
