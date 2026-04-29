'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function verify() {
      try {
        const res = await apiFetch('/auth/me');
        if (res.ok) {
          router.push('/dashboard');
        } else {
          router.push('/?error=auth_failed');
        }
      } catch {
        router.push('/?error=auth_failed');
      }
    }
    verify();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-slate-400">Completing authentication...</p>
      </div>
    </div>
  );
}
