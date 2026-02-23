import type { Metadata } from 'next';
import properties from '../../lib/properties';
import PropertyCard from '../../components/PropertyCard';
import Section from '../../components/Section';

export const metadata: Metadata = {
  title: 'Residences | Olive Mill LLC',
  description: 'Explore our portfolio of exceptional residences.',
};

export default function ResidencesPage() {
  return (
    <main className="pt-24">
      <Section>
        <h1 className="font-heading text-4xl mb-8 text-olivePrimary">Residences</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </Section>
    </main>
  );
}