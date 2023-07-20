import React, { useState } from 'react'
import { auth ,googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword ,signInWithPopup ,signOut} from 'firebase/auth'
export default function Auth() {
    const [email,setEmail] = useState("");
    const [password , setPassword] = useState("");

    console.log(auth?.currentUser?.email)
    
    const signIn = async () =>{
        try {
            await createUserWithEmailAndPassword(auth, email, password)    
        } catch (error) {
            console.error(error)
        }  
    };
    const signInWithGoogle = async () =>{
        try {
            await signInWithPopup(auth, googleProvider)    
        } catch (error) {
            console.error(error)
        }  
    };
    const logout = async () =>{
        try {
            await signOut(auth)    
        } catch (error) {
            console.error(error)
        }  
    };
  return (
    <div>
        
        <input type="email"  placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={signIn}>Sign IN</button>
        
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        <button onClick={logout}>Logout</button>
    </div>
  )
}
