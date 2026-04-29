'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { apiFetch, API_URL } from '@/lib/api';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch('/auth/me');
        const data = await res.json();
        if (data.status === 'success') {
          setUser(data.data);
        }
      } catch {}
      setLoading(false);
    }
    load();
  }, []);

  const handleLogout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch {}
    router.push('/');
  };

  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Account</h1>

        {loading ? (
          <div className="animate-pulse h-48 bg-slate-800 rounded-xl"></div>
        ) : user ? (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center gap-4 mb-6">
              {user.avatar_url && (
                <img src={user.avatar_url} alt="" className="w-16 h-16 rounded-full" />
              )}
              <div>
                <p className="text-xl font-bold">@{user.username}</p>
                <p className="text-slate-400 text-sm">{user.email || 'No email'}</p>
              </div>
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-900 text-purple-300' : 'bg-blue-900 text-blue-300'}`}>
                {user.role}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-slate-400">Last Login</p>
                <p className="mt-1 text-sm">{user.last_login_at || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Created</p>
                <p className="mt-1 text-sm">{user.created_at || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Status</p>
                <p className="mt-1 text-sm">{user.is_active ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg text-sm font-medium">
              Log Out
            </button>
          </div>
        ) : (
          <p className="text-slate-400">Could not load user info.</p>
        )}
      </main>
    </>
  );
}
