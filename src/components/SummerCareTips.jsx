import React from 'react';

const SummerCareTips = () => {
  const tips = [
    {
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water a day to keep your skin glowing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7D52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
      )
    },
    {
      title: "Sun Protection",
      description: "Apply SPF 50+ sunscreen every 2 hours when outdoors.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7D52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      )
    },
    {
      title: "Breezy Outfits",
      description: "Choose linen and cotton fabrics to stay cool in the heat.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7D52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>
      )
    }
  ];

  return (
    <section className="bg-[#FFF8F6] py-20 px-8 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Summer Care Tips</h2>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto text-lg">
          Stay fresh and protected all summer long with our expert tips.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white p-10 rounded-3xl shadow-sm flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                {tip.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{tip.title}</h3>
              <p className="text-gray-500 leading-relaxed text-center">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummerCareTips;