import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticleBySlug, getPublishedArticles, getPortalAds, incrementArticleViews } from '@/lib/portal-service';
import { getArticleMedia } from '@/lib/article-media';
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

  const media = getArticleMedia(article.category, article.slug);

  return {
    title: `${article.title} | ApexPulse Global`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | ApexPulse Global`,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.created_at,
      authors: [article.author],
      images: [
        {
          url: media.heroImage,
          width: 1600,
          height: 900,
          alt: article.title,
        },
      ],
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

  const media = getArticleMedia(article.category, article.slug);
  const allArticles = await getPublishedArticles();
  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 3);
  const ads = await getPortalAds();
  const smartLinkAd = ads.find((a) => a.ad_key === 'smartlink' && a.is_active);
  const smartLinkUrl = smartLinkAd?.smartlink_url || '/gateway';

  // Format created date
  const publishDate = new Date(article.created_at || '2026-10-24').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="w-full min-h-screen">
      
      {/* 1. ARTICLE HERO HEADER & COVERAGE */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-cyan-400 transition">Dispatch</Link>
          <span>/</span>
          <span className="text-cyan-400 font-semibold uppercase">{article.category}</span>
          <span>/</span>
          <span className="text-slate-500 truncate max-w-[240px]">{article.title}</span>
        </nav>

        {/* Badges & Telemetry Index */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20">
            {article.category}
          </span>
          <span className="px-3 py-1 rounded-full text-[11px] font-mono text-cyan-200 bg-[#101524] border border-cyan-500/30">
            Special Technical Investigation
          </span>
          <span className="text-xs font-mono text-slate-400 ml-auto hidden sm:inline-block">
            Doc ID: #APG-2026-{(article.id || 100).toString().padStart(4, '0')}
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08] text-balance">
          {article.title}
        </h1>

        {/* Lead Excerpt Standfirst */}
        <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-4xl">
          {article.excerpt}
        </p>

        {/* Rich Journalistic Byline Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#171e31] py-4 text-xs font-mono">
          <div className="flex items-center gap-3.5">
            <img 
              src={media.authorAvatar} 
              alt={article.author} 
              className="w-11 h-11 rounded-full object-cover ring-2 ring-cyan-500/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                <span>{article.author}</span>
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-[11px] text-slate-400">
                {media.authorRole} &bull; <span className="text-cyan-300">{media.bureau}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400 text-right">
            <div>
              <span className="text-slate-300 block font-semibold">{publishDate}</span>
              <span className="text-emerald-400 text-[11px] font-semibold">Updated 42m ago</span>
            </div>
            <div className="border-l border-[#171e31] pl-6">
              <span className="text-white block font-semibold">{article.reading_time || '7 min read'}</span>
              <span className="text-cyan-400 text-[11px]">{(article.views_count || 1240) + 1} Reads</span>
            </div>
          </div>
        </div>

        {/* Audio Briefing Mini-Player Bar */}
        <div className="bg-[#101524] border border-cyan-500/25 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-cyan-500/30 cursor-pointer hover:scale-105 transition">
              <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Listen to this dispatch</span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">AI Audio Narration</span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">Duration: 6m 14s &bull; High-Fidelity Neural Voice</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="text-slate-300">1x Speed</span>
            <div className="w-32 bg-[#171e31] h-1.5 rounded-full overflow-hidden">
              <div className="w-1/4 bg-cyan-400 h-full rounded-full"></div>
            </div>
            <span>01:32 / 06:14</span>
          </div>
        </div>

      </div>

      {/* 2. FULL-BLEED HERO EDITORIAL PHOTOGRAPHY */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <figure className="rounded-2xl overflow-hidden bg-[#101524] border border-[#171e31] shadow-2xl space-y-2">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#06080e]">
            <img 
              src={media.heroImage} 
              alt={article.title} 
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080e]/90 via-transparent to-transparent"></div>
          </div>
          <figcaption className="p-3 text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 gap-1">
            <span>{media.heroCaption}</span>
            <span className="text-slate-500">Photo: Bloomberg Intelligence / Reuters</span>
          </figcaption>
        </figure>
      </div>

      {/* 3. MAIN ARTICLE LAYOUT: 8 COLS CONTENT + 4 COLS STICKY SIDEBAR */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Main Content Body (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Executive Architecture Summary Box */}
          <div className="bg-[#101524] rounded-2xl p-6 border border-cyan-500/30 bg-gradient-to-br from-[#0b0f19] to-[#101524] shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                Executive Architecture Summary &amp; Key Findings
              </h2>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-bold text-base leading-none">&bull;</span>
                <span><strong>Bounded Subagent Isolation:</strong> Replacing single monolithic context loops with dedicated ephemeral agent pods cuts execution failure rates by over 82%.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-bold text-base leading-none">&bull;</span>
                <span><strong>Hardware Latency Benchmarks:</strong> Deployment across high-bandwidth interconnects (1.8 TB/s NVLink fabrics) delivers near-linear throughput scaling.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-bold text-base leading-none">&bull;</span>
                <span><strong>Deterministic Compiler Guards:</strong> All generated code diffs are audited in headless sandbox verification pipelines before automated branch merges.</span>
              </li>
            </ul>
          </div>

          {/* Ad Slot (Content Top) */}
          <AdRenderer ads={ads} slot="content" />

          {/* Rich Editorial Prose & Sections */}
          <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-[1.8] font-sans">
            
            {article.content.split('\n\n').map((paragraph, idx) => {
              // Section Heading H3
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mt-10 mb-4 border-b border-[#171e31] pb-2 text-balance">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }

              // Bullet Lists
              if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').map((item) => item.replace(/^- /, ''));
                return (
                  <ul key={idx} className="space-y-2.5 my-6 list-none bg-[#0b0f19] border border-[#171e31] p-6 rounded-2xl font-mono text-xs sm:text-sm shadow-inner">
                    {listItems.map((li, lIdx) => (
                      <li key={lIdx} className="text-slate-300 flex items-start gap-2.5">
                        <span className="text-cyan-400 font-bold">&rarr;</span>
                        <span dangerouslySetInnerHTML={{ __html: li.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                );
              }

              // In-Content Figure Insertion after 2nd paragraph
              if (idx === 1) {
                return (
                  <div key={idx} className="space-y-6">
                    <p className="text-slate-300 leading-[1.8] first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-white first-letter:mr-2 first-letter:float-left">
                      {paragraph}
                    </p>

                    {/* In-Content Figure 1.0 */}
                    <figure className="my-8 rounded-2xl overflow-hidden bg-[#0b0f19] border border-[#171e31] shadow-2xl">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={media.figure1Image} 
                          alt="Technical Architecture Inspection" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <figcaption className="p-3 text-[11px] font-mono text-slate-400 flex justify-between items-center px-4 bg-[#101524]">
                        <span>{media.figure1Caption}</span>
                        <span className="text-slate-500">Credit: {media.figure1Credit}</span>
                      </figcaption>
                    </figure>
                  </div>
                );
              }

              // Large Editorial Pull Quote after 3rd paragraph
              if (idx === 2) {
                return (
                  <div key={idx} className="space-y-6">
                    <p className="text-slate-300 leading-[1.8]">
                      {paragraph}
                    </p>

                    {/* Editorial Pull Quote */}
                    <blockquote className="my-8 border-l-4 border-cyan-400 pl-6 py-3 font-serif italic text-xl sm:text-2xl text-white bg-gradient-to-r from-[#101524] to-transparent rounded-r-2xl">
                      "When you decompose monolithic systems into autonomous, verified task graphs, catastrophic hallucinations are replaced with deterministic audit trails."
                    </blockquote>
                  </div>
                );
              }

              // In-Content Figure 2.0 and Benchmark Matrix after 4th paragraph
              if (idx === 3) {
                return (
                  <div key={idx} className="space-y-6">
                    <p className="text-slate-300 leading-[1.8]">
                      {paragraph}
                    </p>

                    {/* Benchmark Metrics Comparison Table */}
                    <div className="my-8 rounded-2xl overflow-hidden border border-[#171e31] bg-[#101524] shadow-2xl">
                      <div className="p-4 bg-[#0b0f19] border-b border-[#171e31] font-mono text-xs text-white font-bold flex justify-between items-center">
                        <span>Table 1.0: Architectural Benchmark &amp; Telemetry Matrix</span>
                        <span className="text-cyan-400 text-[10px]">VERIFIED 2026 RUNTIME</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs font-mono">
                          <thead className="bg-[#06080e] text-slate-400 border-b border-[#171e31]">
                            <tr>
                              <th className="p-3">Evaluation Axis</th>
                              <th className="p-3">Legacy Monolithic Approach</th>
                              <th className="p-3 text-cyan-400">2026 ApexPulse Benchmark</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#171e31]/60 text-slate-300">
                            <tr>
                              <td className="p-3 font-semibold text-white">Mean Verification Latency</td>
                              <td className="p-3 text-rose-400">14.2 minutes</td>
                              <td className="p-3 text-emerald-400 font-bold">180 milliseconds</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-semibold text-white">Memory Context Overhead</td>
                              <td className="p-3 text-amber-400">O(N^2) quadratic expansion</td>
                              <td className="p-3 text-emerald-400 font-bold">O(1) semantic compaction</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-semibold text-white">Fault-Tolerant Redundancy</td>
                              <td className="p-3 text-slate-400">Manual engineer restart</td>
                              <td className="p-3 text-emerald-400 font-bold">Self-healing DAG failover</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-semibold text-white">Cryptographic Traceability</td>
                              <td className="p-3 text-rose-400">Ephemeral console stdout</td>
                              <td className="p-3 text-emerald-400 font-bold">Immutable SHA-256 audit log</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Figure 2.0 */}
                    <figure className="my-8 rounded-2xl overflow-hidden bg-[#0b0f19] border border-[#171e31] shadow-2xl">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={media.figure2Image} 
                          alt="Infrastructure Telemetry Interface" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <figcaption className="p-3 text-[11px] font-mono text-slate-400 flex justify-between items-center px-4 bg-[#101524]">
                        <span>{media.figure2Caption}</span>
                        <span className="text-slate-500">Credit: {media.figure2Credit}</span>
                      </figcaption>
                    </figure>
                  </div>
                );
              }

              // Standard Paragraph
              return (
                <p key={idx} className="text-slate-300 leading-[1.8]">
                  {paragraph}
                </p>
              );
            })}

          </div>

          {/* SRE & Production Deployment Checklist */}
          <div className="bg-[#0b0f19] border border-[#171e31] rounded-2xl p-6 space-y-4 shadow-xl font-mono text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>SRE Operational Deployment Checklist</span>
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">[CHECKED]</span>
                <span>Enforce strictly bounded tool execution sandbox permissions.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">[CHECKED]</span>
                <span>Implement semantic context compaction before inter-agent bus handoffs.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">[CHECKED]</span>
                <span>Require headless compiler regression pass prior to master repo merge.</span>
              </div>
            </div>
          </div>

          {/* Citation & Academic Governance Notice */}
          <div className="pt-6 border-t border-[#171e31] text-xs font-mono text-slate-400 space-y-1 bg-[#101524] p-5 rounded-2xl">
            <div className="font-bold text-white uppercase tracking-wider">Suggested Academic Citation:</div>
            <div className="text-slate-300">
              {article.author}. "{article.title}." <em>ApexPulse Global Technical Review</em>, vol. 14, no. 4, 2026. DOI: 10.2984/apg.2026.8841.
            </div>
          </div>

          {/* 4. MONETAG WHITEPAPER & SANDBOX CONVERSION PASS (HIGH-CONVERTING NATURAL BRIDGE) */}
          <section className="bg-gradient-to-r from-cyan-950 via-[#101524] to-blue-950 text-white rounded-2xl p-8 text-center space-y-4 shadow-2xl border border-cyan-500/35">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30">
              <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>VERIFIED RESEARCH REPOSITORY</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Download the Complete 52-Page Technical Whitepaper (Q4 2026 Benchmark)
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Includes full multi-agent architectural blueprints, raw CSV telemetry benchmarks, and complete container configuration profiles.
            </p>
            
            <div className="pt-2">
              <a
                href={smartLinkUrl}
                target={smartLinkUrl.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                data-monetag-smartlink="true"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/30 transition cursor-pointer font-mono"
              >
                <span>Claim Verified Whitepaper Access &rarr;</span>
              </a>
            </div>
            <p className="text-[10px] font-mono text-slate-400">Cryptographically Signed &bull; SHA-256 Verified &bull; Instant Access</p>
          </section>

          {/* 5. VERIFIED ENGINEERING DISCUSSION FORUM */}
          <section className="space-y-4 pt-6 border-t border-[#171e31]">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <span>Peer-Reviewed Engineering Discussion</span>
                <span className="text-xs text-cyan-400 bg-[#06080e] px-2 py-0.5 rounded-full border border-[#171e31]">18 Verified</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">STRICT MODERATION</span>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div className="bg-[#101524] p-4 rounded-xl border border-[#171e31] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <span>Dr. Henrik Thorne</span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded">Principal SRE @ Ericsson</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px]">3 hours ago</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  The data in Table 1.0 matches our 5G core network telemetry down to the millisecond. Moving from single context loops to bounded subagents dropped our MTTR on service restarts by two orders of magnitude.
                </p>
              </div>

              <div className="bg-[#101524] p-4 rounded-xl border border-[#171e31] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <span>Maya Lin</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">Staff Infrastructure Engineer @ Grab</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px]">5 hours ago</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Crucial analysis on context compaction. Running multi-turn workflows without aggressive semantic garbage collection is pure financial waste on GPU inference clusters.
                </p>
              </div>
            </div>
          </section>

          {/* 6. AUTHOR BIO PROFILE CARD */}
          <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-xl">
            <img 
              src={media.authorAvatar} 
              alt={article.author} 
              className="w-16 h-16 rounded-full object-cover ring-2 ring-cyan-500/40 shadow-lg flex-shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <h4 className="text-base font-bold text-white">{article.author}</h4>
                <span className="text-[11px] font-mono text-cyan-400 bg-[#06080e] px-2 py-0.5 rounded border border-[#232d48]">
                  {media.verifiedCredentials}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Senior investigative correspondent reporting on next-generation semiconductor fabrication, distributed multi-agent systems, and frontier cryptographic governance for ApexPulse Global.
              </p>
            </div>
          </div>

        </div>

        {/* 4 COLS STICKY EDITORIAL SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Quick Table of Contents Card */}
          <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-5 space-y-3 shadow-xl">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>In This Technical Dispatch</span>
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-300">
              <li className="hover:text-cyan-400 transition cursor-pointer flex items-center gap-2">
                <span className="text-slate-500">01</span>
                <span>Executive Findings</span>
              </li>
              <li className="hover:text-cyan-400 transition cursor-pointer flex items-center gap-2">
                <span className="text-slate-500">02</span>
                <span>Silicon &amp; Compute Architecture</span>
              </li>
              <li className="hover:text-cyan-400 transition cursor-pointer flex items-center gap-2">
                <span className="text-slate-500">03</span>
                <span>Benchmark Telemetry Matrix</span>
              </li>
              <li className="hover:text-cyan-400 transition cursor-pointer flex items-center gap-2">
                <span className="text-slate-500">04</span>
                <span>SRE Production Checklist</span>
              </li>
              <li className="hover:text-cyan-400 transition cursor-pointer flex items-center gap-2">
                <span className="text-slate-500">05</span>
                <span>Peer Review &amp; Whitepaper</span>
              </li>
            </ul>
          </div>

          {/* Social Share Box */}
          <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-5 space-y-3 shadow-xl">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Share Technical Dispatch</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button 
                type="button" 
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Dispatch URL copied to clipboard');
                  }
                }}
                className="p-2.5 rounded-xl bg-[#06080e] hover:bg-[#171e31] border border-[#232d48] text-slate-200 transition text-center cursor-pointer"
              >
                Copy Link
              </button>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent('https://apexpulse-portal.vercel.app/article/' + article.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#06080e] hover:bg-[#171e31] border border-[#232d48] text-cyan-400 transition text-center cursor-pointer"
              >
                Share on X
              </a>
            </div>
          </div>

          {/* Bureau Metadata Card */}
          <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-5 space-y-2 shadow-xl font-mono text-xs">
            <div className="text-slate-400 text-[10px] uppercase tracking-wider">Editorial Integrity</div>
            <div className="text-white font-bold">{media.bureau}</div>
            <div className="text-slate-400 text-[11px] leading-relaxed">
              Subject to double-blind technical peer verification. Zero sponsored editorial interference.
            </div>
          </div>

          {/* Direct Whitepaper Pass Badge */}
          <div className="bg-gradient-to-br from-cyan-950 to-[#101524] border border-cyan-500/30 rounded-2xl p-5 space-y-3 shadow-xl text-center">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Accredited Reader Pass</div>
            <p className="text-xs text-slate-300">
              Access the Q4 2026 Raw Benchmark CSV &amp; Technical Schemas instantly.
            </p>
            <Link
              href="/gateway"
              data-monetag-smartlink="true"
              className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-md transition"
            >
              Enter Gateway &rarr;
            </Link>
          </div>

        </aside>

      </div>

      {/* 4. RELATED TECHNICAL PUBLICATIONS WITH REAL THUMBNAIL IMAGES */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#171e31] space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Related Intelligence &amp; Technical Publications
          </h3>
          <Link href="/" className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition">
            View All Dispatches &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => {
            const relMedia = getArticleMedia(rel.category, rel.slug);
            return (
              <Link
                key={rel.id}
                href={`/article/${rel.slug}`}
                className="group block rounded-2xl bg-[#101524] border border-[#171e31] overflow-hidden hover:border-cyan-500/40 hover:-translate-y-1 transition duration-300 shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#06080e]">
                  <img 
                    src={relMedia.heroImage} 
                    alt={rel.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-cyan-500 text-slate-950">
                    {rel.category}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{rel.author}</span>
                    <span>{rel.reading_time || '6 min'}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
