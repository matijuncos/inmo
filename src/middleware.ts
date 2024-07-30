// /middleware.ts
import * as jose from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('middleware');
  console.log(req.cookies.get('token'));
  const token = req.cookies.get('token');

  const proected = ['/admin', '/match'];

  const { pathname } = req.nextUrl;
  if (!token && proected.some((path) => pathname.startsWith(path))) {
    console.log('estoy aca');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const decoded = jose.decodeJwt(token?.value as string);
    const userId = decoded.userId;
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin', '/match', '/admin/edit/:id']
};
