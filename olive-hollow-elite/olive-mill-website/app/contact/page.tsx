import Section from '../../components/Section';
import MotionReveal from '../../components/MotionReveal';

export const metadata = {
  title: 'Contact | Olive Mill LLC',
  description: 'Get in touch with Olive Mill LLC.',
};

export default function ContactPage() {
  return (
    <main className="pt-20">
      <Section>
        <MotionReveal>
          <p className="font-body uppercase tracking-[0.22em] text-xs text-oliveSecondary">Contact</p>
          <h1 className="font-heading text-4xl md:text-6xl mt-4 text-olivePrimary">Get in Touch</h1>
          <p className="font-body mt-6 text-lg text-darkText/85 max-w-2xl">
            For tours, availability, and resident support, contact our team.
          </p>

          <div className="mt-10 rounded-3xl bg-olivePrimary text-creamBackground p-8 md:p-10 shadow-lg">
            <p className="font-heading text-2xl">Olive Mill LLC</p>
            <p className="mt-4 font-body text-creamBackground/85">Email</p>
            <a className="font-body text-lg underline decoration-goldAccent/70 underline-offset-4" href="mailto:info@olivemill.com">
              info@olivemill.com
            </a>
            <p className="mt-8 text-sm text-creamBackground/70">
              We respect privacy. We will never sell resident data.
            </p>
          </div>
        </MotionReveal>
      </Section>
    </main>
  );
}
