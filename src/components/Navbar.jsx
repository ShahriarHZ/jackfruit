"use client";

import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";



const Navbar = () => {

  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();



  const handleLogout = async () => {

    await authClient.signOut({

      fetchOptions: {

        onSuccess: () => {

          router.push("/login");

          router.refresh();

        },

      },

    });

  };



  return (

    <div className="navbar bg-base-100 shadow-sm px-4 md:px-10 h-20">

      <div className="navbar-start">

        <Link href="/" className="flex items-center gap-2">

          <span className="text-2xl">☀️</span>

          <span className="text-2xl font-bold text-orange-600">SunCart</span>

        </Link>

      </div>



      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal px-1 font-semibold space-x-6 text-gray-600">

          <li><Link href="/" className="hover:text-orange-600 transition-colors text-amber-50">Home</Link></li>

          <li><Link href="/products" className="hover:text-orange-600 transition-colors text-amber-50">Products</Link></li>

          <li><Link href="/profile" className="hover:text-orange-600 transition-colors text-amber-50">My Profile</Link></li>

        </ul>

      </div>



      <div className="navbar-end gap-4">

        {isPending ? (

          <span className="loading loading-spinner loading-md"></span>

        ) : session ? (

          <div className="dropdown dropdown-end flex items-center gap-2">

             <span className="font-bold text-base block">{session.user.name}</span>

            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

              <div className="w-10 rounded-full border-2 border-base-300">

                <img

                  alt="User Profile"

                  src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=random`}

                />

              </div>

            </div>

            <ul tabIndex={0} className="mt-70 z-[20] p-4 shadow-xl menu dropdown-content bg-base-100 rounded-box w-64 border border-base-200">

              <li className="mb-2 px-2 pb-2 border-b border-base-100">

                <span className="font-bold text-base block">{session.user.name}</span>

                <span className="text-xs opacity-60 -mt-2">{session.user.email}</span>

              </li>

              <li><Link href="/profile" className="hover:bg-base-200">Profile</Link></li>

              <li><button onClick={handleLogout} className="text-red-500 hover:bg-red-50 mt-2">Log out</button></li>

            </ul>

          </div>

        ) : (

          <div className="flex items-center gap-2">

            <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>

            <Link href="/register" className="btn btn-neutral btn-sm px-4 bg-orange-600 border-none hover:bg-orange-700 text-white">Register</Link>

          </div>

        )}

      </div>

    </div>

  );

};



export default Navbar;