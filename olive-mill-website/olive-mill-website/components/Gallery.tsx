import Image from 'next/image';

const Gallery: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((src, idx) => (
        <div key={idx} className="relative h-64">
          <Image src={src} alt={`Gallery image ${idx}`} fill className="object-cover rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default Gallery;