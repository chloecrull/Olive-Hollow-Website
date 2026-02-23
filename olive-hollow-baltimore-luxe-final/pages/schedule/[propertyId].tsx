import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabaseClient';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function buildSlots(): string[] {
  // 8:00 to 20:00 in 1-hour blocks
  const slots: string[] = [];
  for (let h = 8; h < 20; h++) slots.push(`${pad2(h)}:00`);
  return slots;
}

const META = {
  propertyId: 1,
  title: '4037 Edgewood Rd — Apt 1 (Baltimore, MD)',
  tz: 'America/New_York',
  tzLabel: 'Eastern Time (ET)',
} as const;

export default function ScheduleTourPage() {
  const router = useRouter();
  const { propertyId } = router.query as { propertyId?: string };

  // This site is intentionally Baltimore-only. We keep the route param for URL stability.
  const effectivePropertyId = useMemo(() => META.propertyId, [propertyId]);

  const [date, setDate] = useState<string>('');
  const [booked, setBooked] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const slots = useMemo(() => buildSlots(), []);

  useEffect(() => {
    if (!date) return;
    (async () => {
      setStatus('');
      try {
        const { data, error } = await supabase
          .from('tour_bookings')
          .select('time')
          .eq('property_id', effectivePropertyId)
          .eq('date', date);
        if (error) throw error;
        setBooked(new Set((data || []).map((r: any) => r.time)));
      } catch {
        // If Supabase isn't configured yet, allow scheduling UI to work visually.
        setBooked(new Set());
      }
    })();
  }, [effectivePropertyId, date]);

  const minDate = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  }, []);

  async function book() {
    if (!date || !selected) {
      setStatus('Please select a date and a time.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      setStatus('Please enter your name and email.');
      return;
    }

    setLoading(true);
    setStatus('');
    try {
      const { data: existing, error: exErr } = await supabase
        .from('tour_bookings')
        .select('id')
        .eq('property_id', effectivePropertyId)
        .eq('date', date)
        .eq('time', selected)
        .maybeSingle();
      if (!exErr && existing) {
        setStatus('That time was just booked. Please choose another slot.');
        setBooked((prev) => new Set([...Array.from(prev), selected]));
        setSelected(null);
        return;
      }

      const { error } = await supabase.from('tour_bookings').insert({
        property_id: effectivePropertyId,
        date,
        time: selected,
        timezone: META.tz,
        name,
        email,
        phone,
        status: 'booked',
      });
      if (error) throw error;

      setStatus(`Booked. We will email you a confirmation for ${date} at ${selected} (${META.tzLabel}).`);
      setBooked((prev) => new Set([...Array.from(prev), selected]));
      setSelected(null);
      setName('');
      setEmail('');
      setPhone('');
    } catch {
      setStatus(
        'Tour scheduling is not fully connected yet. If Supabase permissions are not configured, that is expected. '
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="rounded-3xl border border-white/10 bg-ink-800/70 p-8 shadow-luxe luxe-noise">
          <p className="inline-flex w-fit items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-champagne-200 ring-1 ring-white/10">
            Tour scheduling
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Schedule a private tour</h1>
          <p className="mt-2 text-sm text-white/70">
            Choose a 1-hour time block between <span className="font-semibold text-champagne-200">8am and 8pm</span> in{' '}
            <span className="font-semibold text-champagne-200">{META.tzLabel}</span>.
          </p>
          <p className="mt-1 text-sm text-white/70">
            Property: <span className="font-semibold text-champagne-200">{META.title}</span>
          </p>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-luxe">
              <label className="block text-sm font-medium text-white/80">Select a date</label>
              <input
                type="date"
                className="mt-2 w-full rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 text-sm text-white"
                value={date}
                min={minDate}
                onChange={(e) => {
                  setDate(e.target.value);
                  setSelected(null);
                }}
              />

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-champagne-200">Available times</h2>
                  <span className="text-xs text-white/60">Shown in {META.tzLabel}</span>
                </div>

                {!date ? (
                  <p className="mt-3 text-sm text-white/70">Pick a date to see available times.</p>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {slots.map((t) => {
                      const isBooked = booked.has(t);
                      const isSelected = selected === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelected(t)}
                          className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                            isBooked
                              ? 'cursor-not-allowed border-white/10 bg-white/5 text-white/35'
                              : isSelected
                              ? 'border-champagne-300 bg-champagne-300 text-ink-900'
                              : 'border-white/10 bg-ink-900/40 text-white/85 hover:bg-white/5'
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 text-sm text-white/70">
              <Link href="/property/1" className="hover:text-champagne-200">
                ← Back to residence
              </Link>
            </div>
          </section>

          <aside className="rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-luxe">
            <h3 className="text-base font-semibold text-champagne-200">Your information</h3>
            <p className="mt-1 text-sm text-white/70">We will email a confirmation after booking.</p>

            <div className="mt-5 space-y-3">
              <div>
                <label className="block text-sm font-medium text-white/80">Name</label>
                <input
                  className="mt-2 w-full rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 text-sm text-white placeholder:text-white/40"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80">Email</label>
                <input
                  className="mt-2 w-full rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 text-sm text-white placeholder:text-white/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80">Phone (optional)</label>
                <input
                  className="mt-2 w-full rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 text-sm text-white placeholder:text-white/40"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 555-5555"
                />
              </div>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={book}
                disabled={loading}
                className="w-full rounded-xl bg-champagne-300 px-5 py-3 text-sm font-semibold text-ink-900 shadow-luxe hover:bg-champagne-200 disabled:opacity-60"
              >
                {loading ? 'Booking…' : selected ? `Book ${selected}` : 'Book selected time'}
              </button>
              {status && <p className="mt-3 text-sm text-white/70">{status}</p>}

              <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs text-white/60">Prefer to apply first?</p>
                <Link href="/apply/1" className="mt-1 block text-sm font-semibold text-champagne-200 hover:text-champagne-100">
                  Apply online
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
