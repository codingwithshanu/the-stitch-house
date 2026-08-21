'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Sparkles, Scissors, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@stitchhouse.com');
  const [password, setPassword] = useState('TheStitchHouse@9074371984');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-rosewood-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gold-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-cream-200 shadow-luxury relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-rosewood-800 flex items-center justify-center text-white mx-auto shadow-md">
            <Scissors className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
            The Stitch House
          </h1>
          <p className="text-xs text-gold-700 font-semibold tracking-widest uppercase">
            Boutique Admin Portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rosewood-50 border border-rosewood-200 rounded-xl flex items-center gap-2.5 text-xs text-rosewood-900">
            <AlertCircle className="w-4 h-4 text-rosewood-700 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@stitchhouse.com"
                className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-cream-50 border border-cream-200 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-cream-50 border border-cream-200 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Helper Box */}
        <div className="mt-8 pt-6 border-t border-cream-100 text-center">
          {/* <p className="text-[11px] text-charcoal-500 font-medium">
            Default Credentials: <br />
            <span className="font-mono text-rosewood-900 font-semibold">admin@stitchhouse.com</span> /{' '}
            <span className="font-mono text-rosewood-900 font-semibold">adminpassword123</span>
          </p> */}

          <Link
            href="/"
            className="inline-block mt-4 text-xs font-semibold text-gold-700 hover:text-rosewood-800 transition-colors"
          >
            ← Back to Website
          </Link>
        </div>

      </div>
    </div>
  );
}
