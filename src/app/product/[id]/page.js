"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { popularProducts } from '@/data/products'; // Import the shared data

export default function ProductDetails() {
  const { id } = useParams();
  
  // Find the product by converting the URL id (string) to a number
  const product = popularProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product not found.</h1>
        <Link href="/" className="text-orange-500 underline">Return Home</Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-8 py-20 bg-gray-300 mt-20">
      <Link href="/" className="text-gray-500 hover:text-orange-500 mb-8 inline-block transition-colors ">
        ← Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2 relative h-[500px] bg-gray-50 rounded-3xl overflow-hidden">
          <Image src={product.image} alt={product.name} fill className="object-cover" priority />
        </div>

        <div className="w-full md:w-1/2">
          <span className="text-[#FF7D52] font-bold uppercase tracking-widest text-sm">{product.category}</span>
          <h1 className="text-5xl font-extrabold text-gray-900 mt-4">{product.name}</h1>
          <p className="text-gray-400 text-xl mt-2">{product.brand}</p>
          
          <div className="flex items-center gap-4 mt-6">
            <span className="text-4xl font-bold text-[#FF7D52]">${product.price}</span>
            <span className="text-gray-400">|</span>
            <span className="text-orange-400 font-bold">★ {product.rating}</span>
          </div>

          <p className="text-gray-600 mt-8 text-lg leading-relaxed">{product.description}</p>

          <div className="mt-10 p-4 bg-orange-50 rounded-xl inline-block border border-orange-100">
            <p className="text-orange-700 font-medium">Only <span className="font-bold">{product.stock}</span> units left!</p>
          </div>

          <button className="w-full mt-10 bg-[#FF7D52] text-white py-4 rounded-xl font-bold text-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}