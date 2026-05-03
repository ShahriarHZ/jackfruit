"use client";
import React from 'react';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
const RegisterPage = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {
        const { data, error } = await authClient.signUp.email({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            image: formData.photo,
        }, {
            onSuccess: () => {
                const modal = document.getElementById('registration_success_modal');
                if (modal) {
                    modal.showModal();
                }
            },
            onError: (ctx) => {
                alert(ctx.error.message || "Something went wrong");
            }
        });
    };

    const handleGoogleRegister = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/", 
        });
    };

    return (
        <div className='container mx-auto min-h-[80vh] flex justify-center items-center px-4 my-10'>
            
            <dialog id="registration_success_modal" className="modal">
                <div className="modal-box text-center p-10">
                    <div className="py-4 text-6xl">🎉</div>
                    <h3 className="font-bold text-2xl text-success">Welcome to SunCart!</h3>
                    <p className="py-4 text-gray-600">Your account has been created successfully.</p>
                    <div className="modal-action justify-center">
                        <button 
                            className="btn btn-neutral px-10" 
                            onClick={() => {
                                router.push("/");
                                router.refresh();
                            }}
                        >
                            Start Shopping
                        </button>
                    </div>
                </div>
            </dialog>

            <div className="bg-base-200 border-base-300 rounded-box w-full max-w-md border p-8 shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                    <legend className="fieldset-legend text-2xl font-bold mb-4">Register your account</legend>

                    <label className="label font-semibold text-sm">Your Name</label>
                    <input type="text" placeholder="Full Name" className="input w-full bg-white" {...register("name", { required: true })} />
                    
                    <label className="label font-semibold text-sm mt-2">Photo URL</label>
                    <input type="text" placeholder="https://..." className="input w-full bg-white" {...register("photo")} />

                    <label className="label font-semibold text-sm mt-2">Email Address</label>
                    <input type="email" placeholder="email@example.com" className="input w-full bg-white" {...register("email", { required: true })} />

                    <label className="label font-semibold text-sm mt-2">Password</label>
                    <input type="password" placeholder="Min 6 characters" className="input w-full bg-white" {...register("password", { required: true, minLength: 6 })} />

                    <button type="submit" className="btn btn-neutral w-full mt-6 text-white">Register</button>
                </form>

                <div className="divider">OR</div>

                <button type="button" onClick={handleGoogleRegister} className="btn btn-outline w-full flex items-center gap-2 border-gray-300">
                  <FaGoogle />Continue with Google
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;