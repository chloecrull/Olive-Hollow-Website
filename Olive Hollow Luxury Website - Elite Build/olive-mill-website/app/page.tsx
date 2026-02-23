import Hero from '../components/Hero';
import Section from '../components/Section';
import properties from '../lib/properties';
import PropertyCard from '../components/PropertyCard';
import MotionReveal from '../components/MotionReveal';

export default function HomePage() {
  const featured = properties.slice(0, 3);

  return (
    <main className="pt-0">
      <Hero />

      <Section>
        <MotionReveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="font-body uppercase tracking-[0.22em] text-xs text-oliveSecondary">Portfolio</p>
              <h2 className="font-heading text-4xl md:text-5xl mt-4 text-olivePrimary">Featured Residences</h2>
            </div>
            <p className="font-body text-sm md:text-base text-oliveSecondary max-w-md">
              A curated collection of residences managed with discretion, detail, and long-term stewardship.
            </p>
          </div>
        </MotionReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <MotionReveal>
          <div className="text-center">
            <p className="font-body uppercase tracking-[0.22em] text-xs text-oliveSecondary">Olive Mill</p>
            <h2 className="font-heading text-3xl md:text-5xl mt-4 text-olivePrimary">Stewardship over spectacle</h2>
            <p className="font-body max-w-3xl mx-auto text-lg md:text-xl mt-6 text-darkText/90 leading-relaxed">
              Olive Mill LLC is a private real estate holding company focused on the long-term stewardship of exceptional residential properties.
              Our approach is calm, attentive, and intentionally discreet — designed to feel effortless for residents.
            </p>
          </div>
        </MotionReveal>
      </Section>
    </main>
  );
}
