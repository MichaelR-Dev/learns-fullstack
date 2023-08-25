'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Header( {isAuthPage}: any){

    const router = useRouter();

    const handleLogout = async () => {
        try{

            const response = await fetch('/api/authentication/logout')

            if(!response.ok){
                throw new Error(response.statusText);
            }

            router.push('/login')

        }catch(error: any){
            console.error("Error: Failure on log out")
        }
        
    }

    return(
        <header className="flex flex-row w-full justify-between px-5 py-2 items-center flex-between border-b-2 border-blue-500">

            <div className="flex-1">
                <a
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 font-bold text-xl hover:text-slate-300"
                    href="https://www.github.com/michaelr-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                    src="/digitbloq.png"
                    alt="Digitbloq Logo"
                    width={50}
                    height={24}
                    priority
                    />
                    DigitBloq
                </a>
            </div>

            <div className="flex-1">
                <p className='font-bold text-xl text-center'>WebRTC Chat</p>
            </div>

            <div className='flex justify-end flex-1'>
                {isAuthPage ? (<button className="logout-button font-bold text-xl hover:text-slate-300" onClick={handleLogout}>Log out</button>) : (null)}
            </div>
        </header>
    )
}