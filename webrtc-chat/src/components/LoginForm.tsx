'use client'

import Image from 'next/image'

const Validator = require('validator');

export default function LoginForm(){

    return (
        <div className="py-10 pt-5 px-10 mb-5 bg-teal-700 border-4 border-solid border-white">
            
            <form id='login-panel' className="flex flex-col mx-10 my-10" method='GET' onSubmit={loginUser}>

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

                <input name="login_email" type="email" placeholder='Email' title='Enter Email' className="px-3 py-2 my-2 text-cyan-950 font-medium" required></input>
                <input name="login_password" type="password" placeholder='Password' title='Enter Password' className="px-3 py-2 my-2 text-cyan-950 font-medium" required></input>
                <button id="login_button" type="submit" className="my-2 py-2 bg-cyan-950 border-3 border-solid border-white">Log in</button>
                <button type="button" className='mt-5' 
                    onClick={ToggleLoginVisible}
                >New User? Click here to Register</button>
            </form>

            <form id='register-panel' className="hidden flex-col mx-10 my-10" method='POST' onSubmit={registerUser}>

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

                <input name="username" type="text" placeholder='Username' title='Enter Username' className="px-3 py-2 my-2 text-cyan-950 font-medium" required></input>
                <input name="email" type="email" placeholder='Email' title='Enter Email' className="px-3 py-2 my-2 text-cyan-950 font-medium" required></input>
                <input name="password" type="password" placeholder='Password' title='Enter Password' className="px-3 py-2 my-2 text-cyan-950 font-medium" required></input>
                <input name="passwordConfirm" type="password" placeholder='Confirm Password' title='Confirm Password' className="px-3 py-2 my-2 text-cyan-950 font-medium" required></input>
                <button id="register_button" className="my-2 py-2 bg-cyan-950 border-3 border-solid border-white">Register</button>
                <button type="button" className='mt-5' 
                    onClick={ToggleRegisterVisible}
                >Existing User? Click here to Login</button>
            </form>
        </div>
    )
}

function loginUser(event: React.FormEvent<HTMLFormElement>): void{
    event.preventDefault();
    
    const formData: FormData = new FormData(event.currentTarget);

}

async function registerUser(event: React.FormEvent<HTMLFormElement>): Promise<void>{
    event.preventDefault();

    const URL: RequestInfo = "http://127.0.0.1:8090/api/collections/users/records";
    const FORMDATA: FormData = new FormData(event.currentTarget);
    const headers: Headers = new Headers();

    headers.append('Content-Type', 'application/json');


    if(!Validator.isEmail(FORMDATA.get('email'))){

        
        alert('Invalid Email');

        return;

    }

    if(Validator.isStrongPassword(FORMDATA.get('password'), 
    { 
        minLength: 8, 
        minLowercase: 1, 
        minUppercase: 1, 
        minNumbers: 1,
        minSymbols: 1,
        returnScore: true,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10 }) < 40){

        
        alert('Password not strong');

        return;

    }

    if(FORMDATA.get('password') !== FORMDATA.get('passwordConfirm')){

        
        alert('Password not matching');

        return;
        
    }

    let JSONRequest: any = {};
    FORMDATA.forEach((value, key) => {

        if(key === 'email'){
            value = Validator.normalizeEmail(value);
        }

        JSONRequest[key] = Validator.escape(value);
    
    });

    //POST request to auth
    await fetch(URL, {

        method: 'POST',
        headers: headers,
        body: JSON.stringify(JSONRequest),

    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
        
        alert(`Error ${error.code}\n${error.message}`)
        console.log(error)
    
    })

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