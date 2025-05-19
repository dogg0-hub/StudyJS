import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import { NextRequest } from "next/server";
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

// export async function POST(request) {
//     const body = await request.json();
//     const client = await clientPromise;
//     const db = client.db("users_db");
//     const result = await db
//                 .collection("users")
//                 .insertOne(body);
//     return new Response(JSON.stringify(result),{
//             headers: { "Content-Type" : "application/json"},
//             status : 201,
//         })
// }



export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("users_db");
    const result = await db.collection("users").insertOne(body);
    return NextResponse.json({ message: "User added", id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
