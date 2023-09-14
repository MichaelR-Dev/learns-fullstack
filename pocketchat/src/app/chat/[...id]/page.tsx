import { GetUser } from "@/app/util";
import Header from "@/components/Header";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Channel from "./components/Channel";

async function getChat(id: string) {

    const location = 'http://127.0.0.1:3000'
    const path = `/api/chats/record?id=${id}`;
    const headersList = headers();
  
    const URL: RequestInfo = `${location}${path}`;
  
    try{
  
      const res = await fetch(URL, { method: 'GET', headers: headersList })
      const resJSON = await res.json();

      if(!res.ok){
        throw resJSON
      }
    
      return resJSON;
  
    }catch(e: any){
      console.log(e);
    }
    
    return null;
}

const Page = async ({ params }: { params: { id: string } }) => {

    const userFetch = await GetUser();
    const chatFetch = await getChat(params.id);

    if(chatFetch == null)
        notFound();

    return (
        <div className="flex flex-col h-full w-full">
            <Header isAuthPage={true} newUser={userFetch}></Header>
            <Channel ChatSource={chatFetch}/>
            
            {/* <ChatInput/> */}
        </div>
    )
}

export default Page;