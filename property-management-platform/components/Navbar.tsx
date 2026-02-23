import Link from 'next/link';

/**
 * A simple top navigation bar used across the application. It displays the
 * Olive Hollow Properties brand name and provides links to commonly used
 * pages including the home page, owner portal and login page.
 */
export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="font-bold">Olive Hollow Properties</div>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/admin">Owner Portal</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}