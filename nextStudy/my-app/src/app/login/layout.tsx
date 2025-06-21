'use client'
import AuthProvider from "@/components/AuthProvider";
import { SessionProvider } from "next-auth/react";

export default function Loginlayout({
    children,
}:{
    children:React.ReactNode;
    }){
    return(
        <SessionProvider>
            {children}
        </SessionProvider >
        
    )
}