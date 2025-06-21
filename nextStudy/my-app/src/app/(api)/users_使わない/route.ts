import { json } from "stream/consumers";
import { User } from "../../../types";
import data from "./data.json"
import fs from "fs"
import path from "path";
import { NextRequest } from "next/server";


export async function GET() {
    return new Response(JSON.stringify(data));
}

export async function POST (request :Request) {
    try{
        const user = await request.json();
        const filePath = path.join(process.cwd(),"src/app/users/data.json");
        const newUser : User = {
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
        if(error instanceof SyntaxError){
            return new Response("書き方がおかしいです",{ status: 400});
        }if(error instanceof TypeError){
            return new Response("その型は入れられないです",{ status: 500});
        }
        return new Response("予期しないエラーが発生しました", { status : 500});
    }
    
}

export async function PATCH(request:Request) {
    const user : User = await request.json();
    const filePath = path.join(process.cwd(),"src/app/users/data.json");
    var arrayData = fs.readFileSync(filePath, "utf-8");
    var arrayContents = JSON.parse(arrayData);
    console.log(arrayContents);

    const index = arrayContents.findIndex((u:User) => u.id === user.id);
    if(index === -1){
        return new Response("ユーザーがいません",{ status:404 });
    }
    arrayContents[index] = {
        id:user.id,
        name:user.name,
        password:user.password,
        description:user.description,
    };
    fs.writeFileSync(filePath, JSON.stringify(arrayContents,null,2 ));
    return new Response(JSON.stringify(arrayContents[index]),{
        headers: { "Content-Type" : "application/json"},
        status : 200,
    })
}

export async function DELETE(request:Request) {
    const user = await request.json();
    const filePath = path.join(process.cwd(),"src/app/users/data.json");
    var arrayData = fs.readFileSync(filePath, "utf-8");
    var arrayContents = JSON.parse(arrayData);

    const index = arrayContents.findIndex((u:User) => u.id === user.id);
    arrayContents.splice(index,1);
    fs.writeFileSync(filePath,JSON.stringify(arrayContents,null,2));
}