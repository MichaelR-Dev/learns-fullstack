//!----------------------------------------------------
//TODO Add logging to server for route usage
//!----------------------------------------------------

import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {

    const URL: RequestInfo = "http://127.0.0.1:8090/api/collections/users/records";
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
        
        let response = NextResponse.json( responseData );

        return response;

    }

    const failResponse = NextResponse.json({ error: 'Invalid Authorization'}, { status: 401 });
    return failResponse;

}