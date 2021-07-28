import React, {useState,useEffect} from 'react'
import {auth} from '../firebase'
export const AuthContext = React.createContext();

function AuthProvider({children}) {
    const [currUser,setCurrentUser]=useState();
    const [loading,setLoading]=useState(true);
    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout(email,password){
        return auth.signOut();
    }
    useEffect(()=>{
        const unsubscribe  = auth.onAuthStateChanged((user)=>{
            //ye onAuthStateChanged ek observer h jo humne user par laga diya ye dekhne k liye ki user login,logout,singnup.... h ya nahi
            setCurrentUser(user);
            // console.log(user);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[])
    const value={
        currUser,
        login,
        signup,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading&&children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

