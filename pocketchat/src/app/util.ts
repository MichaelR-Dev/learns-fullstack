import { headers } from "next/headers"

export type UserData = {

    username: string,
    email: string,
    created: string,
    emailVisibility: boolean,
    id: string

}

export type UserProfile = {
    avatar: string,
    created: string,
    email: string | undefined,
    emailVisibility: boolean,
    id: string,
    updated: string,
    username: string,
    verified: false
}

export enum ServerLogType {
    Access = '\x1b[33mACCESS-LOG\x1b[0m',
    Redirect = '\x1b[33mREDIRECT-LOG\x1b[0m',
    API = '\x1b[33mAPI-LOG\x1b[0m',
    Error = '\x1b[31mERROR-LOG\x1b[0m',
    User = '\x1b[32mUSER-LOG\x1b[0m',
    Admin = '\x1b[31mADMIN-LOG\x1b[0m'
}

export enum APILogType {
    GET='\x1b[35mGET\x1b[0m',
    POST='\x1b[35mPOST\x1b[0m',
    PUT='\x1b[35mPUT\x1b[0m',
    PATCH='\x1b[35mPATCH\x1b[0m',
    DELETE='\x1b[35mDELETE\x1b[0m',
    HEAD='\x1b[35mHEAD\x1b[0m',
    OPTIONS='\x1b[35mOPTIONS\x1b[0m',
    CONNECT='\x1b[35mCONNECT\x1b[0m',
    TRACE='\x1b[35mTRACE\x1b[0m'
}

export type ServerLog = {
    message: string,
    logType: ServerLogType,
    logDate: Date | undefined,
    userData: UserData | null | undefined
}

export async function GetUser() {
  
    const location = 'http://127.0.0.1:3000'
    const path = '/api/authentication/user';
    const headersList = headers();
  
    const URL: RequestInfo = `${location}${path}`;
  
    try{
  
      const res = await fetch(URL, { method: 'GET', headers: headersList })
      const resJSON = await res.json();
  
      return resJSON;
  
    }catch(e: any){
      console.log(e);
    }
  
    return null;
  }

export const SetUser = (data: UserData) => {

    let user: UserData = {
        username: data.username,
        email: data.email,
        created: data.created,
        emailVisibility: data.emailVisibility,
        id: data.id,
    }
    

    return user
}

export const SERVERLOG = (log: ServerLog) => {
    console.log(`\x1b[33m[${log.logDate ? log.logDate.toUTCString() : new Date().toUTCString()}]\x1b[0m\n\x1b[36m${log.userData ? `[ID=${log.userData.id} U=${log.userData.username} E=${log.userData.email}]\x1b[0m\n` : ''}${log.logType}: ${log.message}\n`)
}