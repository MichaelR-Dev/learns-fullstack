import { APILogType, SERVERLOG, ServerLogType } from "@/app/util";
import { NextRequest, NextResponse } from "next/server"
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.DB_URL);

export const POST = async (request: NextRequest) => {

    const formData = await request.json();

    const data = {
        "username": formData?.username,
        "email": formData?.email,
        "emailVisibility": false,
        "password": formData?.password,
        "passwordConfirm": formData?.passwordConfirm
    };

    const record = await pb.collection('users').create(data);

    //Optional email verification
    await pb.collection('users').requestVerification(data.email);

    if(!record.code){

        SERVERLOG({
            message: `${request.credentials}\n${APILogType.POST} to: ${request.url}`,
            logType: ServerLogType.API,
            logDate: new Date(),
            userData: null
        })

        const successResponse = NextResponse.json({ error: 'Successfully Registered'}, { status: 200 });
        return successResponse;

    }

    SERVERLOG({
        message: `${request.credentials}\n${APILogType.POST} to: ${request.url}`,
        logType: ServerLogType.API,
        logDate: new Date(),
        userData: null
    })

    const failResponse = NextResponse.json({ error: 'Invalid Registry'}, { status: 401 });
    return failResponse;

}