import Section from '../../components/Section';
import Button from '../../components/Button';

export const metadata = {
  title: 'Apply | Olive Mill LLC',
  description: 'Apply to lease a residence at Olive Mill.',
};

export default function ApplyPage() {
  return (
    <main className="pt-24">
      <Section>
        <h1 className="font-heading text-4xl mb-8 text-olivePrimary">Apply</h1>
        <p className="font-body mb-6">
          We appreciate your interest in one of our residences. Please contact our leasing office to apply.
        </p>
        <Button onClick={() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/contact';
          }
        }}>
          Contact Us
        </Button>
      </Section>
    </main>
  );
}