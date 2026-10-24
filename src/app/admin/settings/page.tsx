'use client';

import { useState, useEffect } from 'react';
import type { PortalSettings } from '@/types/portal';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PortalSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data.settings);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage('Site settings updated successfully in Supabase.');
      } else {
        setMessage('Failed to update settings.');
      }
    } catch {
      setMessage('Error connecting to server.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return <div className="p-8 text-xs text-slate-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Site & SEO Brand Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Control website branding, verification meta tags, and global injection scripts.
        </p>
      </div>

      {message && (
        <div className="p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-medium">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 text-xs">
        {/* Branding Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Brand Identity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Site Title / Brand Name</label>
              <input
                type="text"
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Brand Tagline</label>
              <input
                type="text"
                value={settings.site_tagline}
                onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-400 mb-1">Site Meta Description</label>
              <textarea
                rows={2}
                value={settings.site_description}
                onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Logo URL (Optional)</label>
              <input
                type="text"
                value={settings.logo_url || ''}
                placeholder="https://example.com/logo.png"
                onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Contact Email</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Verification Meta Tags Section */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Ad Network & Search Verification
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-amber-400 font-semibold mb-1">
                Monetag Verification Code / Meta Content
              </label>
              <p className="text-[11px] text-slate-400 mb-1">
                When adding your site to Monetag, copy the verification code string or tag here.
              </p>
              <input
                type="text"
                value={settings.monetag_verification_meta || ''}
                placeholder="e.g. 1a2b3c4d5e6f7g8h"
                onChange={(e) => setSettings({ ...settings, monetag_verification_meta: e.target.value })}
                className="w-full bg-slate-950 border border-amber-900/60 rounded-lg px-3 py-2 text-amber-300 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-cyan-400 font-semibold mb-1">
                Google Search Console Verification Meta Tag (or content)
              </label>
              <input
                type="text"
                value={settings.google_verification_meta || ''}
                placeholder="e.g. google-site-verification=abc..."
                onChange={(e) => setSettings({ ...settings, google_verification_meta: e.target.value })}
                className="w-full bg-slate-950 border border-cyan-900/60 rounded-lg px-3 py-2 text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-emerald-400 font-semibold mb-1">
                Ad Click Cooldown / Frequency Capping (Minutes)
              </label>
              <p className="text-[11px] text-slate-400 mb-1">
                Once an ad pops up or redirects, how many minutes must pass before another ad can trigger? (Recommended: 15 minutes to let readers browse peacefully without ad spam).
              </p>
              <input
                type="number"
                min="1"
                max="1440"
                value={settings.ad_cooldown_minutes ?? 15}
                onChange={(e) => setSettings({ ...settings, ad_cooldown_minutes: parseInt(e.target.value, 10) || 15 })}
                className="w-full md:w-48 bg-slate-950 border border-emerald-900/60 rounded-lg px-3 py-2 text-emerald-300 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Global Script Injection */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Custom Header & Footer Scripts
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 mb-1">Custom &lt;head&gt; Scripts</label>
              <textarea
                rows={3}
                value={settings.custom_head_scripts || ''}
                placeholder="<!-- Paste custom analytics, pixel, or CSS here -->"
                onChange={(e) => setSettings({ ...settings, custom_head_scripts: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Custom &lt;footer&gt; Scripts</label>
              <textarea
                rows={3}
                value={settings.custom_footer_scripts || ''}
                placeholder="<!-- Paste tracking scripts before </body> -->"
                onChange={(e) => setSettings({ ...settings, custom_footer_scripts: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
          >
            {saving ? 'Saving Settings...' : 'Save Settings to Database'}
          </button>
        </div>
      </form>
    </div>
  );
}
