import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hng-stage0-backend-production-68c6.up.railway.app';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ status: 'error', message: 'No refresh token' }, { status: 401 });
  }

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    const response = NextResponse.json({ status: 'error', message: 'Refresh failed' }, { status: 401 });
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    response.cookies.delete('logged_in');
    return response;
  }

  const data = await res.json();
  const response = NextResponse.json({ status: 'success' });

  response.cookies.set('access_token', data.access_token, {
    httpOnly: false,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 180,
  });

  response.cookies.set('refresh_token', data.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 300,
  });

  response.cookies.set('logged_in', 'true', {
    httpOnly: false,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 300,
  });

  return response;
}
