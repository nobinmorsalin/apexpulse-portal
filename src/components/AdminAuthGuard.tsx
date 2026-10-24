'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('apex_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('apex_admin_auth', 'true');
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Invalid administrator credentials');
      }
    } catch {
      setError('Connection failed. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('apex_admin_auth');
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-xs text-slate-500 font-mono">
        Validating access token...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Logo size="md" showTagline={true} />
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800/40 px-3 py-1 rounded-full inline-block">
              Restricted Admin Authentication
            </div>
            <p className="text-xs text-slate-400">
              Enter verified master credentials to access system management.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Administrator Email</label>
              <input
                type="email"
                required
                placeholder="nobin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Master Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Authenticate & Unlock Control Desk'}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 text-center">
            <a href="/" className="text-[11px] text-slate-500 hover:text-slate-300 transition">
              &larr; Return to Public Portal
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={handleLogout}
          className="px-3 py-1.5 rounded-lg bg-rose-950/80 border border-rose-800/60 text-rose-300 hover:bg-rose-900 text-xs font-semibold shadow-lg transition"
        >
          Logout Admin
        </button>
      </div>
      {children}
    </>
  );
}
