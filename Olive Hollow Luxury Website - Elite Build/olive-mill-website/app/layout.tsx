import './globals.css';
import { Playfair_Display, Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'Olive Mill LLC',
    template: '%s | Olive Mill LLC',
  },
  description: 'Exceptional Residences | Curated Living Experiences',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Olive Mill LLC',
    description: 'Exceptional Residences | Curated Living Experiences',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-creamBackground text-darkText font-body">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
