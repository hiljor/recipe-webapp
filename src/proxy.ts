import { NextResponse, NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
 
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  
  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }
}
 
export const config = {
  matcher: '/dashboard/:path*',
}