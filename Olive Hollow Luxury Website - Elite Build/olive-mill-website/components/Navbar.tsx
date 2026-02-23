'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // lock body scroll when menu open
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkCls = 'hover:text-goldAccent transition-colors';

  return (
    <>
      <nav
        className={`fixed w-full z-50 top-0 transition-colors duration-300 ${
          scrolled ? 'bg-creamBackground/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="font-heading text-2xl md:text-3xl text-goldAccent tracking-wide">
            Olive Mill LLC
          </Link>

          <ul className="hidden md:flex items-center gap-10 font-body text-sm md:text-base text-olivePrimary">
            <li>
              <Link href="/residences" className={linkCls}>
                Residences
              </Link>
            </li>
            <li>
              <Link href="/apply" className={linkCls}>
                Apply
              </Link>
            </li>
            <li>
              <Link href="/contact" className={linkCls}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="hidden md:block">
            <Link href="/tenant/login">
              <Button variant="secondary">Tenant Login</Button>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full border border-olivePrimary/15 px-4 py-2 text-olivePrimary"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-olivePrimary/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="absolute top-4 left-4 right-4 rounded-3xl bg-creamBackground p-6 shadow-2xl"
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <p className="font-heading text-xl text-olivePrimary">Olive Mill LLC</p>
                <button
                  type="button"
                  className="rounded-full bg-olivePrimary text-creamBackground px-4 py-2"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-3 text-lg text-olivePrimary font-body">
                <Link href="/residences" onClick={() => setOpen(false)} className="py-2">
                  Residences
                </Link>
                <Link href="/apply" onClick={() => setOpen(false)} className="py-2">
                  Apply
                </Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="py-2">
                  Contact
                </Link>

                <div className="pt-4">
                  <Link href="/tenant/login" onClick={() => setOpen(false)}>
                    <Button variant="secondary" className="w-full justify-center">
                      Tenant Login
                    </Button>
                  </Link>
                </div>
              </div>

              <p className="mt-6 text-xs text-oliveSecondary">
                Secure access for residents. Payments processed safely.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
