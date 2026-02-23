import Section from '../../components/Section';

export const metadata = {
  title: 'Contact | Olive Mill LLC',
  description: 'Get in touch with us.',
};

export default function ContactPage() {
  return (
    <main className="pt-24">
      <Section>
        <h1 className="font-heading text-4xl mb-8 text-olivePrimary">Contact Us</h1>
        <p className="font-body">
          For inquiries about our residences, please email us at{' '}
          <a href="mailto:info@olivemill.com" className="text-goldAccent underline">
            info@olivemill.com
          </a>
          .
        </p>
      </Section>
    </main>
  );
}