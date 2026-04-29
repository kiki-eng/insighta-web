'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Nav from '@/components/Nav';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function ProfileDetail() {
  const params = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch(`/api/profiles/${params.id}`);
        const data = await res.json();
        if (data.status === 'success') {
          setProfile(data.data);
        } else {
          setError(data.message || 'Profile not found');
        }
      } catch {
        setError('Failed to load profile');
      }
      setLoading(false);
    }
    load();
  }, [params.id]);

  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto p-6">
        <Link href="/profiles" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">← Back to Profiles</Link>

        {loading ? (
          <div className="animate-pulse h-64 bg-slate-800 rounded-xl"></div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-red-400">{error}</div>
        ) : profile && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h1 className="text-2xl font-bold mb-6 capitalize">{profile.name}</h1>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['ID', profile.id],
                ['Gender', profile.gender],
                ['Gender Probability', profile.gender_probability?.toFixed(4)],
                ['Age', profile.age],
                ['Age Group', profile.age_group],
                ['Country ID', profile.country_id],
                ['Country Name', profile.country_name],
                ['Country Probability', profile.country_probability?.toFixed(4)],
                ['Created At', profile.created_at],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="font-medium mt-1">{value || '-'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
