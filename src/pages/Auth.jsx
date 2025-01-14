import { useContext } from 'react'
import { Form, useLocation, useNavigate } from 'react-router'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'
import { FaBlog } from "react-icons/fa";


const midleStyle={
    width:'300px',
    position:'absolute',
    top:'50%',
    left:'50%',
    transition:'translate(-50%,-50%)'

}

export const Auth = () => {
    const {user,signInUser,signUpUser,msg} = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname);
    const isSignIn=location.pathname == '/auth/in'//true vagy false lesz
    console.log(msg);
    
    
    const handleSubmit=(event)=>{
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log(data.get('email'),data.get('password'),data.get('displayName'));
        if(isSignIn){
            signInUser(data.get('email'),data.get('password'))
        }else{
            //regisztráció
            signUpUser(data.get('email'),data.get('password'),data.get('displayName'))
        }
        
        
    }
    console.log(user);
    
  return (
    <div className='page'>
        <div className='p-5'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {<FaBlog className='text-white text-5xl text-center'/>}
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                {isSignIn ? 'Bejelentkezés' : 'Regisztráció'}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email address
                    </label>
                    <div className="mt-2">
                    <input
                        id="exampleEmail"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                        Password
                    </label>
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                        </a>
                    </div>
                    </div>
                    <div className="mt-2">
                    <input
                        id="examplePassword"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                    </div>
                </div>
                {!isSignIn && 
                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-900">
                        Felhasználónév
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        id="displayName"
                        name="displayName"
                        type="text"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        />
                    </div>
                    </div>
                }

                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
                    >
                    {isSignIn ? 'Bejelentkezés' : 'Regisztráció'}
                    </button>
                </div>
                </form>
                <div>
                    <button
                    onClick={()=>navigate('/pwreset')}
                    type="submit"
                    className="mt-2 w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
                    >
                    Elfelejtett jelszó
                    
                    </button>
                </div>
            </div>
            </div>

            {msg && <Toastify {...msg}/>}
        </div>
    </div>
  )
}
