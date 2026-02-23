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
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}