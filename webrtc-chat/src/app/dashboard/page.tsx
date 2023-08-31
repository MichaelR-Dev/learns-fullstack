import Header from '@/components/Header';
import { SetUser, UserData } from '../util';
import { headers } from 'next/headers';

export async function getUser() {

  const location = 'http://127.0.0.1:3000'
  const path = '/api/authentication/user';
  const headersList = headers();

  const URL: RequestInfo = `${location}${path}`;
  const res = await fetch(URL, { cache: 'no-store', method: 'GET', headers: headersList })
  const resJSON = await res.json()

  const user: UserData | undefined = SetUser(resJSON);
 
  return user;
}

export default async function Dashboard() {
  const user: UserData | undefined = await getUser();

  return (
    <>
      <div className="flex flex-col h-full w-full items-center p-10">
          <Header isAuthPage={true}></Header>

          <main className="flex flex-col h-full w-full bg-teal-700">
              <div className='flex flex-col bg-slate-500'>
                <p>{user?user.username:''}</p>
              {/*(messages?.map((message) => {
                  return <Message key={message.id} message={message} />;
              })*/}
              </div>
          </main>
      </div>
    </>
  )
}
  
  // function Message( {message} : any) {
  //   const {chat_id, message_id, sender, body, timestamp} = message || {};
  
  //   return (
  //     //If sender is not self, change color of message
  //     <div className="h-auto w-auto">
  //       <p>{`[${timestamp.toString()}] ${sender.toString()}: ${body.toString()}`}</p>
  //     </div>
  //   );
  // }