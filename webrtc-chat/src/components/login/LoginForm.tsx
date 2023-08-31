'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { RefObject, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {

    const Validator = require('validator');
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    const register_panel: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);
    const login_panel: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);

    
    const handleRedirect = (path: string) => {
        router.push(path);
    }

    async function loginUser(event: React.FormEvent<HTMLFormElement>): Promise<void>{

        try {
            event.preventDefault();
    
            const port = window.location.port;
            const protocol = window.location.protocol;
            const domain = window.location.hostname;
            const path = '/api/authentication/login';
        
            const URL: RequestInfo = `${protocol}//${domain}${(port ? ':' + port : '')}${path}`;

            const FORMDATA: FormData = new FormData(event.currentTarget);
            const headers: Headers = new Headers();
        
            headers.set('Content-Type', 'application/json')
        
            let JSONRequest: any = {};
            FORMDATA.forEach((value, key) => {
        
                if(key === 'email'){
                    value = Validator.normalizeEmail(value);
                }
        
                JSONRequest[key] = Validator.escape(value);
            
            });
        
            //POST request to auth
            const response = await fetch(URL, {
        
                method: 'POST',
                headers: headers,
                body: JSON.stringify(JSONRequest),
        
            });

            if(!response.ok){
                LoginFormError('Invalid Login')
                throw new Error('Invalid Login');
            }
                
            
                handleRedirect('/dashboard');

        } catch (error: any) {

            console.log(error)
            
        }
    
    }

    async function registerUser(event: React.FormEvent<HTMLFormElement>): Promise<void>{

        event.preventDefault();

        const port = window.location.port;
        const protocol = window.location.protocol;
        const domain = window.location.hostname;
        const path = '/api/authentication/register';
    
        const URL: RequestInfo = `${protocol}//${domain}${(port ? ':' + port : '')}${path}`;

        const FORMDATA: FormData = new FormData(event.currentTarget);
        const headers: Headers = new Headers();
    
        headers.append('Content-Type', 'application/json');
    
    
        if(!Validator.isEmail(FORMDATA.get('email'))){
            LoginFormWarn('Invalid Email format');
            return;
        }
    
        if(!Validator.isStrongPassword(FORMDATA.get('password'), 
        { 
            minLength: 8, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10 })){
    
            LoginFormWarn('Password not strong enough');
            return;
        }
    
        if(FORMDATA.get('password') !== FORMDATA.get('passwordConfirm')){
            LoginFormWarn('Passwords not matching');
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
        const response: Response | void = await fetch(URL, {
    
            method: 'POST',
            headers: headers,
            body: JSON.stringify(JSONRequest),
    
        })
        .catch(error => {
            
            LoginFormError(`Error Code:${error.code}\nInfo:${error.message}`)
            console.log(error)
        
        })

        if(response && response.ok){

            LoginFormSuccess('Successfully Registered')
            clearFormInputs('register-panel')
            RegisterRedirect();

        }else if(response){
            LoginFormError(`Register Error: ${response.status}\n${response.statusText}`)
        }
    
    }

    const toggleLoginRegister = () => {setIsLogin(!isLogin)}

    const RegisterRedirect = () => {

        if(login_panel.current == null || register_panel.current == null)
            return;
    
        toggleLoginRegister();

    }

    const LoginFormError = (msg: string) => {
        toast.error(msg, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const LoginFormWarn = (msg: string) => {
        toast.warn(msg, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const LoginFormSuccess = (msg: string) => {
        toast.success(msg, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    function clearFormInputs(id: string) {

        try{
            const form = document.querySelector(`form#${id}`);

            if(!form)
                throw new Error('Failed to clear input fields');

            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
              input.value = '';
            });

        }catch(error){
            console.error(error);
        }
    }

    return (
        <div className="py-10 pt-5 px-10 mb-5 bg-teal-700 border-4 border-solid border-white">
            
            {isLogin ? (
                <form id='login-panel' ref={login_panel} className="flex flex-col mx-10 my-10" method='POST' onSubmit={loginUser}>
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

                    <input name="identity" type="email" placeholder='Email' title='Enter Email' className="px-3 py-2 my-2 text-cyan-950 font-medium" required></input>
                    <input name="password" type="password" placeholder='Password' title='Enter Password' className="px-3 py-2 my-2 text-cyan-950 font-medium" required></input>
                    <button id="login_button" type="submit" className="my-2 py-2 bg-cyan-950 border-2 border-solid border-cyan-950 hover:bg-cyan-600 hover:border-white">Log in</button>
                    <button type="button" className='mt-5' 
                        onClick={toggleLoginRegister}
                    >New User? Click here to Register</button>
                </form>
            ) : (
                <form id='register-panel' ref={register_panel} className="flex flex-col mx-10 my-10" method='POST' onSubmit={registerUser}>
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
                    <button id="register_button" className="my-2 py-2 bg-cyan-950 border-2 border-solid border-cyan-950 hover:bg-cyan-600 hover:border-white">Register</button>
                    <button type="button" className='mt-5' 
                        onClick={toggleLoginRegister}
                    >Existing User? Click here to Login</button>
                </form>
            )}

            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                limit={3}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

export default LoginForm;