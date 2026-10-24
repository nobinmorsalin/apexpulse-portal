'use client';

import { useState, useEffect } from 'react';
import type { PortalAd } from '@/types/portal';

export default function AdminAdsPage() {
  const [ads, setAds] = useState<PortalAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/ads')
      .then((res) => res.json())
      .then((data) => {
        setAds(data.ads || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleUpdate = async (ad: PortalAd) => {
    setSavingId(ad.id);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/ads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ad),
      });
      if (res.ok) {
        setMessage(`Updated ${ad.name} successfully.`);
      } else {
        setMessage('Failed to update.');
      }
    } catch {
      setMessage('Error connecting to server.');
    } finally {
      setSavingId(null);
    }
  };

  const handleFieldChange = (id: string, field: keyof PortalAd, value: any) => {
    setAds((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  if (loading) {
    return <div className="p-8 text-xs text-slate-400">Loading ad configuration from Supabase...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-slate-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Monetag & Ad Networks Manager</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure OnClick Popunders, Vignette banners, In-Page Push, and SmartLinks with instant database persistence.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-medium">
          {message}
        </div>
      )}

      <div className="space-y-6">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-indigo-400">{ad.ad_key}</span>
                <h3 className="text-base font-bold text-white">{ad.name}</h3>
                <p className="text-xs text-slate-400">{ad.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={ad.is_active}
                    onChange={(e) => handleFieldChange(ad.id, 'is_active', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0 bg-slate-950 border-slate-700"
                  />
                  <span className={ad.is_active ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                    {ad.is_active ? 'ENABLED' : 'DISABLED'}
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Monetag Zone ID (if applicable)</label>
                <input
                  type="text"
                  value={ad.zone_id || ''}
                  placeholder="e.g. 1029384"
                  onChange={(e) => handleFieldChange(ad.id, 'zone_id', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Script URL (Direct Tag Source)</label>
                <input
                  type="text"
                  value={ad.script_url || ''}
                  placeholder="e.g. //thubanoa.com/1?z=1029384"
                  onChange={(e) => handleFieldChange(ad.id, 'script_url', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              {ad.ad_key === 'smartlink' && (
                <div className="md:col-span-2">
                  <label className="block text-amber-400 font-semibold mb-1">Monetag SmartLink (Direct Link URL)</label>
                  <input
                    type="text"
                    value={ad.smartlink_url || ''}
                    placeholder="e.g. https://otieuwai.net/4/1029384"
                    onChange={(e) => handleFieldChange(ad.id, 'smartlink_url', e.target.value)}
                    className="w-full bg-slate-950 border border-amber-900/50 rounded-lg px-3 py-2 text-amber-200 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-slate-400 mb-1">Custom Ad Code Snippet (HTML / Javascript Tag)</label>
                <textarea
                  rows={2}
                  value={ad.code_snippet || ''}
                  placeholder="Paste full <script> or iframe code snippet provided by Monetag / Adsterra"
                  onChange={(e) => handleFieldChange(ad.id, 'code_snippet', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => handleUpdate(ad)}
                disabled={savingId === ad.id}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition disabled:opacity-50"
              >
                {savingId === ad.id ? 'Saving to Database...' : 'Save Changes'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
