import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // Always include 'https://' for production URLs
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://jackfruit-one.vercel.app" 
});