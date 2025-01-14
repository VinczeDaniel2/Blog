import React from 'react'
import { auth } from '../utility/firebaseApp'
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged,sendPasswordResetEmail,signInWithEmailAndPassword,signOut, updateProfile } from 'firebase/auth'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


export const UserContext=createContext()

export const UserProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [msg,setMsg] = useState({})

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return ()=>unsubscribe()
    },[])

    const signInUser=async(email,password)=>{
        try {
            await signInWithEmailAndPassword(auth,email,password)
            setMsg({})
            setMsg({signin:"Sikeres bejelentkezés!"})
        } catch (error) {
           console.log(error);
           setMsg({err:error.message})
            
        }
    }
    const logOutUser=async ()=>{
        await signOut(auth)
        setMsg({})
    }
    const signUpUser=async (email,password,displayName)=>{
        try {
            await createUserWithEmailAndPassword(auth,email,password)
            await updateProfile(auth.currentUser,{displayName})
            setMsg({})
            setMsg({signup:"Sikeres regisztráció"})
        } catch (error) {
            setMsg({err:error.message})
            
        }
    }
    const resetPassword = async (email)=>{
        try {
            await sendPasswordResetEmail(auth,email)
            setMsg({})
            setMsg({resetPw:"A jelszó visszaállítási email elküldve!"})
        } catch (error) {
            setMsg({err:error.message})
        }
    }
    const updateCredentials= async (displayName,photoURL)=>{
        try {
            if(displayName && photoURL)await updateProfile(auth.currentUser,{displayName,photoURL})
            else if(displayName) await updateProfile(auth.currentUser,{displayName})
            else if(photoURL) await updateProfile(auth.currentUser,{photoURL})
            
            setMsg({})
            setMsg({update:"Sikeres módosítás!"})
        } catch (error) {
            setMsg({err:error.message})
            
        }
    }
    const deleteAccount =async () =>{
        try {
            await deleteUser(auth.currentUser)
            console.log('Sikeres törlés');
            
        } catch (error) {
            console.log(error);
            
        }
    } 
    return(
        <UserContext.Provider value={{user,signInUser,logOutUser,signUpUser,msg,setMsg,resetPassword,updateCredentials,deleteAccount}}>
            {children}
        </UserContext.Provider>
    )
}
