import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const requireAuth: string[] = ["/admin", "/dashboard"]
export async function middleware(request: NextRequest) {

  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  if (requireAuth.some((path) => pathname.startsWith(path))) {
    const token = false;/*await getToken({
      req: request,
      secret: process.env.SECRET,
    });*/

    //check not logged in
    if (!token) {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }else{
      return NextResponse.next();
    }
  }

  return res;

}