import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
        >
          {/* Image Section */}
          <div className="relative h-64 w-full bg-gray-50">
            {/* Category Badge */}
            <span className="absolute top-3 right-3 z-10 bg-[#FF7D52] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase">
              {product.category}
            </span>
            <div className="relative h-64 w-full bg-gray-50">
  <Image 
    src={product.image} 
    alt={product.name}
    fill
    className="object-cover"
  />
</div>
          </div>

          {/* Details Section */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{product.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{product.brand}</p>
            
            {/* Stars */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={i < Math.floor(product.rating) ? "text-orange-400" : "text-gray-200"}
                >
                  ★
                </span>
              ))}
              <span className="text-gray-400 text-xs ml-1 font-medium">{product.rating}</span>
            </div>

            {/* Price & Action */}
            <div className="mt-auto flex justify-between items-center">
              <span className="text-2xl font-bold text-[#FF7D52]">${product.price}</span>
             <Link href={`/product/${product.id}`}>
  <button className="bg-[#FF7D52] text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm">
    View Details
  </button>
</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;