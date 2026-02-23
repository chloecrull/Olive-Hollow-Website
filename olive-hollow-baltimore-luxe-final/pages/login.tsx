import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabaseClient';

/**
 * Simple email/password login page. Users who belong to the owner role can
 * access the owner dashboard. Supabase Auth handles authentication. For
 * production use you should implement proper error handling and multi-factor
 * authentication.
 */
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push('/admin');
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-12">
        <div className="rounded-3xl border border-white/10 bg-ink-800/70 p-8 shadow-luxe">
          <h1 className="text-2xl font-semibold text-champagne-200">Sign in</h1>
          <p className="mt-2 text-sm text-white/70">Owners and residents can access their portals here.</p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                required
              />
            </div>
            {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
            <button type="submit" className="w-full rounded-xl bg-champagne-300 px-4 py-2.5 text-sm font-semibold text-ink-900 shadow-luxe hover:bg-champagne-200">
              Login
            </button>
          </form>
          <p className="mt-6 text-xs text-white/60">
            Need help? Email <a className="font-semibold text-champagne-200 hover:text-champagne-100" href="mailto:support@olivehollowproperties.com">support@olivehollowproperties.com</a>.
          </p>
        </div>
      </main>
    </div>
  );
}