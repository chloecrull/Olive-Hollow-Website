'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function LightboxGallery({ images, altBase = 'Residence image' }: { images: string[]; altBase?: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const safeImages = useMemo(() => images.filter(Boolean), [images]);

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % safeImages.length), [safeImages.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length), [safeImages.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, next, prev]);

  if (safeImages.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {safeImages.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="group relative h-64 md:h-72 rounded-2xl overflow-hidden focus:outline-none"
            aria-label="Open image"
          >
            <Image src={src} alt={`${altBase} ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            <div className="absolute inset-0 bg-olivePrimary/0 group-hover:bg-olivePrimary/10 transition-colors duration-500" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-olivePrimary/85 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="relative w-full max-w-6xl aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={safeImages[index]} alt={`${altBase} ${index + 1}`} fill className="object-cover" />

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-olivePrimary/70 via-olivePrimary/10 to-transparent">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-creamBackground/90 text-sm font-body">
                    {index + 1} / {safeImages.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prev}
                      className="px-4 py-2 rounded-full border border-creamBackground/30 text-creamBackground hover:bg-creamBackground/10 transition-colors"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="px-4 py-2 rounded-full border border-creamBackground/30 text-creamBackground hover:bg-creamBackground/10 transition-colors"
                    >
                      Next
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className="px-4 py-2 rounded-full bg-goldAccent text-olivePrimary hover:bg-creamBackground transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
