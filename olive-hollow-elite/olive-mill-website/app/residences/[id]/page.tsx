import { notFound } from 'next/navigation';
import properties from '../../../lib/properties';
import Section from '../../../components/Section';
import Button from '../../../components/Button';
import Link from 'next/link';
import Image from 'next/image';
import LightboxGallery from '../../../components/LightboxGallery';

interface Params {
  id: string;
}

export async function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export default function PropertyDetailPage({ params }: { params: Params }) {
  const property = properties.find((p) => p.id === params.id);
  if (!property) notFound();

  return (
    <main className="pt-20">
      {/* Hero */}
      <div className="relative h-[520px] md:h-[640px] w-full overflow-hidden">
        <Image src={property.imageUrl} alt={property.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-olivePrimary/65 via-olivePrimary/35 to-olivePrimary/70" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-8 pb-12 md:pb-16">
            <p className="font-body uppercase tracking-[0.22em] text-xs md:text-sm text-creamBackground/75">
              Residence
            </p>
            <h1 className="font-heading mt-4 text-4xl md:text-6xl text-creamBackground tracking-wide leading-[1.05]">
              {property.name}
            </h1>
            <p className="font-body mt-4 text-creamBackground/80 text-base md:text-lg">
              {property.location}
            </p>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-8">
            <LightboxGallery images={property.gallery} altBase={property.name} />
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-olivePrimary/10 bg-creamBackground shadow-sm p-7">
              <h2 className="font-heading text-2xl text-olivePrimary">Inquire</h2>
              <p className="font-body mt-3 text-sm text-oliveSecondary leading-relaxed">
                Experience refined living with discreet, responsive management. Applications and tours are handled securely.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Link href="/apply">
                  <Button className="w-full justify-center">Apply</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" className="w-full justify-center">
                    Schedule Tour
                  </Button>
                </Link>
              </div>

              <div className="mt-6 border-t border-olivePrimary/10 pt-5">
                <p className="text-xs font-body text-oliveSecondary/80">
                  Payments are processed securely. Resident data is protected with modern access controls.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-16 max-w-3xl">
          <h2 className="font-heading text-3xl text-olivePrimary">Overview</h2>
          <p className="font-body mt-5 text-lg leading-relaxed text-darkText">{property.description}</p>
        </div>
      </Section>
    </main>
  );
}
