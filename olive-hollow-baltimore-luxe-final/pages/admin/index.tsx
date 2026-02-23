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
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Owner portal</h1>
          <p className="text-white/70">Applications, maintenance, and operations overview.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-luxe">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-champagne-200">Applications</h2>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/10">
                {applications.length}
              </span>
            </div>
            {applications.length === 0 ? (
              <p className="mt-4 text-sm text-white/70">No applications yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {applications.map((app) => (
                  <li key={app.id} className="rounded-2xl border border-white/10 bg-ink-900/40 p-4">
                    <p className="text-sm font-semibold">{app.name}</p>
                    <p className="mt-1 text-sm text-white/70">Unit: {app.unit_id} · Status: {app.status}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-luxe">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-champagne-200">Maintenance requests</h2>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/10">
                {requests.length}
              </span>
            </div>
            {requests.length === 0 ? (
              <p className="mt-4 text-sm text-white/70">No maintenance requests.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {requests.map((req) => (
                  <li key={req.id} className="rounded-2xl border border-white/10 bg-ink-900/40 p-4">
                    <p className="text-sm font-semibold">{req.description}</p>
                    <p className="mt-1 text-sm text-white/70">
                      Unit: {req.unit_id} · Urgency: {req.urgency} · Status: {req.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-ink-800/70 p-6 shadow-luxe">
          <h3 className="text-base font-semibold text-champagne-200">Next improvements</h3>
          <p className="mt-2 text-sm text-white/70">
            Add action buttons (approve/deny, send lease), vendor dispatch rules, and reporting exports.
          </p>
        </div>
      </main>
    </div>
  );
}