import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabaseClient';

interface Property {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code?: string;
  units: number;
}

/**
 * Home page displaying available properties. The component attempts to
 * retrieve property records from Supabase. If the database query fails
 * (for example because the schema hasn't been created yet) it falls back
 * to a hard‑coded list representing the Woodland unit and Baltimore
 * duplex. Each property links to its detail page.
 */
export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function loadProperties() {
      try {
        const { data, error } = await supabase.from('properties').select('*');
        if (!error && data) {
          setProperties(data as Property[]);
          return;
        }
      } catch (err) {
        // ignore; fall back to sample data
      }
      // Fallback sample data to illustrate the UI
      setProperties([
        {
          id: 1,
          name: '305 C St — Apt A',
          address: '305 C St, Apt A',
          city: 'Woodland',
          state: 'CA',
          postal_code: '95776',
          units: 1,
        },
        {
          id: 2,
          name: '4037 Edgewood Rd — Apt 1',
          address: '4037 Edgewood Rd, Apt 1',
          city: 'Baltimore',
          state: 'MD',
          postal_code: '21215',
          units: 1,
        },
      ]);
    }
    loadProperties();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-10">
          <div className="grid gap-6 rounded-3xl border border-white/10 bg-ink-800/70 p-8 shadow-luxe md:grid-cols-2 md:items-center">
            <div>
              <p className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-champagne-200 ring-1 ring-white/10">
                Olive Hollow Properties
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                A professional rental experience,
                <span className="text-white/60"> powered by AI</span>
              </h1>
              <p className="mt-3 max-w-prose text-white/70">
                Browse available homes, schedule a tour in seconds, and apply online. Tenants can
                submit maintenance requests and pay rent from the portal.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#listings"
                  className="rounded-xl bg-champagne-300 px-5 py-3 text-sm font-semibold text-ink-900 shadow-luxe hover:bg-champagne-200"
                >
                  View listings
                </a>
                <Link
                  href="/apply/1"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-champagne-200 hover:bg-white/10"
                >
                  Start an application
                </Link>
              </div>

              <dl className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <dt className="text-xs text-white/60">Response time</dt>
                  <dd className="mt-1 text-lg font-semibold text-champagne-200">Minutes</dd>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <dt className="text-xs text-white/60">Online</dt>
                  <dd className="mt-1 text-lg font-semibold text-champagne-200">24/7</dd>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <dt className="text-xs text-white/60">Payments</dt>
                  <dd className="mt-1 text-lg font-semibold text-champagne-200">ACH + Card</dd>
                </div>
              </dl>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1a12] via-[#13281c] to-slate-900 p-8 text-white">
              <div className="absolute inset-0 opacity-25" aria-hidden="true">
                <svg viewBox="0 0 800 600" className="h-full w-full">
                  <defs>
                    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0" stopColor="white" stopOpacity="0.5" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M120 480c60-120 160-210 300-250 170-48 290-10 360 40"
                    fill="none"
                    stroke="url(#g)"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  {Array.from({ length: 18 }).map((_, i) => {
                    const x = 160 + i * 28;
                    const y = 430 - i * 9;
                    return (
                      <g key={i} transform={`translate(${x} ${y}) rotate(${i * 6})`}>
                        <ellipse cx="0" cy="0" rx="18" ry="9" fill="white" fillOpacity="0.35" />
                        <ellipse cx="26" cy="-10" rx="16" ry="8" fill="white" fillOpacity="0.25" />
                      </g>
                    );
                  })}
                  <circle cx="560" cy="260" r="18" fill="white" fillOpacity="0.25" />
                  <circle cx="610" cy="235" r="14" fill="white" fillOpacity="0.22" />
                </svg>
              </div>

              <h2 className="relative text-lg font-semibold">How it works</h2>
              <ol className="mt-4 space-y-3 text-sm text-white/90">
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">1</span>
                  <span>Ask questions and schedule a tour (8am–8pm local time).</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">2</span>
                  <span>Apply online and upload documents securely.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">3</span>
                  <span>Sign the lease electronically and move in.</span>
                </li>
              </ol>
              <p className="mt-6 text-xs text-white/70">
                Questions? Email us anytime and our leasing team will respond quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Listings */}
        <section id="listings" className="mx-auto max-w-6xl px-4 pb-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Available listings</h2>
              <p className="mt-1 text-sm text-white/70">Select a residence to view details, schedule a tour, or apply.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {properties.map((p) => (
              <div key={p.id} className="rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-luxe">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-white/70">
                      {p.address}, {p.city}, {p.state} {p.postal_code || ''}
                    </p>
                    <p className="mt-3 text-sm text-white/70">Units: {p.units}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 px-3 py-2 text-xs text-champagne-200 ring-1 ring-white/10">Inquire 24/7</div>
                </div>
                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/property/${p.id}`}
                    className="rounded-xl bg-champagne-300 px-4 py-2 text-sm font-semibold text-ink-900 hover:bg-champagne-200"
                  >
                    View details
                  </Link>
                  <Link
                    href={`/schedule/${p.id}`}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-champagne-200 hover:bg-white/10"
                  >
                    Schedule tour
                  </Link>
                  <Link
                    href="/login"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-champagne-200 hover:bg-white/10"
                  >
                    Tenant login
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-ink-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Olive Hollow Properties</div>
          <div className="flex gap-4">
            <a className="hover:text-champagne-200" href="mailto:leasing@olivehollowproperties.com">leasing@olivehollowproperties.com</a>
            <span className="text-white/20">|</span>
            <span>Fair Housing compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}