"use client";
import React from 'react';
import { FaSearch, FaStar } from 'react-icons/fa';
import { authClient } from "@/lib/auth-client"; // Import auth client
import { useRouter } from "next/navigation"; // Import router

// Your actual product data
export const popularProducts = [
  {
    id: 1,
    name: "UV Protection Sunglasses",
    brand: "SunShade",
    price: 15,
    rating: 4.7,
    category: "Accessories",
    stock: 12,
    description: "High-quality polarized lenses that provide 100% protection against harmful UVA/UVB rays.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500"
  },
  {
    id: 2,
    name: "Summer Floral Dress",
    brand: "OceanBreeze",
    price: 45,
    rating: 4.9,
    category: "Outfits",
    stock: 5,
    description: "Breathable cotton fabric with a vibrant floral print. Perfect for beach parties.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=500"
  },
  {
    id: 3,
    name: "SPF 50+ Sunscreen",
    brand: "GlowCare",
    price: 22,
    rating: 4.8,
    category: "Skincare",
    stock: 25,
    description: "Non-greasy, water-resistant formula that protects your skin.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=500"
  },
  {
    id: 4,
    name: "Wide Brim Straw Hat",
    brand: "TropicVibe",
    price: 30,
    rating: 4.6,
    category: "Accessories",
    stock: 8,
    description: "Hand-woven natural straw hat with a wide brim.",
    image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?q=80&w=500"
  },
  {
    id: 5,
    name: "Ocean Blue Swimwear",
    brand: "WaveForms",
    price: 55,
    rating: 4.7,
    category: "Outfits",
    stock: 10,
    description: "Quick-dry fabric with a comfortable stretch fit.",
    image: "https://i.ibb.co.com/sDYJ8F2/images.jpg"
  },
  {
    id: 6,
    name: "After-Sun Aloe Gel",
    brand: "CoolDown",
    price: 18,
    rating: 4.9,
    category: "Skincare",
    stock: 15,
    description: "Pure aloe vera extract to soothe and cool sun-exposed skin.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500"
  }
];

const ProductsPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  // Logic to handle Add to Cart
  const addToCart = async (productId) => {
    if (!session) {
      alert("Please login first to add items to your cart.");
      return router.push("/login");
    }

    try {
      const res = await fetch("/api/orders/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
      });

      if (res.ok) {
        // This triggers a data refresh for the Navbar and Profile
        router.refresh(); 
        alert("Added to cart! Your profile has been updated.");
      } else {
        const err = await res.json();
        alert(err.message || "Failed to add to cart.");
      }
    } catch (error) {
      console.error("Cart Error:", error);
      alert("Something went wrong. Check your terminal.");
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-8 pt-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Summer Collection</h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore our wide range of summer essentials. From skincare to outfits, we have everything you need for the perfect sun-soaked adventure.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-16">
          <input
            type="text"
            placeholder="Search products or categories..."
            className="w-full px-12 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-[#FF7D52] text-gray-900 transition-all"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {popularProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 right-4 bg-[#FF7D52] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {product.category}
                </span>
              </div>

              <div className="p-6 text-left flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-3 font-medium">{product.brand}</p>
                
                <div className="flex items-center gap-1 mb-4">
                   <FaStar className="text-orange-400" size={14} />
                   <span className="text-gray-600 font-bold text-sm">{product.rating}</span>
                   <span className="text-gray-400 text-xs ml-2">({product.stock} in stock)</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="text-3xl font-bold text-[#FF7D52]">${product.price}</span>
                  {/* Updated Button to call addToCart */}
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="bg-[#FF7D52] hover:bg-orange-600 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;