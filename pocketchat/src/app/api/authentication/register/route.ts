import { APILogType, SERVERLOG, ServerLogType } from "@/app/util";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {

    const path: string = '/api/collections/users/records'
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
        const response = NextResponse.json( responseData );

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