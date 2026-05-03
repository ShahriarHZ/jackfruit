import { MongoClient } from "mongodb";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return new Response(JSON.stringify({ error: "User ID required" }), { status: 400 });
    }

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        const db = client.db();

        // Count documents for this specific user
        const totalOrders = await db.collection("orders").countDocuments({ userId: userId });
        
        // You can add logic for these later if you have these collections
        const totalWishlist = await db.collection("wishlist").countDocuments({ userId: userId }) || 0;
        const totalReviews = await db.collection("reviews").countDocuments({ userId: userId }) || 0;

        return new Response(JSON.stringify({
            totalOrders,
            totalWishlist,
            totalReviews
        }), { status: 200 });

    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    } finally {
        await client.close();
    }
}