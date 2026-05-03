import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // This ensures the client knows to look in /api/auth 
    // even if your folder is named [...all]
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002" 
});