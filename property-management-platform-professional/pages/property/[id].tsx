import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabaseClient';

interface Unit {
  id: number;
  unit_number: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
}

/**
 * Displays details for a single property, including a list of its units.
 * The component retrieves property and unit details from the database if
 * available; otherwise it uses sample data. Each unit includes a link
 * to an application form.
 */
export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [property, setProperty] = useState<any>(null);
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const { data: propData } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        const { data: unitsData } = await supabase
          .from('units')
          .select('*')
          .eq('property_id', id);
        if (propData) setProperty(propData);
        if (unitsData) setUnits(unitsData as Unit[]);
      } catch {
        // ignore; will fall back to sample data
      }
    }
    load();
  }, [id]);

  // fallback sample data for demonstration
  const sampleUnits: Unit[] = [
    { id: 1, unit_number: 'A', bedrooms: 1, bathrooms: 1, rent: 1500 },
    { id: 2, unit_number: 'B', bedrooms: 2, bathrooms: 1, rent: 1800 },
  ];

  const effectiveUnits = units.length > 0 ? units : sampleUnits;
  const effectiveProperty = property || {
    id,
    name: id === '1' ? 'Woodland 1BR' : 'Baltimore Duplex',
    address: id === '1' ? 'Woodland, CA' : 'Baltimore, MD',
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">{effectiveProperty.name}</h1>
          <p className="text-slate-600">{effectiveProperty.address}</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h2 className="text-xl font-semibold">Available units</h2>
            <p className="mt-1 text-sm text-slate-600">Apply online in minutes.</p>

            <div className="mt-5 grid gap-4">
              {effectiveUnits.map((unit) => (
                <div key={unit.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">Unit {unit.unit_number}</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {unit.bedrooms} bed · {unit.bathrooms} bath
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900">
                      ${unit.rent}/mo
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/apply/${unit.id}`}
                      className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                    >
                      Apply now
                    </Link>
                    <Link
                      href="/login"
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
                    >
                      Ask a question
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h3 className="text-base font-semibold">Leasing information</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="flex gap-2"><span className="text-slate-400">•</span> Online applications and document upload</li>
              <li className="flex gap-2"><span className="text-slate-400">•</span> Electronic lease signing</li>
              <li className="flex gap-2"><span className="text-slate-400">•</span> Tenant portal for rent and maintenance</li>
            </ul>
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-600">Email</p>
              <p className="mt-1 text-sm font-medium">leasing@olivehollowproperties.com</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}