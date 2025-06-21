'use client'
import {useSession, signIn, signOut } from "next-auth/react"

export default function Login(props:any){
    const { data } = useSession();
    if(data){
        console.log(data);
        return(
            <>
            ログインしています。<br/>
            <button onClick={(()=>signOut())}>ログアウト</button>
            </>
        )
    }
    return(
        <>
        ログインしていません。<br />
        <button onClick={()=> signIn()}>ログイン</button>
        </> 
    )
}