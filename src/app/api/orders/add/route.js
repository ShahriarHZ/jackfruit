import { auth } from "@/lib/auth"; // Your Better Auth server config
import { MongoClient } from "mongodb";

export async function POST(req) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return new Response("Unauthorized", { status: 401 });

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    // Insert the "order" or "cart item"
    await db.collection("orders").insertOne({
        userId: session.user.id,
        productId: (await req.json()).productId,
        createdAt: new Date()
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}