import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-900/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-olive-800 text-champagne-200 shadow-luxe ring-1 ring-white/10">
            OHP
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-champagne-200">4037 Edgewood Road</div>
            <div className="text-xs text-white/60">Baltimore residences</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            Home
          </Link>
          <Link
            href="/schedule/1"
            className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            Tours
          </Link>
          <Link
            href="/apply/1"
            className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            Apply
          </Link>
          <Link
            href="/tenant"
            className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            Resident portal
          </Link>
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            Owner
          </Link>
          <Link
            href="/login"
            className="ml-1 rounded-lg bg-champagne-300 px-3 py-2 text-sm font-semibold text-ink-900 shadow-luxe hover:bg-champagne-200"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}