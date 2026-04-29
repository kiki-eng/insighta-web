'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { apiFetch } from '@/lib/api';

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [gender, setGender] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [countryId, setCountryId] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');

  async function load(p = page) {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('page', p.toString());
    params.set('limit', '10');
    if (gender) params.set('gender', gender);
    if (ageGroup) params.set('age_group', ageGroup);
    if (countryId) params.set('country_id', countryId);
    if (sortBy) params.set('sort_by', sortBy);
    if (order) params.set('order', order);

    try {
      const res = await apiFetch(`/api/profiles?${params}`);
      const data = await res.json();
      if (data.status === 'success') {
        setProfiles(data.data || []);
        setTotalPages(data.total_pages || 1);
        setTotal(data.total || 0);
      }
    } catch {}
    setLoading(false);
  }

  useEffect(() => { load(); }, [page]);

  const applyFilters = () => { setPage(1); load(1); };

  return (
    <>
      <Nav />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Profiles ({total})</h1>

        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700 flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value)} className="bg-slate-700 rounded px-3 py-1.5 text-sm">
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Age Group</label>
            <select value={ageGroup} onChange={e => setAgeGroup(e.target.value)} className="bg-slate-700 rounded px-3 py-1.5 text-sm">
              <option value="">All</option>
              <option value="child">Child</option>
              <option value="teenager">Teenager</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Country</label>
            <input value={countryId} onChange={e => setCountryId(e.target.value)} placeholder="e.g. NG" className="bg-slate-700 rounded px-3 py-1.5 text-sm w-20" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Sort By</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-slate-700 rounded px-3 py-1.5 text-sm">
              <option value="">Default</option>
              <option value="age">Age</option>
              <option value="created_at">Created</option>
              <option value="gender_probability">Gender Prob</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Order</label>
            <select value={order} onChange={e => setOrder(e.target.value)} className="bg-slate-700 rounded px-3 py-1.5 text-sm">
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
          <button onClick={applyFilters} className="bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded text-sm font-medium">Apply</button>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-slate-800 rounded"></div>)}</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-sm">
                <thead className="bg-slate-800 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Gender</th>
                    <th className="px-4 py-3 text-left">Age</th>
                    <th className="px-4 py-3 text-left">Age Group</th>
                    <th className="px-4 py-3 text-left">Country</th>
                    <th className="px-4 py-3 text-left">G.Prob</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {profiles.map(p => (
                    <tr key={p.id} className="hover:bg-slate-800/50 cursor-pointer" onClick={() => window.location.href = `/profiles/${p.id}`}>
                      <td className="px-4 py-3 font-medium">{p.name}</td>
                      <td className="px-4 py-3">{p.gender}</td>
                      <td className="px-4 py-3">{p.age}</td>
                      <td className="px-4 py-3">{p.age_group}</td>
                      <td className="px-4 py-3">{p.country_id}</td>
                      <td className="px-4 py-3">{p.gender_probability?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 bg-slate-800 rounded disabled:opacity-50 text-sm">Previous</button>
              <span className="text-sm text-slate-400">Page {page} of {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-slate-800 rounded disabled:opacity-50 text-sm">Next</button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
