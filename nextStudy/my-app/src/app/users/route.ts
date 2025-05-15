import { User } from "../../types";
import data from "./data.json"
import fs from "fs"
import path from "path";

export async function GET() {
    return new Response(JSON.stringify(data))
}

export async function POST (request :Request) {
    try{
        const user = await request.json();
        const filePath = path.join(process.cwd(),"src/app/users/data.json")
        const newUser = {
            id:data.length + 1,
            name:user.name,
            password:user.password,
            description:user.description
        }
        fs.writeFileSync(filePath,JSON.stringify([...data,newUser],null,2));

        return new Response(JSON.stringify(newUser),{
            headers: { "Content-Type" : "application/json"},
            status : 201,
        })
    }catch(error){

    }//try-catch でエラーハンドリングしていく
    
}