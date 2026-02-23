import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabaseClient';

/**
 * Application form for a specific unit. The form collects applicant
 * information and stores it in the `applications` table. After
 * submission it displays a thank you message. A more complete
 * implementation might trigger additional steps such as background
 * checks, pre‑screening or sending notifications via email/SMS.
 */
export default function ApplyPage() {
  const router = useRouter();
  const { unitId } = router.query as { unitId?: string };
  const paid = (router.query as any)?.paid === '1';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    desiredMoveIn: '',
    currentAddress: '',
    monthlyIncome: '',
    employer: '',
    occupants: '',
    petsCount: '0',
    petsTypes: '',
    notes: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [paying, setPaying] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.type === 'checkbox' ? (target as any).checked : target.value;
    setForm({ ...form, [name]: value } as any);
  };

  const startPayment = async () => {
    if (!unitId) return;
    setPaying(true);
    try {
      const res = await fetch('/api/create-application-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitId, applicantEmail: form.email || undefined }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
    } finally {
      setPaying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitId) return;
    if (!paid) return;
    if (!form.consent) return;
    try {
      const details = {
        desiredMoveIn: form.desiredMoveIn,
        currentAddress: form.currentAddress,
        monthlyIncome: form.monthlyIncome,
        employer: form.employer,
        occupants: form.occupants,
        pets: {
          count: form.petsCount,
          types: form.petsTypes,
          monthlyFeePerPet: 50,
        },
        notes: form.notes,
        applicationFee: 45,
      };
      await supabase.from('applications').insert({
        unit_id: unitId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: JSON.stringify(details),
        status: 'submitted',
      });
    } catch {
      // In local development you may not have a Supabase project. Ignore errors.
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <h1 className="text-2xl font-semibold">Application received</h1>
            <p className="mt-2 text-slate-600">
              Thanks for applying. Our leasing team will review your application and contact you soon.
            </p>
            <p className="mt-6 text-sm text-slate-600">
              If you have additional documents, email{' '}
              <a className="font-medium text-slate-900" href="mailto:leasing@olivehollowproperties.com">leasing@olivehollowproperties.com</a>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-ink-800/70 p-8 shadow-luxe">
          <h1 className="text-2xl font-semibold text-champagne-200">Application for Unit {unitId}</h1>
          <p className="mt-2 text-sm text-white/70">
            Application fee is <span className="font-semibold text-champagne-200">$45 per adult applicant</span> (non refundable).
            Pets are welcome with a <span className="font-semibold text-champagne-200">$50 monthly fee per pet</span>.
          </p>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-champagne-200">Step 1: Pay the application fee</div>
                <div className="mt-1 text-xs text-white/70">You can still fill most of the form first, but you must pay before submitting.</div>
              </div>
              <button
                type="button"
                onClick={startPayment}
                disabled={paying}
                className="rounded-xl bg-champagne-300 px-4 py-2 text-sm font-semibold text-ink-900 shadow-luxe hover:bg-champagne-200 disabled:opacity-60"
              >
                {paid ? 'Fee paid' : paying ? 'Opening checkout…' : 'Pay $45'}
              </button>
            </div>
            {!paid && (
              <p className="mt-3 text-xs text-white/60">
                After payment, you will be returned here automatically and you can submit your application.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80">Full legal name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white/80">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white/80">Desired move in date</label>
                <input
                  name="desiredMoveIn"
                  value={form.desiredMoveIn}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80">Current address</label>
                <input
                  name="currentAddress"
                  value={form.currentAddress}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white/80">Employer</label>
                <input
                  name="employer"
                  value={form.employer}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80">Monthly gross income</label>
                <input
                  name="monthlyIncome"
                  value={form.monthlyIncome}
                  onChange={handleChange}
                  placeholder="e.g., 7500"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80">Who will live in the home</label>
              <input
                name="occupants"
                value={form.occupants}
                onChange={handleChange}
                placeholder="List all occupants, including children (name and age)"
                className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white/80">Number of pets</label>
                <input
                  name="petsCount"
                  value={form.petsCount}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80">Pet details</label>
                <input
                  name="petsTypes"
                  value={form.petsTypes}
                  onChange={handleChange}
                  placeholder="Type, breed, weight"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={5}
                className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/50 px-3 py-2 text-sm text-white placeholder:text-white/40"
                placeholder="Anything you'd like us to consider"
              />
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent as any}
                onChange={handleChange}
                className="mt-1"
                required
              />
              <span className="text-xs text-white/70">
                I certify that the information provided is true and authorize Olive Hollow Properties to contact employers and landlords and to obtain consumer reports as permitted by law.
              </span>
            </label>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-xs text-white/60">Application fee is required before submitting. $50 monthly fee per pet applies.</p>
              <button
                type="submit"
                disabled={!paid}
                className="rounded-xl bg-champagne-300 px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-luxe hover:bg-champagne-200 disabled:opacity-50"
              >
                {paid ? 'Submit application' : 'Pay fee to submit'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}