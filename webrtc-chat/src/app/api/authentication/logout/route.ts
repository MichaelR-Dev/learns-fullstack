//!----------------------------------------------------
//TODO Add logging to server for route usage
//!----------------------------------------------------

import { APILogType, SERVERLOG, ServerLogType } from "@/app/util";
import { NextRequest, NextResponse } from "next/server";

export const HEAD = async (request: NextRequest) => {

    let response = new NextResponse();
    response.headers.set('Set-Cookie', `njsa=;expires=Thu, 01 Jan 1970 00:00:00 UTC; HttpOnly; Path=/`)

    SERVERLOG({
        message: `${request.credentials}\n${APILogType.HEAD} to: ${request.url}`,
        logType: ServerLogType.API,
        logDate: new Date(),
        userData: null
    })

    return response;

}