import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F8FAFC] pt-20 pb-10 border-t border-gray-100 mt-[-40]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#FF7D52]">SunCart</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">
              Your ultimate destination for premium summer essentials. Stay cool, stay stylish.
            </p>
            <div className="flex gap-3 mt-2">
              <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-white hover:bg-[#FF7D52] hover:border-[#FF7D52] cursor-pointer transition-all text-gray-400">
                <FaFacebookF size={14} />
              </div>
              <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-white hover:bg-[#FF7D52] hover:border-[#FF7D52] cursor-pointer transition-all text-gray-400">
                <FaTwitter size={14} />
              </div>
              <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-white hover:bg-[#FF7D52] hover:border-[#FF7D52] cursor-pointer transition-all text-gray-400">
                <FaInstagram size={14} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-4 text-gray-500 text-sm">
              <li><Link href="/" className="hover:text-[#FF7D52] transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-[#FF7D52] transition-colors">Products</Link></li>
              <li><Link href="/profile" className="hover:text-[#FF7D52] transition-colors">My Profile</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Contact Info</h3>
            <ul className="flex flex-col gap-4 text-gray-500 text-sm">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#FF7D52]" /> info@suncart.com
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#FF7D52]" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#FF7D52]" /> 123 Beach Ave, Sunshine City
              </li>
            </ul>
          </div>

          {/* Privacy Policy */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Privacy Policy</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              We care about your privacy. Read our policy to learn more.
            </p>
            <Link href="/privacy" className="text-[#FF7D52] font-semibold text-sm hover:underline">
              Privacy Policy & Terms
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-200 text-center text-gray-400 text-xs md:text-sm">
          © 2026 SunCart – Summer Essentials Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;