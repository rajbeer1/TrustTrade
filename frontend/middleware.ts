import { NextResponse ,NextRequest} from 'next/server';


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = ['/', '/sign-up','/api/uploadthing'];
  const protectedPaths = ['/claim', '/home','/makeClaim','/proof-funds','/trade'];
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
    '/claim',
    '/home',
    '/makeClaim',
    '/proof-funds',
    '/trade'
  ],
};
