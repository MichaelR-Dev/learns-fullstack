import { APILogType, SERVERLOG, ServerLogType } from "@/app/util";
import { NextRequest, NextResponse } from "next/server";
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.DB_URL);

export const GET = async (request: NextRequest) => {

    pb.authStore.clear();

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