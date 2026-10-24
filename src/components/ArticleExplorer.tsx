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
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-serif font-black text-slate-900 tracking-tight">
              Peer-Reviewed Publications Directory
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredArticles.length} research papers and technical whitepapers
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search papers by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 font-medium transition"
            />
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
          <p className="text-slate-500 text-sm font-medium">No publications found matching your query.</p>
          <button
            type="button"
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-3 text-xs text-blue-900 font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-900/40 transition group flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {article.reading_time}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-blue-900 transition leading-snug">
                  <Link href={`/article/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium truncate max-w-[160px]">
                  {article.author}
                </span>
                <Link
                  href={`/article/${article.slug}`}
                  className="text-blue-900 font-bold hover:text-blue-700 hover:underline flex items-center gap-1"
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
