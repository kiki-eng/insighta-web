'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import { apiFetch } from '@/lib/api';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const res = await apiFetch(`/api/profiles/search?q=${encodeURIComponent(query)}&limit=20`);
      const data = await res.json();
      if (data.status === 'success') {
        setResults(data.data || []);
        setTotal(data.total || 0);
      } else {
        setError(data.message || 'Search failed');
        setResults([]);
      }
    } catch {
      setError('Search failed');
    }
    setLoading(false);
  }

  return (
    <>
      <Nav />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Natural Language Search</h1>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-3">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g. young males from nigeria"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-medium disabled:opacity-50">
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {['young males from nigeria', 'females above 30', 'people from angola', 'adult males from kenya', 'male and female teenagers above 17'].map(ex => (
              <button key={ex} type="button" onClick={() => setQuery(ex)} className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full hover:text-white border border-slate-700">
                {ex}
              </button>
            ))}
          </div>
        </form>

        {error && <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 text-red-400 mb-4">{error}</div>}

        {searched && !loading && !error && (
          <>
            <p className="text-sm text-slate-400 mb-4">{total} results found</p>
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-sm">
                <thead className="bg-slate-800 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Gender</th>
                    <th className="px-4 py-3 text-left">Age</th>
                    <th className="px-4 py-3 text-left">Age Group</th>
                    <th className="px-4 py-3 text-left">Country</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {results.map(p => (
                    <tr key={p.id} className="hover:bg-slate-800/50 cursor-pointer" onClick={() => window.location.href = `/profiles/${p.id}`}>
                      <td className="px-4 py-3 font-medium">{p.name}</td>
                      <td className="px-4 py-3">{p.gender}</td>
                      <td className="px-4 py-3">{p.age}</td>
                      <td className="px-4 py-3">{p.age_group}</td>
                      <td className="px-4 py-3">{p.country_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </>
  );
}
