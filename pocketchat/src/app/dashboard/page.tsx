import Header from '@/components/Header';
import { GetUser, SetUser, UserData } from '../util';
import { headers } from 'next/headers';
import Chat from './components/Chat';

async function getChats() {

  const location = 'http://127.0.0.1:3000'
  const path = '/api/chats/records';
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

export default async function Dashboard() {

  const userFetch = GetUser();
  const user: UserData = SetUser(await userFetch);

  const chatsFetch = await getChats();

  return (
    <>
      <div className="flex flex-col h-full w-full items-center">

          <Header isAuthPage={true} newUser={user}></Header>

          <main className="flex flex-col h-full w-full bg-teal-700">
            <div className='flex flex-col'>
                {chatsFetch?.items.map((chat: any) => {
                    return <Chat key={chat.id} chatData={chat} />;
                })}
            </div>
          </main>
          
      </div>
    </>
  )
}