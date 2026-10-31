'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { PortalArticle } from '@/types/portal';

interface ArticleExplorerProps {
  initialArticles: PortalArticle[];
}

export default function ArticleExplorer({ initialArticles }: ArticleExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Computer Science',
    'Artificial Intelligence',
    'Cybersecurity',
    'Software Architecture',
    'Cloud Systems',
    'Digital Economics',
  ];

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8" id="articles">
      {/* Search and Category Filter Controls */}
      <div className="bg-[#101524] border border-[#171e31] rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Peer-Reviewed Publications Directory</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Showing {filteredArticles.length} research papers and technical whitepapers
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search intelligence index..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#06080e] border border-[#232d48] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-mono transition"
            />
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-[#171e31]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer font-mono ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-[#171e31] text-slate-300 hover:bg-[#232d48] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-[#101524] border border-[#171e31] rounded-2xl">
          <p className="text-slate-400 text-sm font-medium">No publications found matching your query.</p>
          <button
            type="button"
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-3 text-xs text-cyan-400 font-bold hover:underline font-mono"
          >
            Reset Search Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-[#101524] border border-[#171e31] rounded-2xl p-6 shadow-xl hover:border-cyan-500/40 hover:-translate-y-1 transition duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-mono">
                    {article.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {article.reading_time}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                  <Link href={`/article/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#171e31] flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px] truncate max-w-[160px]">
                  {article.author}
                </span>
                <Link
                  href={`/article/${article.slug}`}
                  className="text-cyan-400 font-bold hover:text-cyan-300 flex items-center gap-1 font-mono text-[11px]"
                >
                  Read Paper &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
