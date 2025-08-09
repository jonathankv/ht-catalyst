import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export default function AdminMentoringPage() {
  const [token, setToken] = useState('');
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE}/mentoring/admin/applications`, {
        headers: { 'X-Admin-Token': token },
      });
      setApps(res.data || []);
    } catch (e) {
      setError('Unauthorized or server error');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.post(`${API_BASE}/mentoring/admin/applications/${id}/status`, null, {
        params: { status },
        headers: { 'X-Admin-Token': token },
      });
      await load();
    } catch (e) {
      alert('Failed to update status');
    }
  };

  return (
    <Layout>
      <Head>
        <title>Admin · Mentoring</title>
      </Head>
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-2xl font-semibold">Admin · Mentoring Applications</h1>
        <div className="flex items-center gap-3">
          <input
            type="password"
            placeholder="Admin token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-80 rounded-md border border-neutral-300 px-3 py-2"
          />
          <button onClick={load} className="px-4 py-2 rounded-md bg-neutral-900 text-white">Load</button>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="divide-y divide-neutral-200 border rounded-md">
            {apps.map((a) => (
              <div key={a.id} className="p-4 flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{a.full_name || a.user_email}</div>
                  <div className="text-sm text-neutral-600">{a.user_email}</div>
                  <div className="text-sm mt-2">Goals: {a.goals || '-'}</div>
                  <div className="text-xs text-neutral-500 mt-1">Submitted: {new Date(a.created_at).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded text-xs bg-neutral-100">{a.status}</span>
                  <button className="px-2 py-1 text-xs rounded bg-green-600 text-white" onClick={() => updateStatus(a.id, 'accepted')}>Accept</button>
                  <button className="px-2 py-1 text-xs rounded bg-yellow-600 text-white" onClick={() => updateStatus(a.id, 'pending')}>Pending</button>
                  <button className="px-2 py-1 text-xs rounded bg-red-600 text-white" onClick={() => updateStatus(a.id, 'rejected')}>Reject</button>
                </div>
              </div>
            ))}
            {apps.length === 0 && <div className="p-4 text-sm text-neutral-500">No applications.</div>}
          </div>
        )}
      </div>
    </Layout>
  );
}


