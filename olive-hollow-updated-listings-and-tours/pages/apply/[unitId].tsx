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
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitId) return;
    try {
      await supabase.from('applications').insert({
        unit_id: unitId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
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
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <h1 className="text-2xl font-semibold">Apply for Unit {unitId}</h1>
          <p className="mt-2 text-sm text-slate-600">
            Complete the form below. We will respond by email or text.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Anything you want us to know</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                placeholder="Move-in date, pets, questions, etc."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-500">By submitting, you agree to be contacted by Olive Hollow Properties.</p>
              <button type="submit" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}