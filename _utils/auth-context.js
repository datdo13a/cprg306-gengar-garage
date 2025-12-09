"use client";

import {GithubAuthProvider, onAuthStateChanged,signInWithPopup, signOut} from "firebase/auth"
import {createContext, useContext, useEffect, useState} from "react";
import {auth} from "./firebase"

const AuthContext = createContext();

export function AuthContextProvider({children}){ //entirely used for user sign in function

    const [user, setUser] = useState(null)

    function gitHubSignIn(){
        const provider = new GithubAuthProvider();
        return signInWithPopup(auth, provider); //gets from the firebase.js ^ imported
    }

    function firebaseSignOut(){
        return signOut(auth);
    }

    useEffect (()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        });
        return () => unsubscribe();
    },[user]);
    return(
        <AuthContext.Provider value={{user, gitHubSignIn, firebaseSignOut}} >
            {children}
        </AuthContext.Provider>
    );
}

export function useUserAuth(){
    return useContext(AuthContext);
}