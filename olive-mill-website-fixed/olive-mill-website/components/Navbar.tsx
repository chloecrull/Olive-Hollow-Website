'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './Button';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-20 top-0 transition-colors duration-300 ${
        scrolled ? 'bg-creamBackground shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl text-goldAccent">
          Olive Mill LLC
        </Link>
        <ul className="hidden md:flex space-x-8 font-body text-lg text-olivePrimary">
          <li>
            <Link href="/residences" className="hover:text-goldAccent transition-colors">
              Residences
            </Link>
          </li>
          <li>
            <Link href="/apply" className="hover:text-goldAccent transition-colors">
              Apply
            </Link>
          </li>
        </ul>
        <div className="hidden md:block">
          <Link href="/tenant/login">
            <Button variant="secondary">Tenant Login</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;