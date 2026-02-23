import { notFound } from 'next/navigation';
import properties from '../../../lib/properties';
import Gallery from '../../../components/Gallery';
import Button from '../../../components/Button';
import Section from '../../../components/Section';

interface Params {
  id: string;
}

export async function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export default function PropertyDetailPage({ params }: { params: Params }) {
  const property = properties.find((p) => p.id === params.id);
  if (!property) {
    notFound();
  }
  return (
    <main className="pt-24">
      {/* Hero image section */}
      <div className="relative h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={property!.imageUrl} alt={property!.name} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-olivePrimary/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-heading text-4xl md:text-6xl text-creamBackground">
            {property!.name}
          </h1>
        </div>
      </div>
      <Section>
        <div className="mb-8">
          <Gallery images={property!.gallery} />
        </div>
        <div className="mb-8">
          <p className="font-body text-lg leading-relaxed">{property!.description}</p>
        </div>
        <div className="flex space-x-4">
          <Button onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/apply';
            }
          }}>Apply</Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (typeof window !== 'undefined') {
                alert('Schedule tour functionality coming soon.');
              }
            }}
          >
            Schedule Tour
          </Button>
        </div>
      </Section>
    </main>
  );
}