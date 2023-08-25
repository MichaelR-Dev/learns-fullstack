import Footer from '@/components/Footer';
import Header from '@/components/Header';

async function getChats(){
    const res = await fetch('');
}

export default async function Dashboard() {

    return (
      <>
        <div className="flex min-h-screen min-w-screen flex-col items-center p-5 px-10">
            <Header isAuthPage={true}></Header>
  
            <main className="flex flex-col bg-slate-500">
                <div className='flex flex-col bg-slate-500'>
                {/*(messages?.map((message) => {
                    return <Message key={message.id} message={message} />;
                })*/}
                </div>
            </main>
                
            <Footer/>
        </div>
        
  
        
      </>
    )
  }
  
  function Message( {message} : any) {
    const {chat_id, message_id, sender, body, timestamp} = message || {};
  
    return (
      //If sender is not self, change color of message
      <div className="h-auto w-auto">
        <p>{`[${timestamp.toString()}] ${sender.toString()}: ${body.toString()}`}</p>
      </div>
    );
  }