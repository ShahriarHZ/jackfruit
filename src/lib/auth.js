import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Validate environment variables
if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from your .env.local file");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(); 

export const auth = betterAuth({
    database: mongodbAdapter(db),
    
    // Set the Base URL to match your current port (3001)
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3002",
    
    basePath: "/api/auth",

    socialProviders: { 
        google: { 
            // Removed "as string" here
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },

    emailAndPassword: {  
        enabled: true
    },

    user: {
        changeEmail: {
            enabled: true, 
        }
    }
});