"use client";
import { useState } from "react";
import Banner from "@/components/Banner";
import ProductGrid from "@/components/ProductGrid";
import { popularProducts } from "@/data/products"; // Centralized data source
import SummerCareTips from "@/components/SummerCareTips";
import TopBrands from "@/components/TopBrands";

export default function Home() {
  // State to toggle between showing 3 or all products
  const [showAll, setShowAll] = useState(false);

  // Logic to determine which products to pass to the grid
  const displayedProducts = showAll ? popularProducts : popularProducts.slice(0, 3);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <Banner />

      {/* Popular Products Section */}
      <section className="px-8 py-16 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Popular Products
            </h2>
            <p className="text-gray-500 mt-2 text-lg">
              Top picks for your summer adventures
            </p>
          </div>

          {/* Toggle Button */}
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-gray-600 font-bold hover:text-orange-500 transition-colors flex items-center gap-2 group"
          >
            {showAll ? "Show Less" : "View All"}
            <svg 
              className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Reusable Grid Component */}
        <ProductGrid products={displayedProducts} />
      </section>
      <SummerCareTips></SummerCareTips>
      <TopBrands></TopBrands>
    </main>
  );
}