'use client'

import Image from 'next/image'

export default function LoginForm(){

    return (
        <div className="py-10 pt-5 px-10 mb-5 bg-teal-700 border-4 border-solid border-white">
            
            <form id='login-panel' className="flex flex-col mx-10 my-10" method='GET' onSubmit={LoginUser}>

                <div className='flex flex-row justify-between place-items-center pb-5'>
                    <Image
                    src="/digitbloq.png"
                    alt="Digitbloq Logo"
                    className='select-none'
                    onDragStart={(e)=>{e.preventDefault()}}
                    width={60}
                    height={24}
                    priority
                    />
                    <p className='mx-auto text-center text-xl font-bold select-none text-white'>User Log in</p>
                </div>

                <input name="login_email" type="email" placeholder='Email' className="px-3 py-2 my-2 text-cyan-950 font-medium"></input>
                <input name="login_password" type="password" placeholder='Password' className="px-3 py-2 my-2 text-cyan-950 font-medium"></input>
                <button id="login_button" className="my-2 py-2 bg-cyan-950 border-3 border-solid border-white">Log in</button>
                <button type="button" className='mt-5' 
                    onClick={ToggleLoginVisible}
                >New User? Click here to Register</button>
            </form>

            <form id='register-panel' className="hidden flex-col mx-10 my-10" method='POST'>

                <div className='flex flex-row justify-between place-items-center pb-5'>
                    <Image
                    src="/digitbloq.png"
                    alt="Digitbloq Logo"
                    className='select-none'
                    onDragStart={(e)=>{e.preventDefault()}}
                    width={60}
                    height={24}
                    priority
                    />
                    <p className='mx-auto text-center text-xl font-bold select-none text-white'>User Register</p>
                </div>

                <input name="email" type="email" placeholder='Email' className="px-3 py-2 my-2 text-cyan-950 font-medium"></input>
                <input name="password" type="password" placeholder='Password' className="px-3 py-2 my-2 text-cyan-950 font-medium"></input>
                <input name="passwordConfirm" type="password" placeholder='Confirm Password' className="px-3 py-2 my-2 text-cyan-950 font-medium"></input>
                <button id="register_button" className="my-2 py-2 bg-cyan-950 border-3 border-solid border-white">Register</button>
                <button type="button" className='mt-5' 
                    onClick={ToggleRegisterVisible}
                >Existing User? Click here to Login</button>
            </form>
        </div>
    )
}

function LoginUser(event: React.FormEvent<HTMLFormElement>): void{
    const formData: React.FormEvent<HTMLFormElement> = event;

}

const RegisterUser: React.FormEventHandler<HTMLFormElement> = (event) => {
    const url: String = "http://127.0.0.1:8090/api/collections/users/records";


}

const ToggleLoginVisible: React.MouseEventHandler<HTMLButtonElement> = (event) => {

    const login_panel: HTMLFormElement = document.querySelector('form#login-panel')!;
    const register_panel: HTMLFormElement = document.querySelector('form#register-panel')!;

    login_panel?.classList.remove('flex');
    login_panel?.classList.add('hidden');

    register_panel?.classList.remove('hidden');
    register_panel?.classList.add('flex');

}

const ToggleRegisterVisible: React.MouseEventHandler<HTMLButtonElement> = (event) => {

    const login_panel: HTMLFormElement = document.querySelector('form#login-panel')!;
    const register_panel: HTMLFormElement = document.querySelector('form#register-panel')!;

    register_panel?.classList.remove('flex');
    register_panel?.classList.add('hidden');

    login_panel?.classList.remove('hidden');
    login_panel?.classList.add('flex');
    
}