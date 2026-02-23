import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-olivePrimary text-creamBackground py-14 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="font-heading text-2xl mb-4 tracking-wide">Olive Mill LLC</h2>
          <p className="text-sm text-creamBackground/80 leading-relaxed">
            Exceptional Residences
            <br />
            Curated Living Experiences
          </p>
        </div>

        <div>
          <h3 className="font-heading text-lg mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm text-creamBackground/85">
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
            <li>
              <Link href="/tenant/login" className="hover:text-goldAccent transition-colors">
                Tenant Login
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-goldAccent transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg mb-3">Security</h3>
          <p className="text-sm text-creamBackground/80 leading-relaxed">
            Resident data is protected with modern access controls. Payments are processed securely.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-lg mb-3">Contact</h3>
          <p className="text-sm text-creamBackground/80">info@olivemill.com</p>
        </div>
      </div>

      <div className="text-center text-xs text-creamBackground/60 mt-10">
        &copy; {new Date().getFullYear()} Olive Mill LLC. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
