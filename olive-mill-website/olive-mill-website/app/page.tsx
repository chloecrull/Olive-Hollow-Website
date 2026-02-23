import Hero from '../components/Hero';
import Section from '../components/Section';
import properties from '../lib/properties';
import PropertyCard from '../components/PropertyCard';

export default function HomePage() {
  // Use the first three properties as featured
  const featured = properties.slice(0, 3);
  return (
    <main className="pt-0">
      <Hero />
      <Section>
        <h2 className="font-heading text-4xl mb-8 text-olivePrimary">Featured Residences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </Section>
      <Section className="text-center">
        <h2 className="font-heading text-3xl mb-4 text-olivePrimary">About Olive Mill</h2>
        <p className="font-body max-w-2xl mx-auto text-lg">
          Olive Mill LLC is a private real estate company focused on the long-term stewardship of exceptional residential
          properties. We curate living experiences that blend luxury with the tranquility of nature.
        </p>
      </Section>
    </main>
  );
}