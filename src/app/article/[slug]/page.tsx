import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticleBySlug, getPublishedArticles, getPortalAds, incrementArticleViews } from '@/lib/portal-service';
import AdRenderer from '@/components/AdRenderer';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };

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
  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 2);
  const ads = await getPortalAds();
  const smartLinkAd = ads.find((a) => a.ad_key === 'smartlink' && a.is_active);
  const smartLinkUrl = smartLinkAd?.smartlink_url || '/gateway';

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Article Header */}
      <div className="space-y-4 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/60 text-indigo-300">
          <span>{article.category}</span>
          <span>&bull;</span>
          <span>Verified Publication</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
          <span>By {article.author}</span>
          <span>&bull;</span>
          <span>{article.reading_time}</span>
          <span>&bull;</span>
          <span>{article.views_count + 1} Views</span>
        </div>
      </div>

      {/* Excerpt Lead */}
      <p className="text-lg text-slate-300 leading-relaxed font-medium">
        {article.excerpt}
      </p>

      {/* In-Content Ad Slot */}
      <AdRenderer ads={ads} slot="content" />

      {/* Article Body Content */}
      <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-base leading-relaxed">
        {article.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-2xl font-bold text-white tracking-tight mt-8 mb-4">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            const listItems = paragraph.split('\n').map((item) => item.replace(/^- /, ''));
            return (
              <ul key={idx} className="space-y-2 my-4 list-disc list-inside bg-slate-900 border border-slate-800 p-5 rounded-xl">
                {listItems.map((li, lIdx) => (
                  <li key={lIdx} className="text-sm text-slate-300">
                    <span dangerouslySetInnerHTML={{ __html: li.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-slate-300">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* SmartLink Native CTA Box */}
      <div className="bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-6 sm:p-8 text-center my-10 space-y-4">
        <h3 className="text-lg font-bold text-white">Unlock Verified Developer Toolkits & Benchmarks</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Readers of this publication receive instant authorization to access high-speed sandbox infrastructure and authenticated digital passes.
        </p>
        <div>
          <a
            href={smartLinkUrl}
            target={smartLinkUrl.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition"
          >
            Claim Access Pass &rarr;
          </a>
        </div>
      </div>

      {/* Related Navigation */}
      <div className="border-t border-slate-800 pt-8 mt-12">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Recommended Intelligence
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.id}
              href={`/article/${rel.slug}`}
              className="block p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-600/50 transition group"
            >
              <span className="text-[11px] text-indigo-400 font-semibold">{rel.category}</span>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition mt-1">
                {rel.title} &rarr;
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
