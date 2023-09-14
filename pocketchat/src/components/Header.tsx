'use client'
// @refresh reset

import { UserData } from '@/app/util';
import Image from 'next/image'
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface HeaderProps {
    isAuthPage: boolean;
    newUser: UserData;
}

const Header: React.FC<HeaderProps> = ({isAuthPage, newUser}: HeaderProps) => {

    const [menuOpen, setMenuOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [user, setUser] = useState(newUser);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return(
        <header className="flex flex-row w-full h-10 md:h-15 px-3 py-2 justify-between items-center border-2 flex-between ">

            <div className="flex-1 hidden md:flex justify-start">

                <Image
                    src="/digitbloq.png"
                    className="pointer-events-none mr-2"
                    alt="Digitbloq Logo"
                    width={25}
                    height={25}
                    priority
                />

                <a
                    className=" flex place-items-center text-center gap-x-2 font-bold text-xl text-cyan-300 hover:sepia"
                    href="https://www.github.com/michaelr-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    DigitBloq
                </a>

            </div>

            <div className="flex-1">
                <p className='font-bold text-2xl md:text-xl text-left md:text-center'>PocketChat</p>
            </div>

            <div className='hidden md:flex md:flex-1 justify-end z-10 flex-shrink-0'>
                <p className='mr-3 font-bold text-md'>{user ? user.username : 'guest'}</p>
                <button type="button" className='hover:sepia flex-shrink-0' onClick={toggleMenu}>
                    <Image
                        className=' flex-shrink-0 min-w-25 min-h-25'
                        src="/profile-icon.svg"
                        alt="Profile icon"
                        width={25}
                        height={25}
                        priority
                    />
                </button>
            </div>


            {/*-------------------------Medium Layout Below----------------------------*/}


            <button type="button" className='inline md:hidden z-10 hover:sepia' onClick={toggleMenu}>
                <Image
                    src={!menuOpen ? "/bars-solid-cyan.svg" : "/xmark-solid.svg"}
                    alt="Hamburger menu"
                    width={25}
                    height={25}
                    priority
                />
            </button>

            {
                menuOpen && (
                    <div className="menu-options px-12 py-16 w-full h-full left-0 top-0 bg-teal-700 border-2 border-solid border-white absolute">
                        <ul>
                            <Link href="/logout">Logout</Link>
                            <li>About</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                )
            }
            

        </header>
    )
}

export default Header;