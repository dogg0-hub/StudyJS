import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import { NextResponse,NextRequest } from "next/server";

export async function GET() {
    const client = await clientPromise;
    const db = client.db("users_db");
    const user = await db
                .collection("users")
                .find({})
                .limit(1)
                .toArray();
    return NextResponse.json(user);
}

export async function POST(request) {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("users_db");
    const userDb = db.collection("users")
    //await userDb.createIndex({id:1},{unique:true})
    
    const user= {
        "id": body.id,
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
}

export async function DELETE(request) {
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
}

export async function PUT(request) {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("users_db");
    const idUser = Number(body.id);

    if(idUser == body.id){
        const user= {
        "id": body.id,
        "name":body.name,
        "password":body.password,
        "description":body.description,
    }
        const result = await db
                  .collection("users")
                  .updateOne({id: idUser},user);
    }
    return new Response(JSON.stringify(result),{
            headers: { "Content-Type" : "application/json"},
            status : 200,
        })
}