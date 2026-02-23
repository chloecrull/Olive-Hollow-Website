'use client';

import Section from '../../../components/Section';
import { useState } from 'react';

export default function TenantLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with Supabase authentication
    alert('Login functionality coming soon.');
  };

  return (
    <main className="pt-24">
      <Section>
        <h1 className="font-heading text-4xl mb-8 text-olivePrimary">Tenant Login</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div>
            <label className="block font-body mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-oliveSecondary rounded"
              required
            />
          </div>
          <div>
            <label className="block font-body mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-oliveSecondary rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-goldAccent text-olivePrimary rounded w-full transition-colors hover:bg-oliveSecondary hover:text-creamBackground"
          >
            Login
          </button>
        </form>
      </Section>
    </main>
  );
}