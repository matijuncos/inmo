// /middleware.ts
import * as jose from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('middleware!');
  console.log('Cookies:', req.cookies); // Log all cookies to see what's being sent
  const token = req.cookies.get('token');
  console.log('Token:', token); // Log the token to check if it's undefined

  const protectedPaths = ['/admin', '/match'];
  const { pathname } = req.nextUrl;

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
  matcher: ['/admin', '/match', '/admin/edit/:id']
};
