"use client";
import React, { useState, useEffect } from 'react';
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    
    // State to hold dynamic stats
    const [stats, setStats] = useState({
        orders: 0,
        wishlist: 0,
        reviews: 0
    });

    // Fetch dynamic data from MongoDB
    useEffect(() => {
        const fetchUserStats = async () => {
            if (session?.user?.id) {
                try {
                    // This API route will count documents in your MongoDB collections
                    const response = await fetch(`/api/user/stats?userId=${session.user.id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStats({
                            orders: data.totalOrders || 0,
                            wishlist: data.totalWishlist || 0,
                            reviews: data.totalReviews || 0
                        });
                    }
                } catch (error) {
                    console.error("Failed to fetch profile stats:", error);
                }
            }
        };

        fetchUserStats();
    }, [session]);

    // Redirect to login if not authenticated
    if (!isPending && !session) {
        router.push("/login");
        return null;
    }

    if (isPending) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-ring loading-lg text-orange-600"></span>
            </div>
        );
    }

    const { user } = session;
    const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="container mx-auto px-4 pt-10">
                <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                    
                    {/* Left Sidebar Card */}
                    <div className="card bg-white w-full md:w-80 shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
                        <div className="avatar placeholder mb-4">
                            <div className="bg-blue-50 text-blue-600 rounded-full w-32 border-4 border-white shadow-sm">
                                {user.image ? (
                                    <img src={user.image} alt={user.name} />
                                ) : (
                                    <span className="text-4xl font-bold">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                        <div className="badge badge-ghost gap-2 my-2 py-3 px-4 text-gray-500">
                            <span className="text-orange-400">🛡️</span> User
                        </div>
                        <button 
    onClick={() => router.push("/profile/update")} 
    className="btn btn-warning btn-sm mt-4 text-white w-full flex gap-2"
>
    📝 Update Information
</button>
                    </div>

                    {/* Right Details Card */}
                    <div className="card bg-white flex-1 shadow-sm border border-gray-100 p-8 max-w-2xl">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Account Details</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">👤 Full Name</p>
                                <p className="font-semibold text-gray-700">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">✉️ Email Address</p>
                                <p className="font-semibold text-gray-700">{user.email}</p>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-gray-100 pt-6">
                            <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">📅 Member Since</p>
                            <p className="font-semibold text-gray-700">{joinDate}</p>
                        </div>

                        {/* Updated Shopping Stats Section */}
                        <div className="mt-10">
                            <h3 className="font-bold text-gray-800 mb-4">Summer Shopping Stats</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-blue-50/50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-bold text-orange-600">{stats.orders}</p>
                                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Orders</p>
                                </div>
                                <div className="bg-orange-50/50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-bold text-orange-600">{stats.wishlist}</p>
                                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Wishlist</p>
                                </div>
                                <div className="bg-gray-100/50 p-4 rounded-xl text-center">
                                    <p className="text-2xl font-bold text-orange-600">{stats.reviews}</p>
                                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;