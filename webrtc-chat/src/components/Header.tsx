'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Header( {isAuthPage}: any){

    const router: AppRouterInstance = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        try{

            const path = '/api/authentication/logout';
            const response = await fetch(path, {
                method: 'HEAD'
            })

            if(!response.ok){
                throw new Error(response.statusText);
            }

            router.push('/login')

        }catch(error: any){
            console.error("Error: Failure on log out")
        }
        
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return(
        <header className="flex flex-row w-full h-10 md:h-20 px-5 py-2 justify-between items-center flex-between border-b-2 border-blue-500">

            <div className="flex-1 hidden md:flex justify-start">

                <a
                    className=" flex place-items-center text-center gap-x-2 font-bold text-xl hover:text-slate-300"
                    href="https://www.github.com/michaelr-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/digitbloq.png"
                        className="pointer-events-none"
                        alt="Digitbloq Logo"
                        width={50}
                        height={50}
                        priority
                    />

                    DigitBloq
                </a>

            </div>

            <div className="flex-1">
                <p className='font-bold text-2xl md:text-xl text-left md:text-center'>WebRTC Chat</p>
            </div>

            <div className='justify-end flex-1 hidden md:flex'>
                {isAuthPage ? (<button className="logout-button font-bold text-md md:text-xl hover:text-slate-300" onClick={handleLogout}>Log out</button>) : (null)}
            </div>


            <button type="button" className='inline md:hidden z-10' onClick={toggleMenu}>
                <Image
                    src={!menuOpen ? "/bars-solid-white.svg" : "/xmark-solid.svg"}
                    alt="Hamburger menu"
                    width={20}
                    height={20}
                    priority
                />
            </button>

            <div className="menu-options transition-colors transition-opacity delay-1000 px-12 py-16 w-full h-full absolute left-0 top-0 bg-cyan-600">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>

        </header>
    )
}