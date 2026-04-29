'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const logged = document.cookie.includes('logged_in=true');
    router.push(logged ? '/dashboard' : '/?error=auth_failed');
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
