import { UserProfile } from "@/app/util";
import Image from "next/image";
import Link from "next/link";

const sortUsers = (a: any, b: any) => {
    if(a.username < b.username){
        return -1;
    }else if(a.username > b.username){
        return 1;
    }

    return 0;
}

const Chat = (chatData: any) => {

    const chat = chatData.chatData
    const users = chat.expand.users.sort(sortUsers)

    return (
        <div className="first:mt-2 mx-2 [&:not(first:)]:mb-2 p-2 border-t-2 last:border-b-2">

            <Link href={`/chat/${chat.id}`} className="flex flex-row justify-between place-items-center">
                <div className="flex flex-row">
                    <Image
                        className=' flex-shrink-0'
                        src="/profile-icon.svg"
                        alt="Profile icon"
                        width={50}
                        height={50}
                        priority
                    />

                    <div className="flex flex-col text-left mx-5">
                        <p>{chat.chat_name}</p>
                        <div className="flex flex-row">
                            {users.map((user: UserProfile, index: number) => {
                                if(index > 3)
                                    return

                                if(index == 3)
                                    return <p className="first:mx-0 ml-2 text-gray-400">{user.username.slice(0, 3)}...</p>

                                return <p className="first:mx-0 ml-2 text-gray-400">{user.username}</p>
                            })}
                        </div>
                    </div>
                </div>
                
                <p>{chat.updated}</p>
            </Link>

        </div>
    );
}

export default Chat;