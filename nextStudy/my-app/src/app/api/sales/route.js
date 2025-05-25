import clientPromise from "@/lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const client = await clientPromise;
    const db = client.db("users_db");
    const sales = await db
                .collection("users")
                .find({})
                .limit(1)
                .toArray();
    return NextResponse.json(sales);
}

export async function POST(request) {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("users_db");
    const result = await db
                .collection("users")
                .insertOne(body);
    return new Response(JSON.stringify(result),{
            headers: { "Content-Type" : "application/json"},
            status : 201,
        })
}

export async function DELETE(request, params) {
    const client = await clientPromise;
    const db = client.db("users_db");
    const idUser = params.id;
    const result = await db
                  .collection("users")
                  .deleteOne({_id : idUser});
    return new Response(JSON.stringify(result),{
            headers: { "Content-Type" : "application/json"},
            status : 200,
        })
}