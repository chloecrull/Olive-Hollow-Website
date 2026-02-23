import Section from '../../../components/Section';

export default function DashboardPage() {
  return (
    <main className="pt-24">
      <Section>
        <h1 className="font-heading text-4xl mb-8 text-olivePrimary">Tenant Dashboard</h1>
        <p className="font-body">
          This dashboard allows tenants to pay rent, view their lease, and submit maintenance requests. Functionality will be implemented soon.
        </p>
      </Section>
    </main>
  );
}