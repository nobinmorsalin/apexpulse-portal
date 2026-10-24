import Link from 'next/link';
import { getPortalSettings } from '@/lib/portal-service';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getPortalSettings();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-black text-white text-sm shadow">
              AP
            </div>
            <div>
              <div className="font-bold text-sm text-white">Admin Control Desk</div>
              <div className="text-[11px] text-indigo-400 font-mono truncate">{settings.site_name}</div>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-800/80 text-white hover:bg-slate-800 transition"
            >
              <span>Dashboard Overview</span>
            </Link>
            <Link
              href="/admin/articles"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60 hover:text-white transition"
            >
              <span>Articles Manager</span>
            </Link>
            <Link
              href="/admin/ads"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-amber-400 hover:bg-slate-800/60 transition"
            >
              <span>Monetag & Ad Networks</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60 hover:text-white transition"
            >
              <span>Site & SEO Settings</span>
            </Link>
            <Link
              href="/admin/pages"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60 hover:text-white transition"
            >
              <span>Pages & Portfolio</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-2 text-xs">
          <div className="text-[11px] text-slate-500 font-mono">Database: Supabase (AWS)</div>
          <Link
            href="/"
            target="_blank"
            className="block text-center py-2 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 transition font-semibold"
          >
            View Live Portal &rarr;
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
