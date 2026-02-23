import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-olivePrimary text-creamBackground py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="font-heading text-xl mb-4">Olive Mill LLC</h2>
          <p className="text-sm">
            Exceptional Residences
            <br />
            Curated Living Experiences
          </p>
        </div>
        <div>
          <h3 className="font-heading text-lg mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/residences">Residences</Link>
            </li>
            <li>
              <Link href="/apply">Apply</Link>
            </li>
            <li>
              <Link href="/tenant/login">Tenant Login</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-lg mb-3">Get in Touch</h3>
          <p className="text-sm">info@olivemill.com</p>
        </div>
        <div>
          <h3 className="font-heading text-lg mb-3">Follow Us</h3>
          <p className="text-sm">Social links here</p>
        </div>
      </div>
      <div className="text-center text-sm mt-6">
        &copy; {new Date().getFullYear()} Olive Mill LLC. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;