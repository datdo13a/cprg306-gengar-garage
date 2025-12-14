"use client";

import { useUserAuth } from "../../_utils/auth-context";
import { useState } from "react";
import { createUserCollection } from "../../lib/api";

export default function CollectionPage(){
    const { user } = useUserAuth();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");

    async function handleCreate(){
        if(!user) return setStatus("Sign in first");
        setStatus("Creating...");
        try{
            const id = await createUserCollection(user.uid, { name, createdAt: new Date().toISOString() });
            setStatus(`Created collection id: ${id}`);
            setName("");
        }catch(err){
            setStatus("Error: " + err.message);
        }
    }

    return (
        <main>
            <p>{user ? `User id: ${user.uid}` : "Not signed in"}</p>
            <div style={{marginTop:12}}>
                <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="collection name" />
                <button onClick={handleCreate} style={{marginLeft:8}}>Create collection</button>
            </div>
            <p style={{marginTop:8}}>{status}</p>
        </main>
    );
}