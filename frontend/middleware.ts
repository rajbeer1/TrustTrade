import { NextResponse ,NextRequest} from 'next/server';


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = ['/', '/sign-up'];
  const protectedPaths = ['/data', '/home','/map','/photo'];
  const isPublicPath = publicPaths.includes(path);
  const isProtectedPath = protectedPaths.includes(path);
  const token = request.cookies.get('user')?.value || '';
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/home', request.nextUrl));
  }

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/sign-up', // Public path
    '/', // Public path
    '/data', // Protected path
    '/home',
    '/map',
    '/photo'
  ],
};
