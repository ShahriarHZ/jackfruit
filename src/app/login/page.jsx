"use client";

import React from 'react';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
                // If you want "Remember Me" functionality:
                rememberMe: formData.rememberMe || true,
                callbackURL: "/", // Redirects here after successful login
            });

            if (error) {
                // Better Auth handles invalid credentials by returning an error object
                console.error("Login Error:", error.message);
                alert(error.message || "Invalid email or password");
                return;
            }

            console.log("Login Successful:", data);
            
            // Redirect user to home or dashboard
            router.push("/");
            router.refresh(); // Refresh to update server-side auth state
            
        } catch (err) {
            console.error("An unexpected error occurred:", err);
            alert("Connection error. Is your server running?");
        }
    };

    return (
        <div className='container mx-auto min-h-[80vh] flex justify-center items-center px-4 my-10'>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-8 shadow-lg"
            >
                <legend className="fieldset-legend text-2xl font-bold mb-4">Login to your account</legend>

                {/* Email Field */}
                <label className="label font-semibold">Email address</label>
                <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className={`input w-full bg-white ${errors.email ? 'border-red-500' : ''}`}
                    {...register("email", { required: "Email is required" })} 
                />
                {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}

                {/* Password Field */}
                <label className="label font-semibold mt-2">Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    className={`input w-full bg-white ${errors.password ? 'border-red-500' : ''}`}
                    {...register("password", { 
                        required: "Password is required",
                    })} 
                />
                {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}

                {/* Remember Me Checkbox */}
                <div className="flex items-center mt-4 gap-2">
                    <input 
                        type="checkbox" 
                        className="checkbox checkbox-sm" 
                        {...register("rememberMe")} 
                    />
                    <span className="text-sm">Remember me</span>
                </div>

                <button type="submit" className="btn btn-neutral w-full mt-6 text-white">Login</button>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Dont have an account?{" "}
                    <Link href="/register" className="text-red-500 font-semibold hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;