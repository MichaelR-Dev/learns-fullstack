import { headers } from "next/headers";
import EventSource from 'eventsource';

const SubscribeToChat = () => {

    // Create an EventSource object with the URL of the SSE endpoint
    // Specify the SSE endpoint URL
    const sseEndpoint = 'http://127.0.0.1:8090/api/realtime';
    const newHeaders = headers();

    const eventSource = new EventSource(sseEndpoint, { headers: newHeaders.entries() });

    // Add an event listener to handle incoming SSE messages
    eventSource.onmessage = function(event: { data: any; }) {
        // Handle the incoming SSE message
        const data = event.data;
        console.log('Received SSE:', data);

        // Perform actions based on the incoming data (e.g., update the DOM)
    };

    eventSource.onerror = function(event: any) {
        // Handle errors
        console.error('SSE Error:', event);
    };

}

const Channel = ({ ChatSource }: any) => {

    const subscribeFetch = SubscribeToChat();

    return (
        <div className="p-5 bg-teal-700 h-full w-full">
            {ChatSource.expand.messages.map((msg: any, index: number) => {
                return <h1 key={index}>{msg.body}</h1>
            })}
        </div>
    )
    
}

export default Channel;