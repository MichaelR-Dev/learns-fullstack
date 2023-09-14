import { headers } from "next/headers";

const Channel = ({ ChatSource }: any) => {

    return (
        <div className="p-5 bg-teal-700 h-full w-full">
            {ChatSource.expand.messages ? ChatSource.expand.messages.map((msg: any, index: number) => {
                return <h1 key={index.toString()}>{msg.body}</h1>
            }) : <></>}
        </div>
    )
    
}

export default Channel;