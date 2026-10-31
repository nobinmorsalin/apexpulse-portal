import React from 'react';
import AdminAuthGuard from '@/components/AdminAuthGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col md:flex-row antialiased font-sans">
        {/* Filament Navigation Sidebar */}
        <AdminSidebar />

        {/* Filament Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Filament Bar */}
          <header className="h-14 border-b border-slate-800/80 bg-[#090d18]/70 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-slate-500">APEXPULSE</span>
              <span className="text-slate-600">/</span>
              <span className="text-cyan-400 font-semibold">FILAMENT ENGINE</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">CONSOLE</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Supabase Cloud: Synced</span>
              </div>
            </div>
          </header>

          {/* Main View Area */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#070a13]">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
