'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import { apiFetch } from '@/lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch('/api/profiles?limit=1');
        const data = await res.json();
        setStats({ total: data.total || 0 });
      } catch {
        setStats({ total: 0 });
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <Nav />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-slate-800 rounded-xl"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-400 text-sm">Total Profiles</p>
              <p className="text-3xl font-bold mt-2">{stats?.total || 0}</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-400 text-sm">Platform</p>
              <p className="text-lg font-semibold mt-2">Insighta Labs+</p>
              <p className="text-slate-500 text-sm mt-1">Profile Intelligence System</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-400 text-sm">Quick Actions</p>
              <div className="mt-3 space-y-2">
                <a href="/profiles" className="block text-blue-400 hover:text-blue-300 text-sm">Browse Profiles →</a>
                <a href="/search" className="block text-blue-400 hover:text-blue-300 text-sm">Search Profiles →</a>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
