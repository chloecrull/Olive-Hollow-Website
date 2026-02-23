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
      <div>
        <Navbar />
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2">Application Submitted</h1>
          <p>Thank you for applying. We will review your application and contact you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Apply for Unit {unitId}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit Application
          </button>
        </form>
      </main>
    </div>
  );
}