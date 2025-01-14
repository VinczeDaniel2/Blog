import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';

export const Toastify = ({err,signin,signup,resetPw,update}) => {
    const {setMsg} = useContext(UserContext)
    const navigate=useNavigate()
    useEffect(()=>{
        if(err){
            toast.error(err,{position:"top-left"})
        }else if(signin){
            toast.success(signin, {position:"top-center"})
            setTimeout(()=>navigate('/'),2000)
        }else if(resetPw){
            toast.success(resetPw,{position:"top-center"})
            setTimeout(()=>navigate('/auth/in'),2000)
        }else if(update){
            toast.success(update,{position:"top-center"})
        }
        setMsg({})
    },[err,signin,signup,resetPw,update])

  return (
    <div>
        <ToastContainer />
    </div>
  )
}