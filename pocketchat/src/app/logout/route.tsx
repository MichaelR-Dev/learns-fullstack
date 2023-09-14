import { APILogType, SERVERLOG, ServerLogType } from "@/app/util";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {

    const logoutHeaders = new Headers(request.headers);
    logoutHeaders.set('Set-Cookie', `njsa=;expires=Thu, 01 Jan 1970 00:00:00 UTC; HttpOnly; Path=/`)
    
    const response = NextResponse.redirect(new URL('/login', request.url), {
        status: 302,
        headers: logoutHeaders
    })

    SERVERLOG({
        message: `${request.credentials}\n${APILogType.GET} to: ${request.url}`,
        logType: ServerLogType.API,
        logDate: new Date(),
        userData: null
    })

    return response;

}