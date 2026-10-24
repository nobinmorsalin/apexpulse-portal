'use client';

import { useState, useEffect } from 'react';
import type { PortalPage } from '@/types/portal';

export default function AdminPagesManager() {
  const [pages, setPages] = useState<PortalPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState('portfolio');
  const [editingContent, setEditingContent] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [editingSubtitle, setEditingSubtitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchPages = () => {
    fetch('/api/admin/pages')
      .then((res) => res.json())
      .then((data) => {
        setPages(data.pages || []);
        const current = (data.pages || []).find((p: PortalPage) => p.slug === selectedSlug);
        if (current) {
          setEditingTitle(current.title);
          setEditingSubtitle(current.subtitle || '');
          setEditingContent(current.content);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSelectPage = (slug: string) => {
    setSelectedSlug(slug);
    const p = pages.find((item) => item.slug === slug);
    if (p) {
      setEditingTitle(p.title);
      setEditingSubtitle(p.subtitle || '');
      setEditingContent(p.content);
    }
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: selectedSlug,
          title: editingTitle,
          subtitle: editingSubtitle,
          content: editingContent,
        }),
      });

      if (res.ok) {
        setMessage(`Page [/${selectedSlug}] content saved to Supabase.`);
        fetchPages();
      } else {
        setMessage('Failed to save page.');
      }
    } catch {
      setMessage('Error connecting to database.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-xs text-slate-400">Loading pages from Supabase...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Legal & Portfolio Pages Manager</h1>
        <p className="text-xs text-slate-400 mt-1">
          Directly edit and update the content of your Privacy Policy, Terms, Research Portfolio, and Contact pages.
        </p>
      </div>

      {message && (
        <div className="p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-medium">
          {message}
        </div>
      )}

      {/* Page Tabs */}
      <div className="flex flex-wrap gap-2 text-xs">
        {pages.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => handleSelectPage(p.slug)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedSlug === p.slug
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            /{p.slug} ({p.title})
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 text-xs">
        <div>
          <label className="block text-slate-400 mb-1">Page Title</label>
          <input
            type="text"
            required
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Subtitle / Notice Header</label>
          <input
            type="text"
            value={editingSubtitle}
            onChange={(e) => setEditingSubtitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Page Markdown Content</label>
          <textarea
            rows={12}
            required
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Content to Database'}
          </button>
        </div>
      </form>
    </div>
  );
}
