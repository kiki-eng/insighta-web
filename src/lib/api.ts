const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hng-stage0-backend-production-68c6.up.railway.app';

export { API_URL };

export async function apiFetch(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (path.startsWith('/api/')) {
    headers['X-API-Version'] = '1';
  }

  let res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (res.status === 401) {
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    if (refreshRes.ok) {
      res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
        credentials: 'include',
      });
    } else {
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      throw new Error('Session expired');
    }
  }

  return res;
}
