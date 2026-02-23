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
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Available Properties</h1>
        <ul className="space-y-4">
          {properties.map((p) => (
            <li key={p.id} className="border p-4 rounded">
              <h2 className="font-semibold text-lg">{p.name}</h2>
              <p>{p.address}</p>
              <Link href={`/property/${p.id}`} className="text-blue-600 underline">
                View details
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}