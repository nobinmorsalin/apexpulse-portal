'use client';

import { useState, useEffect } from 'react';
import type { PortalArticle } from '@/types/portal';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<PortalArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Partial<PortalArticle> | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchArticles = () => {
    fetch('/api/admin/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title || !editingArticle.slug) return;
    setSaving(true);
    setMessage(null);

    try {
      const isNew = !editingArticle.id;
      const res = await fetch('/api/admin/articles', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingArticle),
      });

      if (res.ok) {
        setMessage(`Article ${isNew ? 'created' : 'updated'} successfully.`);
        setEditingArticle(null);
        fetchArticles();
      } else {
        setMessage('Failed to save article.');
      }
    } catch {
      setMessage('Error connecting to server.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Article deleted.');
        fetchArticles();
      }
    } catch {
      setMessage('Error deleting article.');
    }
  };

  if (loading) {
    return <div className="p-8 text-xs text-slate-400">Loading articles from Supabase...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-slate-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Articles & Intelligence Manager</h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish and edit whitepapers and articles to increase search indexing and organic dwell time.
          </p>
        </div>
        {!editingArticle && (
          <button
            type="button"
            onClick={() =>
              setEditingArticle({
                title: '',
                slug: '',
                category: 'Artificial Intelligence',
                excerpt: '',
                content: '',
                author: 'ApexPulse Intelligence Group',
                reading_time: '5 min read',
                is_published: true,
                is_featured: false,
              })
            }
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
          >
            + Create New Article
          </button>
        )}
      </div>

      {message && (
        <div className="p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-medium">
          {message}
        </div>
      )}

      {/* Editor Modal / Panel */}
      {editingArticle ? (
        <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white">
              {editingArticle.id ? 'Edit Article' : 'New Article Publication'}
            </h2>
            <button
              type="button"
              onClick={() => setEditingArticle(null)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Article Title</label>
              <input
                type="text"
                required
                value={editingArticle.title || ''}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
                  setEditingArticle({
                    ...editingArticle,
                    title,
                    slug: editingArticle.id ? editingArticle.slug : slug,
                  });
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">URL Slug</label>
              <input
                type="text"
                required
                value={editingArticle.slug || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Category</label>
              <select
                value={editingArticle.category || 'Artificial Intelligence'}
                onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Digital Finance">Digital Finance</option>
                <option value="Cloud Systems">Cloud Systems</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Author Name</label>
              <input
                type="text"
                value={editingArticle.author || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 mb-1">Short Excerpt</label>
              <textarea
                rows={2}
                required
                value={editingArticle.excerpt || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 mb-1">Full Article Content (Markdown or Text)</label>
              <textarea
                rows={10}
                required
                value={editingArticle.content || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-6 md:col-span-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingArticle.is_published || false}
                  onChange={(e) => setEditingArticle({ ...editingArticle, is_published: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-0 bg-slate-950 border-slate-700"
                />
                <span className="text-white">Publish Immediately</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingArticle.is_featured || false}
                  onChange={(e) => setEditingArticle({ ...editingArticle, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-0 bg-slate-950 border-slate-700"
                />
                <span className="text-white">Set as Homepage Featured Story</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setEditingArticle(null)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Article to Database'}
            </button>
          </div>
        </form>
      ) : (
        /* Articles List Table */
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-medium">
              <tr>
                <th className="p-4">Title & Slug</th>
                <th className="p-4">Category</th>
                <th className="p-4">Views</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-slate-850/50 transition">
                  <td className="p-4">
                    <div className="font-semibold text-white">{art.title}</div>
                    <div className="font-mono text-[11px] text-slate-400">/article/{art.slug}</div>
                  </td>
                  <td className="p-4 text-slate-300">{art.category}</td>
                  <td className="p-4 text-cyan-400 font-mono">{art.views_count}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${art.is_published ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' : 'bg-slate-800 text-slate-500'}`}>
                      {art.is_published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                    {art.is_featured && (
                      <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800/50">
                        FEATURED
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingArticle(art)}
                      className="px-2.5 py-1 rounded bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50 transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(art.id)}
                      className="px-2.5 py-1 rounded bg-rose-600/20 text-rose-400 hover:bg-rose-600/40 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
