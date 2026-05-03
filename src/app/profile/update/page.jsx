"use client";
import React, { useState, useEffect, useRef } from 'react';
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSave, FaCamera } from 'react-icons/fa';

const UpdateProfilePage = () => {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const { data: session, isPending } = authClient.useSession();
    
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setImage(session.user.image || "");
        }
    }, [session]);

    // Function to handle Image Upload to ImgBB (Free & Easy)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Show a local preview immediately
    const localUrl = URL.createObjectURL(file);
    setImage(localUrl); 

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
        // Use your actual key from https://api.imgbb.com/
        const response = await fetch(`https://api.imgbb.com/1/upload?key=fa22667833df35189880c11fc476387a`, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        
        if (data.success) {
            // 2. Replace local preview with the real permanent URL
            setImage(data.data.url); 
            console.log("Upload Success:", data.data.url);
        } else {
            throw new Error("Upload failed");
        }
    } catch (error) {
        console.error("ImageBB Error:", error);
        alert("Upload failed. Try again.");
    } finally {
        setUploading(false);
    }
};

 const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const { data, error } = await authClient.user.update({
            name: name,
            image: image, // This is the ImgBB URL you generated
        });

        if (error) {
            // Use logical OR to catch cases where message might be missing
            alert(`Update Failed: ${error.message || "Server Error"}`);
            console.log("Detailed Error:", error);
        } else {
            alert("Profile updated successfully!");
            router.refresh();
            router.push("/profile");
        }
    } catch (err) {
        alert("Check your internet or server connection.");
    } finally {
        setLoading(false);
    }
};
    if (isPending) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-ring loading-lg text-orange-600"></span></div>;

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-xl mx-auto px-4">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-orange-600 mb-6 group">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Profile</span>
                </button>

                <div className="card bg-white shadow-sm border border-gray-100 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Update Profile</h1>
                        <p className="text-gray-500 text-sm mt-1">Click the image to change your photo</p>
                    </div>

                    <div className="flex flex-col items-center mb-8">
                        {/* Hidden File Input */}
                        <input 
                            type="file" 
                            hidden 
                            ref={fileInputRef} 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                        
                        {/* Clickable Image Preview */}
                        <div 
                            onClick={() => fileInputRef.current.click()} 
                            className="relative group cursor-pointer"
                        >
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-50 shadow-md bg-gray-100 flex items-center justify-center">
                                {uploading ? (
                                    <span className="loading loading-spinner text-orange-600"></span>
                                ) : image ? (
                                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl font-bold text-gray-300">{name?.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <FaCamera className="text-white text-2xl" />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold text-gray-700">Full Name</span></label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full focus:border-orange-500"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold text-gray-700">Direct Avatar URL</span></label>
                            <input 
                                type="text" 
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="input input-bordered w-full text-xs text-gray-400"
                                placeholder="Uploaded image URL will appear here..."
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading || uploading}
                            className="btn bg-[#FF7D52] hover:bg-orange-600 border-none text-white w-full mt-4 h-12 rounded-xl flex items-center gap-2 transition-all active:scale-95"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : <><FaSave /> Update Information</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfilePage;