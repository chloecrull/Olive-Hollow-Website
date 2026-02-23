import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabaseClient';

type TzKey = 'woodland' | 'baltimore';

function getPropertyMeta(propertyId: string) {
  if (propertyId === '1') {
    return {
      title: '305 C St — Apt A (Woodland, CA)',
      tz: 'America/Los_Angeles',
      tzLabel: 'Pacific Time (PT)',
      key: 'woodland' as TzKey,
    };
  }
  return {
    title: '4037 Edgewood Rd — Apt 1 (Baltimore, MD)',
    tz: 'America/New_York',
    tzLabel: 'Eastern Time (ET)',
    key: 'baltimore' as TzKey,
  };
}

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function buildSlots(): string[] {
  // 8:00 to 20:00 in 1-hour blocks
  const slots: string[] = [];
  for (let h = 8; h < 20; h++) {
    slots.push(`${pad2(h)}:00`);
  }
  return slots;
}

export default function ScheduleTourPage() {
  const router = useRouter();
  const { propertyId } = router.query as { propertyId?: string };

  const [date, setDate] = useState<string>('');
  const [booked, setBooked] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const meta = useMemo(() => (propertyId ? getPropertyMeta(propertyId) : null), [propertyId]);
  const slots = useMemo(() => buildSlots(), []);

  // Load booked slots for selected date
  useEffect(() => {
    if (!propertyId || !date) return;
    (async () => {
      setStatus('');
      try {
        const { data, error } = await supabase
          .from('tour_bookings')
          .select('time')
          .eq('property_id', Number(propertyId))
          .eq('date', date);
        if (error) throw error;
        setBooked(new Set((data || []).map((r: any) => r.time)));
      } catch {
        // If Supabase isn't configured yet, allow scheduling UI to work visually.
        setBooked(new Set());
      }
    })();
  }, [propertyId, date]);

  const minDate = useMemo(() => {
    // Use viewer's local date for the input min; the time blocks are shown in property timezone.
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  }, []);

  async function book() {
    if (!propertyId || !meta) return;
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
      // basic conflict prevention (best-effort; add DB unique constraint for hard enforcement)
      const { data: existing, error: exErr } = await supabase
        .from('tour_bookings')
        .select('id')
        .eq('property_id', Number(propertyId))
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
        property_id: Number(propertyId),
        date,
        time: selected,
        timezone: meta.tz,
        name,
        email,
        phone,
        status: 'booked',
      });
      if (error) throw error;

      setStatus(`Booked! We’ll email you a confirmation for ${date} at ${selected} (${meta.tzLabel}).`);
      setBooked((prev) => new Set([...Array.from(prev), selected]));
      setSelected(null);
      setName('');
      setEmail('');
      setPhone('');
    } catch (e: any) {
      setStatus(
        `Could not book automatically yet. If you haven’t set up Supabase permissions, that’s normal. ` +
          `Message: ${e?.message || 'Unknown error'}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Schedule a tour</h1>
          <p className="text-slate-600">
            Choose a 1-hour time block between <span className="font-medium">8am and 8pm</span> in the property’s
            local time zone.
          </p>
          {meta && (
            <p className="text-sm text-slate-600">
              Property: <span className="font-medium text-slate-900">{meta.title}</span> · Time zone:{' '}
              <span className="font-medium text-slate-900">{meta.tzLabel}</span>
            </p>
          )}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <label className="block text-sm font-medium text-slate-800">Select a date</label>
              <input
                type="date"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                value={date}
                min={minDate}
                onChange={(e) => {
                  setDate(e.target.value);
                  setSelected(null);
                }}
              />

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">Available times</h2>
                  {meta && <span className="text-xs text-slate-500">Shown in {meta.tzLabel}</span>}
                </div>

                {!date ? (
                  <p className="mt-3 text-sm text-slate-600">Pick a date to see available times.</p>
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
                          className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                            isBooked
                              ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400'
                              : isSelected
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
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

            <div className="mt-4 text-sm text-slate-600">
              <Link href={propertyId ? `/property/${propertyId}` : '/'} className="hover:text-slate-900">
                ← Back to property
              </Link>
            </div>
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h3 className="text-base font-semibold">Your info</h3>
            <p className="mt-1 text-sm text-slate-600">We’ll email a confirmation after booking.</p>

            <div className="mt-5 space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-800">Name</label>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-800">Email</label>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-800">Phone (optional)</label>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
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
                className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-soft hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? 'Booking…' : selected ? `Book ${selected}` : 'Book selected time'}
              </button>
              {status && <p className="mt-3 text-sm text-slate-600">{status}</p>}
              <p className="mt-4 text-xs text-slate-500">
                Note: This page books tours between 8am–8pm in the property’s local time zone (PT for Woodland, ET for
                Baltimore).
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
