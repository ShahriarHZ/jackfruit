"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";

const Banner = () => {
  const bannerImages = [
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <section className="relative bg-white bg-gradient-to-br from-orange-50/50 via-white to-white px-8 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto rounded-3xl mt-1">
      
      {/* Left Content */}
      <div className="w-full md:w-1/2 z-10 text-left">
        <span className="bg-orange-100 text-[#FF7D52] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Summer Sale 2026
        </span>
        
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mt-6 leading-tight">
          Summer Sale
        </h1>
        
        <h2 className="text-6xl md:text-7xl font-extrabold text-[#FF7D52] mt-2">
          50% OFF
        </h2>
        
        <p className="text-gray-500 mt-6 max-w-md text-lg leading-relaxed">
          Hot Deals 🔥 are here! Explore our exclusive collection of summer essentials and get ready for the beach.
        </p>
        
        <div className="flex gap-4 mt-10">
          <Link 
            href="/shop" 
            className="bg-[#FF7D52] text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
          >
            Shop Now
          </Link>
          <Link 
            href="/trends" 
            className="border border-gray-200 text-gray-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-all"
          >
            Explore Trends
          </Link>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
        <div className="absolute inset-0 bg-orange-200 opacity-20 blur-[100px] rounded-full transform scale-90"></div>
        <div className="absolute inset-0 bg-orange-100 opacity-40 blur-3xl rounded-full transform scale-75"></div>
        
        {/* Container fixed at 400x400 */}
        <div className="relative z-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] transition-all duration-700 ease-in-out">
          <Image 
            key={currentIndex}
            src={bannerImages[currentIndex]} 
            alt="Summer Products" 
            fill // This makes it fill the 400x400 container
            className="object-contain drop-shadow-2xl animate-in fade-in zoom-in duration-700" 
            /* 
               Use 'object-contain' if you want to see the whole item.
               Use 'object-cover' if you want the image to fill the square completely.
            */
            priority 
          />
        </div>
      </div>
      
    </section>
  );
};

export default Banner;