import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const requireAuth: string[] = ["/admin", "/dashboard"]
export async function middleware(request: NextRequest) {

  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const token: String = request.cookies.get('njsa')?.value || "";

  if (requireAuth.some((path) => pathname.startsWith(path))) {

    //check not logged in
    if (AuthorizeToken(token)) {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }else{
      return NextResponse.next();
    }
  }

  return res;

}

//TODO: Fix this to authenticate with user from token cookie!!!!

const AuthorizeToken = async (token: String): boolean => {

  try{
    const URL = 'http://127.0.0.1:8090/api/collections/users/records'
    const headers: Headers = new Headers();
    
    headers.set('Content-Type', 'application/json')

    headers.append('Authorization', `Bearer ${token}`)

    const authResponse = await fetch(URL, {method: 'GET', headers: headers});
    const textDecoder = new TextDecoderStream();

    if(!authResponse.ok){
      throw new Error('Network response was not ok');
    }

  }catch(error){

    console.log(error);
    return false;

  }
}