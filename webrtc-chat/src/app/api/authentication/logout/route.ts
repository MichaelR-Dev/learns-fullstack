//!----------------------------------------------------
//TODO Add logging to server for route usage
//!----------------------------------------------------

import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {

    let response = new NextResponse();
    response.headers.set('Set-Cookie', `njsa=;expires=Thu, 01 Jan 1970 00:00:00 UTC; HttpOnly; Path=/`)

    return response;

}