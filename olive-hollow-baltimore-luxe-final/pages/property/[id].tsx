import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabaseClient';

type PropertyRecord = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code?: string;
};

type UnitRecord = {
  id: number;
  unit_number: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  sqft?: number;
};

const FALLBACK_PROPERTY: PropertyRecord = {
  id: 1,
  name: '4037 Edgewood Rd — Apt 1',
  address: '4037 Edgewood Rd, Apt 1',
  city: 'Baltimore',
  state: 'MD',
  postal_code: '21215',
};

const FALLBACK_UNIT: UnitRecord = {
  id: 1,
  unit_number: '1',
  bedrooms: 2,
  bathrooms: 1,
  rent: 0,
  sqft: 726,
};

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query as { id?: string };

  const [property, setProperty] = useState<PropertyRecord | null>(null);
  const [unit, setUnit] = useState<UnitRecord | null>(null);

  const propertyId = useMemo(() => {
    // This site intentionally represents the Baltimore residence only.
    // If an unexpected id is used, we still show the Baltimore property.
    return 1;
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const { data: propData } = await supabase
          .from('properties')
          .select('*')
          .eq('id', propertyId)
          .maybeSingle();

        const { data: unitsData } = await supabase
          .from('units')
          .select('*')
          .eq('property_id', propertyId)
          .limit(1);

        if (propData) setProperty(propData as PropertyRecord);
        if (unitsData && unitsData.length) setUnit(unitsData[0] as UnitRecord);
      } catch {
        // ignore; fall back
      }
    })();
  }, [propertyId]);

  const p = property || FALLBACK_PROPERTY;
  const u = unit || FALLBACK_UNIT;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="rounded-3xl border border-white/10 bg-ink-800/70 p-8 shadow-luxe luxe-noise">
          <div className="flex flex-col gap-2">
            <p className="inline-flex w-fit items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-champagne-200 ring-1 ring-white/10">
              Now leasing in Baltimore
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{p.name}</h1>
            <p className="text-sm text-white/70">
              {p.address}, {p.city}, {p.state} {p.postal_code || ''}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10">
                {u.bedrooms} bedroom
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10">
                {u.bathrooms} bathroom
              </span>
              {u.sqft ? (
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10">
                  {u.sqft} sq ft
                </span>
              ) : null}
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10">
                Pet-friendly ($50 per pet monthly)
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/schedule/1"
                className="rounded-xl bg-champagne-300 px-5 py-3 text-sm font-semibold text-ink-900 shadow-luxe hover:bg-champagne-200"
              >
                Schedule a tour
              </Link>
              <Link
                href="/apply/1"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-champagne-200 hover:bg-white/10"
              >
                Apply online
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-luxe">
              <h2 className="text-lg font-semibold text-champagne-200">Residence overview</h2>
              <p className="mt-2 text-sm text-white/70">
                A refined, boutique residence designed for comfort and ease. Tour scheduling and applications
                are handled online for a streamlined experience.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-xs text-white/60">Tour hours</p>
                  <p className="mt-1 text-sm font-semibold">8am to 8pm (Eastern Time)</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-xs text-white/60">Application fee</p>
                  <p className="mt-1 text-sm font-semibold">$45 per adult applicant</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-xs text-white/60">Pets</p>
                  <p className="mt-1 text-sm font-semibold">$50 monthly fee per pet</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-xs text-white/60">Resident portal</p>
                  <p className="mt-1 text-sm font-semibold">Rent payments and maintenance</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-luxe">
              <h2 className="text-lg font-semibold text-champagne-200">Next steps</h2>
              <ol className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">1</span>
                  <span>Choose a tour time that works for you.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">2</span>
                  <span>Apply online and upload required information.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs">3</span>
                  <span>Our leasing team will follow up with next steps.</span>
                </li>
              </ol>
            </div>
          </section>

          <aside className="rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-luxe">
            <h3 className="text-base font-semibold text-champagne-200">Contact</h3>
            <p className="mt-2 text-sm text-white/70">Questions before you tour or apply?</p>
            <div className="mt-5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs text-white/60">Email</p>
              <a className="mt-1 block text-sm font-semibold text-champagne-200 hover:text-champagne-100" href="mailto:leasing@olivehollowproperties.com">
                leasing@olivehollowproperties.com
              </a>
              <p className="mt-4 text-xs text-white/60">Fair Housing</p>
              <p className="mt-1 text-sm text-white/70">We comply with all Fair Housing requirements.</p>
            </div>

            <div className="mt-6">
              <Link
                href="/apply/1"
                className="block w-full rounded-xl bg-champagne-300 px-5 py-3 text-center text-sm font-semibold text-ink-900 shadow-luxe hover:bg-champagne-200"
              >
                Apply online
              </Link>
              <Link
                href="/schedule/1"
                className="mt-3 block w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-champagne-200 hover:bg-white/10"
              >
                Schedule a tour
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
