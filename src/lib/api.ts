const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hng-stage0-backend-production-68c6.up.railway.app';

export { API_URL };

function getAccessToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (path.startsWith('/api/')) {
    headers['X-API-Version'] = '1';
  }

  const token = getAccessToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    const refreshRes = await fetch('/api/auth/refresh', { method: 'POST' });

    if (refreshRes.ok) {
      const newToken = getAccessToken();
      if (newToken) {
        headers['Authorization'] = `Bearer ${newToken}`;
      }
      res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
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
