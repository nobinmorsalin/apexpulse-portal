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

    const onCustomLogout = () => {
      localStorage.removeItem('apex_admin_auth');
      setIsAuthenticated(false);
    };
    window.addEventListener('apex-admin-logout', onCustomLogout);
    return () => window.removeEventListener('apex-admin-logout', onCustomLogout);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('apex_admin_auth', 'true');
        localStorage.setItem('apex_admin_email', data.email || email.trim());
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Authentication rejected: Invalid master credentials.');
      }
    } catch {
      setError('Connection failure: Unable to reach authentication gateway.');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#070a13] flex flex-col items-center justify-center text-xs text-slate-400 font-mono gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-500 animate-spin"></div>
        <div>Verifying institutional cryptographic tokens...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070a13] flex flex-col justify-center items-center px-4 relative overflow-hidden selection:bg-cyan-500/30">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md w-full bg-[#0c101d]/90 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-8 shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Logo size="md" showTagline={false} darkVariant={true} />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Filament Control Desk v3.2
            </div>
            
            <p className="text-xs text-slate-400 font-sans">
              Sign in with institutional administrator credentials to access the editorial engine and ad inventory.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs text-center font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-slate-300 mb-1.5 font-medium">Operator Identity / Email</label>
              <input
                type="email"
                required
                placeholder="nobin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111728] border border-slate-700/80 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 font-mono transition"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1.5 font-medium">Master Security Key</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111728] border border-slate-700/80 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 font-mono transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating Gate...' : 'Access Filament Console'}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 text-center">
            <a href="/" className="text-xs text-slate-400 hover:text-cyan-400 transition font-mono flex items-center justify-center gap-1.5">
              <span>&larr;</span> Return to Public Publication
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
