import Image from 'next/image'

export default function Header( {isAuthPage}: any){
    return(
        <header className="flex flex-row w-full justify-between px-5 py-2 items-center flex-between border-b-2 border-blue-500">
            <div className="">
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

            <div>
            <p className='font-bold text-xl'>WebRTC Chat</p>
            </div>

            {isAuthPage ? (<button className="logout-button font-bold text-xl hover:text-slate-300">Log out</button>) : (null)}
        </header>
    )
}