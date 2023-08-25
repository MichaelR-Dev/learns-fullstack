//!----------------------------------------------------
//TODO Add logging to server for route usage
//!----------------------------------------------------

import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export const POST = async (request: NextRequest) => {

    const URL: RequestInfo = "http://127.0.0.1:8090/api/collections/users/auth-with-password";
    const newHeaders: Headers = new Headers();
    
    newHeaders.set('Content-Type', 'application/json')
    
    const res: Response = await fetch(URL,
    {
        method: 'POST',
        headers: newHeaders,
        body: request.body
    })

    if(res.ok){

        const responseData = await res.json()

        const token: any = jwt.decode(responseData.token)!;

        const expirationDate: Date = new Date(token.exp * 1000);
        const formattedExpiration: String = expirationDate.toUTCString();

        let response = new NextResponse();
        response.headers.set('Set-Cookie', `${encodeURIComponent('njsa')}=${encodeURIComponent('Bearer')} ${encodeURIComponent(responseData.token)}; expires=${formattedExpiration}; HttpOnly; Path=/`)

        return response;

    }

    const failResponse = NextResponse.json({ error: 'Invalid Authorization'}, { status: 401 });
    return failResponse;

}