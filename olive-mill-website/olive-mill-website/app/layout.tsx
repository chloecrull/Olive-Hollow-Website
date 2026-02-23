import './globals.css';
import { Playfair_Display, Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Load fonts with CSS variables for Tailwind configuration
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
  title: 'Olive Mill LLC',
  description: 'Exceptional Residences | Curated Living Experiences',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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