//!----------------------------------------------------
//TODO Add logging to server for route usage
//!----------------------------------------------------

import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { APILogType, SERVERLOG, ServerLogType } from "@/app/util"

export const POST = async (request: NextRequest) => {

    const path: string = '/api/collections/users/auth-with-password'
    const URL: string | undefined = `${process.env.DB_URL}${path}`
    
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
        response.headers.set('Set-Cookie', `${encodeURIComponent('njsa')}=${encodeURIComponent('Bearer')} ${encodeURIComponent(responseData.token)}; expires=${formattedExpiration}; HttpOnly; Path=/; SameSite=Strict;`)

        SERVERLOG({
            message: `${request.credentials}\n${APILogType.POST} to: ${request.url}`,
            logType: ServerLogType.API,
            logDate: new Date(),
            userData: null
        })
        
        return response;

    }
    
    SERVERLOG({
        message: `${request.credentials}\n${APILogType.POST} to: ${request.url}`,
        logType: ServerLogType.API,
        logDate: new Date(),
        userData: null
    })

    const failResponse = NextResponse.json({ error: 'Invalid Authorization'}, { status: 401 });
    return failResponse;
}