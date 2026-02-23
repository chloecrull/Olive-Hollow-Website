import type { Metadata } from 'next';
import properties from '../../lib/properties';
import PropertyCard from '../../components/PropertyCard';
import Section from '../../components/Section';
import MotionReveal from '../../components/MotionReveal';

export const metadata: Metadata = {
  title: 'Residences | Olive Mill LLC',
  description: 'Explore our portfolio of exceptional residences.',
};

export default function ResidencesPage() {
  return (
    <main className="pt-20">
      <Section>
        <MotionReveal>
          <p className="font-body uppercase tracking-[0.22em] text-xs text-oliveSecondary">Residences</p>
          <h1 className="font-heading text-4xl md:text-6xl mt-4 text-olivePrimary">Available Collection</h1>
          <p className="font-body mt-6 text-lg text-darkText/85 max-w-2xl">
            Thoughtfully maintained homes presented with quiet confidence. Browse availability and schedule a tour.
          </p>
        </MotionReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </Section>
    </main>
  );
}
