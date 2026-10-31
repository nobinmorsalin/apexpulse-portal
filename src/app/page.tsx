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

      {/* 1. HERO SECTION: Split Lead Investigative Cover Story + The Live Wire */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Lead Feature Story (8 cols) */}
        <article className="lg:col-span-8 group relative rounded-2xl overflow-hidden bg-[#101524] border border-[#171e31] hover:border-cyan-500/40 transition duration-500 shadow-2xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#06080e]">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85" 
              alt="Autonomous Multi-Agent Neural Infrastructure Cluster" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/60 to-transparent"></div>
            
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-md">
                Special Investigation
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono text-cyan-200 bg-[#06080e]/80 backdrop-blur-md border border-cyan-500/30">
                {featuredArticle?.category || 'Compute & Systems'}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 hidden sm:block text-[10px] font-mono text-slate-400 bg-[#06080e]/70 backdrop-blur-md px-2.5 py-1 rounded">
              Photo: Bloomberg Intelligence / Getty
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" 
                alt="Sarah Jenkins" 
                className="w-7 h-7 rounded-full object-cover ring-2 ring-cyan-500/40"
              />
              <div>
                <span className="text-white font-medium">{featuredArticle?.author || 'Sarah Jenkins'}</span>
                <span className="text-slate-400 ml-1">&bull; Senior Infrastructure Editor</span>
              </div>
              <span className="text-slate-400 ml-auto font-mono text-[11px]">{featuredArticle?.reading_time || '8 min read'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:text-cyan-300 transition">
              <Link href={featuredArticle ? `/article/${featuredArticle.slug}` : '/article/autonomous-ai-agents-2026-orchestration'}>
                {featuredArticle?.title || 'Autonomous AI Agent Clusters Reach Industrial Parity: The End of Static Prompt Engineering'}
              </Link>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
              {featuredArticle?.excerpt || 'Across semiconductor fabs, high-frequency clearing houses, and sovereign defense networks, autonomous multi-agent graphs are superseding traditional human-in-the-loop pipelines. An exclusive benchmark analysis into context compression, self-healing code synthesis, and the new hardware economics of 2026.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#171e31]">
              <Link 
                href={featuredArticle ? `/article/${featuredArticle.slug}` : '/article/autonomous-ai-agents-2026-orchestration'} 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition"
              >
                <span>Read Full Report</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Updated 38m ago &bull; Zurich Bureau</span>
              </div>
            </div>
          </div>
        </article>

        {/* The Live Wire & Audio Dispatch (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Audio Briefing Box */}
          <div className="bg-[#101524] rounded-2xl p-5 border border-cyan-500/25 relative overflow-hidden bg-gradient-to-br from-[#0b0f19] to-[#101524] shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold">Daily Audio Briefing</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">4m 18s</span>
            </div>
            <p className="text-xs text-slate-200 font-medium mb-3">
              "TSMC 2nm yield rates, quantum resistant TLS rollouts, and the new European AI regulatory sandbox."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-cyan-500/30">
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div className="flex-grow">
                <div className="w-full bg-[#171e31] h-1.5 rounded-full overflow-hidden">
                  <div className="w-1/3 bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full"></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>01:24</span>
                  <span>04:18</span>
                </div>
              </div>
            </div>
          </div>

          {/* The Wire: Realtime Stream */}
          <div className="bg-[#101524] rounded-2xl p-5 border border-[#171e31] space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#171e31]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded bg-blue-500"></div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-white font-mono">The Intelligence Wire</h2>
              </div>
              <span className="text-[10px] font-mono text-slate-400">STREAM ACTIVE</span>
            </div>

            <div className="space-y-4 text-left">
              <div className="border-b border-[#171e31]/60 pb-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span className="text-cyan-400 font-semibold">SEMICONDUCTORS</span>
                  <span>14m ago</span>
                </div>
                <Link href="/" className="text-xs font-semibold text-slate-200 hover:text-cyan-300 transition leading-snug block">
                  Nvidia Blackwell Ultra clusters achieve 99.4% linear scaling in Scandinavian testbeds.
                </Link>
              </div>

              <div className="border-b border-[#171e31]/60 pb-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span className="text-emerald-400 font-semibold">CYBERSECURITY</span>
                  <span>42m ago</span>
                </div>
                <Link href="/" className="text-xs font-semibold text-slate-200 hover:text-emerald-300 transition leading-snug block">
                  NIST post-quantum cryptographic standards mandated for all Tier-1 banking backbones.
                </Link>
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span className="text-amber-400 font-semibold">DECENTRALIZED MARKETS</span>
                  <span>1h ago</span>
                </div>
                <Link href="/portfolio" className="text-xs font-semibold text-slate-200 hover:text-amber-300 transition leading-snug block">
                  Cross-border atomic settlement volume surpasses legacy SWIFT rails in southeast corridors.
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive Poll */}
          <div className="bg-[#101524] rounded-2xl p-5 border border-[#171e31] space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Reader Survey #104</span>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">1,842 Votes</span>
            </div>
            <h3 className="text-xs font-bold text-white leading-snug">
              Will autonomous software development agents replace 50%+ of junior engineering roles by 2027?
            </h3>
            <div className="space-y-2 pt-1 font-mono text-[11px]">
              <div className="p-2.5 rounded-lg bg-[#06080e] border border-[#232d48] flex justify-between items-center">
                <span className="text-slate-300">Yes, accelerating</span>
                <span className="text-cyan-400 font-semibold">74%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#06080e] border border-[#232d48] flex justify-between items-center">
                <span className="text-slate-400">No, augmenting</span>
                <span className="text-slate-400 font-semibold">26%</span>
              </div>
            </div>
          </div>

        </aside>

      </section>

      {/* 2. STRATEGIC DEEP DIVES GRID (3-Column Visual Features) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#171e31]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Strategic Analysis &amp; In-Depth Architecture
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">Curated by ApexPulse global correspondents.</p>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400">UPDATED REGULARLY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <article className="bg-[#101524] border border-[#171e31] rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-cyan-500/40 hover:-translate-y-1 transition duration-300 shadow-xl">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-[#06080e]">
                <img 
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80" 
                  alt="Quantum Cryogenic Processor Architecture" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 font-mono">
                  Cyber Defense
                </span>
              </div>
              
              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>Marcus Vance</span>
                  <span>&bull;</span>
                  <span>5 min read</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition leading-snug">
                  <Link href="/article/quantum-cryptography-zero-trust-networks">
                    Zero-Trust Architecture and Quantum Cryptography: Defending Modern Networks
                  </Link>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  Why global critical infrastructure is rapidly ditching traditional RSA-4096 in favor of lattice-based post-quantum cryptography to prevent adversary espionage.
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link href="/article/quantum-cryptography-zero-trust-networks" className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition font-mono">
                <span>Read Full Breakdown</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-[#101524] border border-[#171e31] rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-cyan-500/40 hover:-translate-y-1 transition duration-300 shadow-xl">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-[#06080e]">
                <img 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80" 
                  alt="High Frequency Financial Market Telemetry" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500 text-slate-950 font-mono">
                  Digital Finance
                </span>
              </div>
              
              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>Elena Rostova</span>
                  <span>&bull;</span>
                  <span>6 min read</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                  <Link href="/portfolio">
                    Decentralized Finance &amp; Global Digital Payments: The 2026 Settlement Protocol
                  </Link>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  How algorithmic settlement liquidity pools and programmable central bank digital rails are cutting cross-border transfer friction from 3 business days down to 400 milliseconds.
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition font-mono">
                <span>Read Full Breakdown</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </article>

          {/* Card 3: Enterprise Research Sandbox & Gateway */}
          <article className="bg-[#101524] border border-cyan-500/30 rounded-2xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition duration-300 shadow-xl bg-gradient-to-b from-[#101524] to-[#0b0f19]">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-[#06080e]">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" 
                  alt="Cloud Infrastructure & Testing Sandbox" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-85"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 font-mono">
                  Verified Portal
                </span>
                <div className="absolute bottom-3 left-3 right-3 bg-[#06080e]/80 backdrop-blur-md rounded-lg p-2 font-mono text-[10px] text-emerald-400 flex items-center justify-between">
                  <span>AUTH STATUS: VERIFIED</span>
                  <span className="text-cyan-300">TOKEN: #APG-882</span>
                </div>
              </div>
              
              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>ApexPulse Labs</span>
                  <span>&bull;</span>
                  <span className="text-amber-400 font-semibold">Accredited Access</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition leading-snug">
                  <Link href="/gateway">
                    Q4 Enterprise Benchmark Sandbox &amp; Automation Resource Distribution
                  </Link>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  Direct access gateway to authenticated developer profiles, synthetic traffic configurations, and verified whitepaper packages for authorized readers.
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link 
                href="/gateway" 
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md transition font-mono"
              >
                <span>Enter Verified Gateway</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </Link>
            </div>
          </article>

        </div>
      </section>

      {/* 3. PEER-REVIEWED PUBLICATIONS DIRECTORY (All 30 Articles Explorer) */}
      <ArticleExplorer initialArticles={articles} />

      {/* In-Content Placement Slot */}
      <AdRenderer ads={ads} slot="content" />

      {/* 4. THE MORNING FRONTIER NEWSLETTER */}
      <section className="bg-[#101524] rounded-2xl p-6 sm:p-10 border border-[#171e31] relative overflow-hidden bg-gradient-to-r from-[#0b0f19] via-[#101524] to-[#0b0f19] shadow-2xl">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>THE MORNING FRONTIER DISPATCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Join 85,000+ Senior Infrastructure Engineers, Analysts &amp; Executives
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Delivered every Tuesday and Thursday at 06:00 UTC. Zero sponsored fluff, pure unadulterated architectural intelligence and technical breakdown.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input 
              type="email" 
              placeholder="corporate.email@organization.com" 
              className="flex-grow px-4 py-2.5 rounded-xl bg-[#06080e] border border-[#232d48] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-mono transition"
            />
            <button type="button" className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition font-mono">
              Subscribe Free
            </button>
          </div>
          <p className="text-[10px] text-slate-400 font-mono">No telemetry tracking &bull; 256-Bit Cryptographic Privacy &bull; Instant One-Click Unsubscribe</p>
        </div>
      </section>

    </div>
  );
}
