import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white shadow-soft">
            OHP
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Olive Hollow Properties</div>
            <div className="text-xs text-slate-500">AI‑assisted leasing and management</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            href="/tenant"
            className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Tenant
          </Link>
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Owner
          </Link>
          <Link
            href="/login"
            className="ml-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-soft hover:bg-slate-800"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}