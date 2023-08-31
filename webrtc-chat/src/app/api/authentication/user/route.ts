//!----------------------------------------------------
//TODO Add logging to server for route usage
 //! FIX THIS FUCKING PATH
//!----------------------------------------------------

import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { APILogType, SERVERLOG, ServerLogType, UserData, SetUser } from "@/app/util"
import { redirect } from "next/navigation"

export const GET = async (request: NextRequest) => {

    const path: string = '/api/collections/users/records'
    const URL: string | undefined = `${process.env.DB_URL}${path}`

    const cookie = request.cookies.get('njsa');
    const newHeaders = new Headers({
        'Authorization': `${cookie ? cookie.value: ''}` 
    })

    let user: UserData | undefined;
    
    const res: Response = await fetch(URL,
    {
        method: 'GET',
        headers: newHeaders,
        body: request.body
    })

    if(res.ok){

        let resJSON = await res.json();

        user = SetUser(resJSON.items[0]);

        SERVERLOG({
            message: `${request.credentials}\n${APILogType.GET} to: ${request.url}`,
            logType: ServerLogType.API,
            logDate: new Date(),
            userData: user
        })

        const successResponse = NextResponse.json(user)
        return successResponse;

    }

    SERVERLOG({
        message: `${request.credentials}\n${APILogType.GET} to: ${request.url}`,
        logType: ServerLogType.API,
        logDate: new Date(),
        userData: user
    })

    const failResponse = NextResponse.json({ error: 'Invalid Authorization', status: 401 });
    return failResponse;

}