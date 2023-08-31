import { NextResponse, NextRequest } from 'next/server'
import { SERVERLOG, ServerLogType, SetUser, UserData } from './app/util'

const requireAuth: string[] = ["/admin", "/dashboard", "/chat", "/logout"]
const requireGuest: string[] = ["/login"]

export const middleware = async (request: NextRequest) => {

  let res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const token: String = request.cookies.get('njsa')?.value || "";

  console.log(pathname);

  let user: UserData | undefined;

  const AuthorizeToken = async (token: String): Promise<boolean> => {

    try{
      const URL = 'http://127.0.0.1:8090/api/collections/users/records'
      const headers: Headers = new Headers();
      
      headers.set('Content-Type', 'application/json')
  
      headers.append('Authorization', `${token}`)
  
      const authResponse: Response = await fetch(URL, {method: 'GET', headers: headers});
      const data: any = await authResponse.json();
  
      if(!authResponse.ok){
        throw new Error('Network response was not ok');
      }
  
      if(data.items.length != 1){
        throw new Error('Invalid authentication');
      }
  
      user = SetUser(data.items[0]);
      return true;
  
    }catch(error){
  
      return false;
  
    }

  }

  if (requireGuest.some((path) => pathname.startsWith(path))) {

    //check not logged in
    if (await AuthorizeToken(token)) {

      const url = new URL('/dashboard', request.url);

      SERVERLOG({
        message: `${request.credentials}\nRequesting guest path with auth: ${pathname}\nRedirecting: ${url}`,
        logType: ServerLogType.Redirect,
        logDate: new Date(),
        userData: user
      })

      return NextResponse.redirect(url)

    }

    SERVERLOG({
      message: `${request.credentials}\nRequesting guest path: ${pathname}`,
      logType: ServerLogType.Access,
      logDate: new Date(),
      userData: null
    })

  }

  if (requireAuth.some((path) => pathname.startsWith(path))) {

    //check not logged in
    if (await AuthorizeToken(token)) {

      SERVERLOG({
        message: `${request.credentials}\nRequesting restricted path: ${pathname}`,
        logType: ServerLogType.Access,
        logDate: new Date(),
        userData: user
      })
      

      return NextResponse.next();

    }else{

      const url = new URL('/login', request.url);

      if(!pathname.includes('?_rsc')){
        SERVERLOG({
          message: `${request.credentials}\nRequesting guest path with auth: ${pathname}\nRedirecting: ${url}`,
          logType: ServerLogType.Redirect,
          logDate: new Date(),
          userData: user
        })
      }

      
      return NextResponse.redirect(url);

    }

  }

  //! FIX THIS FUCKING PATH

  // if(pathname.includes('/api')){
  //   return new NextResponse(request.nextUrl, request);
  // }

  return res;

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}