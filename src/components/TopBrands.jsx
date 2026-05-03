import React from 'react';

const TopBrands = () => {
  const brands = [
    { name: "SunShade", icon: "🕶️" },
    { name: "OceanBreeze", icon: "🌊" },
    { name: "GlowCare", icon: "✨" },
    { name: "SurfMaster", icon: "🏄" }
  ];

  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-16 tracking-tight">Top Brands</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {brands.map((brand, index) => (
          <div key={index} className="border border-gray-100 rounded-2xl py-12 flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer hover:border-orange-600 hover:bg-orange-50/30">
            <span className="text-4xl mb-4 opacity-70">{brand.icon}</span>
            <span className="text-gray-600 font-bold text-lg">{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopBrands;