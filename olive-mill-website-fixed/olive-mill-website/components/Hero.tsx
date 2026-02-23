import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

const Hero = () => {
  return (
    <section className="relative h-screen w-full">
      <Image
        src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7"
        alt="Olive grove luxury"
        fill
        className="object-cover"
        priority
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-olivePrimary/60" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-creamBackground space-y-4 px-4">
        <h1 className="font-heading text-5xl md:text-7xl tracking-wide">Olive Mill LLC</h1>
        <p className="font-heading text-xl md:text-2xl">Exceptional Residences</p>
        <p className="font-heading text-xl md:text-2xl">Curated Living Experiences</p>
        <Link href="/residences">
          <Button className="mt-6">View Residences</Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;