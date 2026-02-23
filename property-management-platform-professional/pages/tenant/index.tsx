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
          <p className="mt-2 text-slate-600">Pay rent and request maintenance in one place.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Maintenance request</h2>
            <p className="mt-1 text-sm text-slate-600">Describe the issue. Our team will respond quickly.</p>
            {submitted ? (
              <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                Request submitted. We’ll follow up soon.
              </div>
            ) : (
              <form onSubmit={submitRequest} className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">What’s going on?</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                    rows={5}
                    placeholder="Example: Kitchen sink is leaking under the cabinet"
                    required
                  />
                </div>
                <button type="submit" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
                  Submit
                </button>
              </form>
            )}
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Pay rent</h2>
            <p className="mt-1 text-sm text-slate-600">Secure payments via Stripe (ACH or card).</p>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Current amount</p>
              <p className="mt-1 text-2xl font-semibold">$1,000</p>
              <p className="mt-1 text-xs text-slate-500">(Demo amount — connect Stripe + tenant rent to make dynamic)</p>
            </div>
            <button
              onClick={payRent}
              disabled={paying}
              className="mt-4 w-full rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
            >
              {paying ? 'Redirecting to payment…' : 'Pay now'}
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}