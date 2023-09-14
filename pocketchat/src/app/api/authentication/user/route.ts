import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { APILogType, SERVERLOG, ServerLogType, SetUser } from "@/app/util"
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.DB_URL);

export const POST = async (request: NextRequest) => {

    const data = await request.json()
    const authData = await pb.collection('users').authWithPassword(data?.identity, data?.password);
    const newToken = pb.authStore.token;

    //Set User to logging
    const user = SetUser(authData.record);
    
    if(pb.authStore.isValid){

        const decodedToken: any = jwt.decode(pb.authStore.token)!;

        const expirationDate: Date = new Date(decodedToken.exp * 1000);
        const formattedExpiration: String = expirationDate.toUTCString();

        let successResponse = NextResponse.json({status: 200});
        successResponse.headers.set('Set-Cookie', `${encodeURIComponent('njsa')}=${encodeURIComponent('Bearer')} ${encodeURIComponent(newToken)}; expires=${formattedExpiration}; HttpOnly; Path=/; SameSite=Strict;`)

        SERVERLOG({
            message: `${request.credentials}\n${APILogType.POST} to: ${request.url}`,
            logType: ServerLogType.API,
            logDate: new Date(),
            userData: user
        })

        return successResponse;

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

export const GET = async (request: NextRequest) => {

    //Get from dashboard components is cookie, from middleware/routes is header
    const token = request.headers.get('njsa') || request.cookies.get('njsa')?.value

    if(token){
        
        const URL = 'http://127.0.0.1:8090/api/collections/users/records'
        const newHeaders = new Headers();
        newHeaders.set('Authorization', token)
    
        const authResponse: Response = await fetch(URL, {method: 'GET', headers: newHeaders});
        const data: any = await authResponse.json();
    
        if(data.items.length < 1){
            SERVERLOG({
                message: `${request.credentials}\n${APILogType.GET} to: ${request.url}`,
                logType: ServerLogType.API,
                logDate: new Date(),
                userData: null
            })
        
            const failResponse = NextResponse.json({ error: 'Invalid Authorization'}, { status: 401 });
            return failResponse;
        }
  
        let user = SetUser(data.items[0]);

        SERVERLOG({
            message: `${request.credentials}\n${APILogType.GET} to: ${request.url}`,
            logType: ServerLogType.API,
            logDate: new Date(),
            userData: user
        })

        let successResponse = NextResponse.json(user, { status: 200 })
        return successResponse;

    }else{

        SERVERLOG({
            message: `${request.credentials}\n${APILogType.GET} to: ${request.url}`,
            logType: ServerLogType.API,
            logDate: new Date(),
            userData: null
        })
    
        const failResponse = NextResponse.json({ error: 'Invalid Authorization'}, { status: 401 });
        return failResponse;

    }

}