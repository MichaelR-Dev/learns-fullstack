import { NextRequest, NextResponse } from "next/server"
import { APILogType, SERVERLOG, ServerLogType } from "@/app/util"

export const GET = async (request: NextRequest) => {

    const path: string = '/api/collections/chats/records?expand=users'
    const URL: string | undefined = `${process.env.DB_URL}${path}`

    const cookie = request.cookies.get('njsa');
    const newHeaders = new Headers({
        'Authorization': `${cookie ? cookie.value: ''}` 
    })
    
    const res: Response = await fetch(URL,
    {
        method: 'GET',
        headers: newHeaders,
        body: request.body
    })

    if(res.ok){

        let resJSON = await res.json();

        SERVERLOG({
            message: `${request.credentials}\n${APILogType.GET} to: ${request.url}`,
            logType: ServerLogType.API,
            logDate: new Date(),
            userData: null
        })

        const successResponse = NextResponse.json(resJSON)
        return successResponse;

    }

    SERVERLOG({
        message: `${request.credentials}\n${APILogType.GET} to: ${request.url}`,
        logType: ServerLogType.API,
        logDate: new Date(),
        userData: null
    })

    const failResponse = NextResponse.json({ error: 'Invalid Authorization', status: 401 });
    return failResponse;

}