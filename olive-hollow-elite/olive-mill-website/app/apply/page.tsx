import Section from '../../components/Section';
import Button from '../../components/Button';
import Link from 'next/link';
import MotionReveal from '../../components/MotionReveal';

export const metadata = {
  title: 'Apply | Olive Mill LLC',
  description: 'Apply to lease a residence at Olive Mill.',
};

export default function ApplyPage() {
  return (
    <main className="pt-20">
      <Section>
        <MotionReveal>
          <p className="font-body uppercase tracking-[0.22em] text-xs text-oliveSecondary">Application</p>
          <h1 className="font-heading text-4xl md:text-6xl mt-4 text-olivePrimary">Apply to Lease</h1>
          <p className="font-body mt-6 text-lg text-darkText/85 max-w-2xl">
            We review applications discreetly and respond promptly. For the fastest service, contact us directly.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/residences">
              <Button variant="secondary" className="min-w-[220px] justify-center">
                View Residences
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="min-w-[220px] justify-center">Contact Us</Button>
            </Link>
          </div>

          <div className="mt-10 rounded-2xl border border-olivePrimary/10 bg-creamBackground p-6">
            <p className="text-sm font-body text-oliveSecondary leading-relaxed">
              Note: This is a design-first build. Hooking the application flow to Supabase can be enabled next.
            </p>
          </div>
        </MotionReveal>
      </Section>
    </main>
  );
}
