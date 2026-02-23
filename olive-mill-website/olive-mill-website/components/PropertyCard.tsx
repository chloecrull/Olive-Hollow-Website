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
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="overflow-hidden rounded-lg shadow-lg bg-creamBackground hover:shadow-xl transition-shadow"
    >
      <Link href={`/residences/${property.id}`}>
        <div className="relative w-full h-64">
          <Image src={property.imageUrl} alt={property.name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-heading text-xl text-olivePrimary">{property.name}</h3>
          <p className="font-body text-sm text-oliveSecondary">{property.location}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;