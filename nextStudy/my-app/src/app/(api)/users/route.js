import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import { NextResponse,NextRequest } from "next/server";
import { UserSchemaForPost,UserSchemaForPut } from "@/lib/valide";

export async function GET() {
    const client = await clientPromise;
    const db = client.db("users_db");
    const user = await db
                .collection("users")
                .find({})
                .limit(5)
                .toArray();
    return NextResponse.json(user);
}

            //  id : z.number()
            //     .min(1,"idを入力してください"),
            // name : string()
            //        min(1,"名前を入力してください")
            //         .max(30,"名前は30文字以内です"),
            // password : z.string()
            //             .min(8,"パスワードは8文字以上必要です")
            //             .max(30,"パスワードは30文字以内です"),
            // description : z.string()
            //             .max(100,"説明は30文字以内です")
            //             .optional(),

export async function POST(request) {
    try{
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("users_db");
        const userDb = db.collection("users");
        const findId = await db
                    .collection("users")
                    .countDocuments()
        const validationCheck = UserSchemaForPost.safeParse(body);

        if(!validationCheck.success){
            return new Response(JSON.stringify({
                error : "バリデーションエラー",
                issues : validationCheck.error.errors[0]?.message,
            }),{
            headers: { "Content-Type" : "application/json"},
            status : 400,
            });
        }

        const user= {
            "id": findId + 1,
            "name":body.name,
            "password":body.password,
            "description":body.description,
        }
        const result = await db
                    .collection("users")
                    .insertOne(user);
        return new Response(JSON.stringify(result),{
                headers: { "Content-Type" : "application/json"},
                status : 201,
            })

    }catch(error){
        return new Response("予期しないエラーが発生しました", { status : 500});
    }
    
}

export async function PUT(request) {
    try{
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("users_db");
        const idUserJSON = Number(body.id);
        const isIdSame = await db
                        .collection("users")
                        .findOne({id : idUserJSON});

        const validationCheck = UserSchemaForPut.safeParse(body);

        if(!validationCheck.success){
            return new Response(JSON.stringify({
                error : "バリデーションエラー",
                issues : validationCheck.error.errors[0]?.message,
            }),{
            headers: { "Content-Type" : "application/json"},
            status : 400,
            });
        }

        if(isIdSame){
            const user= {
            "id": body.id,
            "name": body.name ?? isIdSame.name,
            "password":body.password ?? isIdSame.password,
            "description": body.description ?? isIdSame.description,
        }
            const result = await db
                    .collection("users")
                    .updateOne(
                        {id: idUserJSON},
                        {$set : user},
                    )

            return new Response(JSON.stringify(result),{
            headers: { "Content-Type" : "application/json"},
            status : 200,
            })
        }
    }catch(error){
        return new Response("予期しないエラーが発生しました", { status : 500});
    }
}   


export async function DELETE(request) {
    try{
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("users_db");
        const idUser = Number(body.id);
        const result = await db
                    .collection("users")
                    .deleteOne({id : idUser});
        return new Response(JSON.stringify(result),{
                headers: { "Content-Type" : "application/json"},
                status : 200,
            })
    }catch(error){
        return new Response("削除できませんでした", { status : 500});
    }
}