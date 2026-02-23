'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from './Button';
import { useRef } from 'react';

const Hero = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]); // slow luxury drift
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.65]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80"
          alt="Olive grove at golden hour"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-olivePrimary/70 via-olivePrimary/55 to-olivePrimary/75" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-creamBackground px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <p className="font-body tracking-[0.22em] uppercase text-xs md:text-sm text-creamBackground/85">
            Private Real Estate Holding Company
          </p>

          <h1 className="font-heading mt-6 text-[42px] leading-[1.05] md:text-[72px] tracking-wide">
            Olive Mill LLC
          </h1>

          <div className="mt-6 space-y-2">
            <p className="font-heading text-xl md:text-2xl text-creamBackground/95">
              Exceptional Residences
            </p>
            <p className="font-heading text-xl md:text-2xl text-creamBackground/95">
              Curated Living Experiences
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="/residences">
              <Button className="min-w-[220px]">View Residences</Button>
            </Link>
            <Link href="/apply">
              <Button variant="secondary" className="min-w-[220px]">
                Apply to Lease
              </Button>
            </Link>
          </div>

          <p className="mt-10 font-body text-sm text-creamBackground/70">
            Discreet. Responsive. Secure.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
