// /middleware.ts
import * as jose from 'jose';
import { NextRequest, NextResponse } from 'next/server';

function addCacheHeaders(response: NextResponse) {
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('Surrogate-Control', 'no-store');
  return response;
}

export async function middleware(req: NextRequest) {
  console.log('middleware!');
  console.log('Cookies:', req.cookies);
  const token = req.cookies.get('token');
  console.log('Token:', token);

  const protectedPaths = ['/admin'];
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/api')) {
    const response = NextResponse.next();
    addCacheHeaders(response);
    return response;
  }
  if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
    console.log('Redirecting to login, token missing');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    console.log('Token present, decoding...');
    const decoded = jose.decodeJwt(token?.value as string);
    console.log('Decoded token:', decoded);
    return NextResponse.next();
  } catch (error) {
    console.log('Middleware error:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin', '/admin/edit/:id']
};
