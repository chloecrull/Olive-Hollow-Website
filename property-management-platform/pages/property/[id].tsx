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
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">{effectiveProperty.name}</h1>
        <p className="mb-4">{effectiveProperty.address}</p>
        <h2 className="text-xl font-semibold mb-2">Available Units</h2>
        <ul className="space-y-4">
          {effectiveUnits.map((unit) => (
            <li key={unit.id} className="border p-4 rounded">
              <h3 className="font-semibold">Unit {unit.unit_number}</h3>
              <p>
                {unit.bedrooms} bedroom{unit.bedrooms !== 1 && 's'}, {unit.bathrooms} bathroom
              </p>
              <p>Rent: ${unit.rent}</p>
              <Link href={`/apply/${unit.id}`} className="text-blue-600 underline">
                Apply Now
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}