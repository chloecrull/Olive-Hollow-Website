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
          name: 'Woodland 1BR',
          address: 'Woodland, CA',
          city: 'Woodland',
          state: 'CA',
          units: 1,
        },
        {
          id: 2,
          name: 'Baltimore Duplex',
          address: 'Baltimore, MD',
          city: 'Baltimore',
          state: 'MD',
          units: 2,
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
          <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft md:grid-cols-2 md:items-center">
            <div>
              <p className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                Olive Hollow Properties
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                A professional rental experience,
                <span className="text-slate-500"> powered by AI</span>
              </h1>
              <p className="mt-3 max-w-prose text-slate-600">
                Browse available homes, schedule a showing, and apply online. Tenants can submit
                maintenance requests and pay rent from the portal.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#listings"
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-soft hover:bg-slate-800"
                >
                  View listings
                </a>
                <Link
                  href="/apply/1"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  Start an application
                </Link>
              </div>

              <dl className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <dt className="text-xs text-slate-500">Response time</dt>
                  <dd className="mt-1 text-lg font-semibold">Minutes</dd>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <dt className="text-xs text-slate-500">Online</dt>
                  <dd className="mt-1 text-lg font-semibold">24/7</dd>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <dt className="text-xs text-slate-500">Payments</dt>
                  <dd className="mt-1 text-lg font-semibold">ACH + Card</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white">
              <h2 className="text-lg font-semibold">How it works</h2>
              <ol className="mt-4 space-y-3 text-sm text-white/90">
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">1</span>
                  <span>Ask questions and schedule a showing.</span>
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
              <p className="mt-1 text-sm text-slate-600">Select a property to view units and apply.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {properties.map((p) => (
              <div key={p.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {p.city}, {p.state}
                    </p>
                    <p className="mt-3 text-sm text-slate-600">Units: {p.units}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-3 py-2 text-xs text-slate-600">Inquire 24/7</div>
                </div>
                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/property/${p.id}`}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    View details
                  </Link>
                  <Link
                    href="/login"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  >
                    Tenant login
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Olive Hollow Properties</div>
          <div className="flex gap-4">
            <a className="hover:text-slate-900" href="mailto:leasing@olivehollowproperties.com">leasing@olivehollowproperties.com</a>
            <span className="text-slate-300">|</span>
            <span>Fair Housing compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}