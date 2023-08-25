//!----------------------------------------------------
//TODO Add logging to server for authentication usage
//!----------------------------------------------------

import { NextResponse, NextRequest } from 'next/server'

const requireAuth: string[] = ["/admin", "/dashboard", "/chat"]
const requireGuest: string[] = ["/login"]

export const middleware = async (request: NextRequest) => {

  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const token: String = request.cookies.get('njsa')?.value || "";

  const AuthorizeToken = async (token: String): Promise<boolean> => {

    try{

      const URL = 'http://127.0.0.1:8090/api/collections/users/records'
      const headers: Headers = new Headers();
      
      headers.set('Content-Type', 'application/json')
  
      headers.append('Authorization', `${token}`)
  
      const authResponse = await fetch(URL, {method: 'GET', headers: headers});
      const data = await authResponse.json();
  
      if(!authResponse.ok){
        throw new Error('Network response was not ok');
      }
  
      if(data.items.length != 1){
        throw new Error('Invalid authentication');
      }
  
      return true;
  
    }catch(error){
  
      return false;
  
    }

  }

  console.log(`Called on request: ${pathname}`);

  if (requireGuest.some((path) => pathname.startsWith(path))) {

    //check not logged in
    if (await AuthorizeToken(token)) {

      if(pathname.startsWith('/login')){
        let url = new URL('/dashboard', request.url);
        return NextResponse.redirect(url)
      }
    }

  }

  if (requireAuth.some((path) => pathname.startsWith(path))) {

    //check not logged in
    if (await AuthorizeToken(token)) {

      if(pathname.startsWith('/login')){
        let url = new URL('/dashboard', request.url);
        return NextResponse.redirect(url)
      }

      return NextResponse.next();

    }else{
      let url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }

  }

  return res;

}

//TODO: Fix this to authenticate with user from JWT cookie!!!!

