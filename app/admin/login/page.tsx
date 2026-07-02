'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setAuthError(data.error || 'Invalid password');
      }
    } catch {
      setAuthError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-bg">
      <div className="bg-white rounded-3xl p-10 shadow-lg max-w-sm mx-4 w-full">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <SettingsIcon className="text-primary" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-dark text-center mb-2 font-heading">Admin Access</h1>
        <p className="text-dark/50 text-sm text-center mb-6 font-label">Enter the admin password to continue</p>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder="Password"
            autoFocus
            disabled={loading}
          />
          {authError && <p className="text-red-600 text-xs">{authError}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors font-label inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </section>
  );
}
