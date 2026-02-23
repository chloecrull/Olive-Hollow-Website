import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabaseClient';

/**
 * Tenant portal for logged‑in tenants. Tenants can submit maintenance
 * requests and initiate rent payments. A Stripe checkout session is
 * created by posting to an API route. In production you would query
 * the tenant’s unit and rent from the database.
 */
export default function TenantPortal() {
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [paying, setPaying] = useState(false);

  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from('maintenance_requests').insert({
        unit_id: 1,
        description,
        urgency: 'normal',
        status: 'submitted',
      });
    } catch {
      // ignore errors in local development
    }
    setSubmitted(true);
  };

  const payRent = async () => {
    setPaying(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 100000, unitId: 1 }), // $1000 rent represented in cents
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      // handle error
    }
    setPaying(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tenant portal</h1>
          <p className="mt-2 text-white/70">Pay rent and submit maintenance requests in one place.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-luxe">
            <h2 className="text-lg font-semibold text-champagne-200">Maintenance request</h2>
            <p className="mt-1 text-sm text-white/70">Describe the issue. Our team will respond promptly.</p>
            {submitted ? (
              <div className="mt-4 rounded-2xl bg-white/5 p-4 text-sm text-white/80 ring-1 ring-white/10">
                Request submitted. We will follow up soon.
              </div>
            ) : (
              <form onSubmit={submitRequest} className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80">What is going on?</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                    rows={5}
                    placeholder="Example: Kitchen sink is leaking under the cabinet"
                    required
                  />
                </div>
                <button type="submit" className="rounded-xl bg-champagne-300 px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-luxe hover:bg-champagne-200">
                  Submit
                </button>
              </form>
            )}
          </section>

          <section className="rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-luxe">
            <h2 className="text-lg font-semibold text-champagne-200">Pay rent</h2>
            <p className="mt-1 text-sm text-white/70">Secure payments via Stripe (ACH or card).</p>
            <div className="mt-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs text-white/60">Current amount</p>
              <p className="mt-1 text-2xl font-semibold">$1,000</p>
              <p className="mt-1 text-xs text-white/60">Demo amount. Connect Stripe and tenant rent to make dynamic.</p>
            </div>
            <button
              onClick={payRent}
              disabled={paying}
              className="mt-4 w-full rounded-xl bg-champagne-300 px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-luxe hover:bg-champagne-200 disabled:opacity-60"
            >
              {paying ? 'Redirecting to payment…' : 'Pay now'}
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}