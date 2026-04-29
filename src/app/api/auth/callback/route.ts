import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }

  const response = NextResponse.redirect(new URL('/dashboard', request.url));

  response.cookies.set('access_token', accessToken, {
    httpOnly: false,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 180,
  });

  response.cookies.set('refresh_token', refreshToken, {
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
