'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface Property {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
}

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <Link href={`/residences/${property.id}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="rounded-2xl overflow-hidden bg-creamBackground border border-olivePrimary/10 shadow-sm hover:shadow-xl transition-shadow duration-500"
      >
        <div className="relative w-full h-72 md:h-80 overflow-hidden">
          <Image
            src={property.imageUrl}
            alt={property.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-olivePrimary/30 via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <h3 className="font-heading text-2xl text-olivePrimary leading-tight">{property.name}</h3>
          <p className="font-body mt-2 text-sm tracking-wide text-oliveSecondary">{property.location}</p>

          <div className="mt-5 inline-flex items-center gap-2 text-goldAccent text-sm font-semibold">
            View Residence
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PropertyCard;
