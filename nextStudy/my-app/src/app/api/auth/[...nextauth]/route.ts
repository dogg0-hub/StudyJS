import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options : NextAuthOptions = {
    debug: true,
    session: { strategy:"jwt"},
    providers:[
        CredentialsProvider({
            name:"編集者",
            credentials:{
                    username:{
                        label:"ユーザ名",type:"text",placeholder:"ユーザ名を入力してください"
                    },password:{
                        label:"パスワード",type:"password",placeholder:"パスワードを入力してください"
                    },
                },
            //パスワードチェックはここ
                async authorize(credentials,req){
                const user = {id: "1", name: "なまえ"}
                    
                if(credentials?.username==="testUser" && credentials.password ==="test"){
                    return user
                }else{
                    return null
                }
            }
        })
    ],
    callbacks:{
        jwt({token, user}){
            if(user){
                token={
                    ...token,
                    id: user.id,
                    name: user.name,
                }
            }
            return token;
        },
        session({session, token}){

            session.user = {
                id: token.id as string,
                name: token.name as string,
            }
            return session;
        }
    },
}

const handler = NextAuth(options)
export{ handler as GET, handler as POST};