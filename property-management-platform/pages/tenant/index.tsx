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
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Tenant Portal</h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Submit Maintenance Request</h2>
          {submitted ? (
            <p className="text-green-700">Request submitted. We will be in touch soon.</p>
          ) : (
            <form onSubmit={submitRequest} className="space-y-4">
              <div>
                <label className="block mb-1">Describe the issue</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-2 w-full"
                  rows={4}
                  required
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit Request
              </button>
            </form>
          )}
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Pay Rent</h2>
          <button
            onClick={payRent}
            disabled={paying}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {paying ? 'Processing...' : 'Pay $1000'}
          </button>
        </section>
      </main>
    </div>
  );
}