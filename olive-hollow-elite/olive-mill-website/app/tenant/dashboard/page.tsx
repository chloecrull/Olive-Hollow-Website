import Section from '../../../components/Section';
import MotionReveal from '../../../components/MotionReveal';
import Link from 'next/link';
import Button from '../../../components/Button';

export default function DashboardPage() {
  return (
    <main className="pt-20">
      <Section>
        <MotionReveal>
          <p className="font-body uppercase tracking-[0.22em] text-xs text-oliveSecondary">Resident Portal</p>
          <h1 className="font-heading text-4xl md:text-6xl mt-4 text-olivePrimary">Tenant Dashboard</h1>
          <p className="font-body mt-6 text-lg text-darkText/85 max-w-2xl">
            Manage rent payments and maintenance requests in one secure place.
          </p>
        </MotionReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-olivePrimary/10 bg-creamBackground p-7 shadow-sm">
            <h2 className="font-heading text-2xl text-olivePrimary">Pay Rent</h2>
            <p className="font-body mt-3 text-sm text-oliveSecondary leading-relaxed">
              Payments are processed securely. Receipts are available instantly.
            </p>
            <div className="mt-6">
              <Button className="w-full justify-center" disabled>
                Coming Soon
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-olivePrimary/10 bg-creamBackground p-7 shadow-sm">
            <h2 className="font-heading text-2xl text-olivePrimary">Maintenance Request</h2>
            <p className="font-body mt-3 text-sm text-oliveSecondary leading-relaxed">
              Submit a request and track updates from our team.
            </p>
            <div className="mt-6">
              <Button className="w-full justify-center" disabled>
                Coming Soon
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-olivePrimary/10 bg-creamBackground p-7 shadow-sm">
            <h2 className="font-heading text-2xl text-olivePrimary">Need Help?</h2>
            <p className="font-body mt-3 text-sm text-oliveSecondary leading-relaxed">
              Contact us anytime for urgent issues or questions about your lease.
            </p>
            <div className="mt-6">
              <Link href="/contact">
                <Button variant="secondary" className="w-full justify-center">
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
