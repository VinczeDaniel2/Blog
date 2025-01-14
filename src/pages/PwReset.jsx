import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Toastify } from '../components/Toastify'

export const PwReset = () => {
  const {msg,resetPassword}=useContext(UserContext)
  const handleSubmit=(e)=>{
    e.preventDefault()
    const data =new FormData(e.currentTarget)
    resetPassword(data.get('email'))
    
  }
  return (
    <div className='page flex justify-center items-center'>
       <form onSubmit={handleSubmit} className="space-y-6">
        <h3>Jelszó módosítás</h3>
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
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
                    >
                    Új jelszó igénylése
                    </button>
                </div>
                </form>
                {msg && <Toastify {...msg}/>}
    </div>
  )
}