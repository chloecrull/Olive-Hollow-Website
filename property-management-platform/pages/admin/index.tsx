import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { supabase } from '../../lib/supabaseClient';

/**
 * Owner dashboard summarising applications and maintenance requests. It
 * demonstrates how to retrieve data from Supabase tables. In a complete
 * application you would also provide actions to approve or deny
 * applications, trigger DocuSign envelopes, and dispatch vendors.
 */
export default function AdminDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const { data: apps } = await supabase.from('applications').select('*');
        const { data: reqs } = await supabase.from('maintenance_requests').select('*');
        setApplications(apps || []);
        setRequests(reqs || []);
      } catch {
        // ignore errors in local development when database isn't available
        setApplications([]);
        setRequests([]);
      }
    }
    load();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Owner Portal</h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Applications</h2>
          {applications.length === 0 ? (
            <p>No applications yet.</p>
          ) : (
            <ul className="space-y-4">
              {applications.map((app) => (
                <li key={app.id} className="border p-4 rounded">
                  <p className="font-semibold">{app.name} applied for Unit {app.unit_id}</p>
                  <p>Status: {app.status}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Maintenance Requests</h2>
          {requests.length === 0 ? (
            <p>No maintenance requests.</p>
          ) : (
            <ul className="space-y-4">
              {requests.map((req) => (
                <li key={req.id} className="border p-4 rounded">
                  <p className="font-semibold">Issue: {req.description}</p>
                  <p>Unit ID: {req.unit_id}</p>
                  <p>Urgency: {req.urgency}</p>
                  <p>Status: {req.status}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}