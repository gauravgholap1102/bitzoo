import React from 'react';
import { Phone, ArrowUp, Heart } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import BitezzoLogo from './BitezzoLogo';
import { CAFE_INFO } from '../data/menuData';

export default function Footer({ onNavClick, onCategoryClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0D0D] border-t border-white/10 text-gray-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Logo & Brand Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <BitezzoLogo size="lg" light />
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Bitezzo Foods &amp; Beverage is dedicated to bringing you top-tier flavors, freshly prepared momos, crispy burgers, and ice cold beverages with great vibes.
            </p>
            <div className="p-3 bg-[#151515] rounded-xl border border-white/10 inline-block text-xs font-bold text-[#F4D52E]">
              "Good Foods, Great Vibes"
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-base font-heading">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-[#F0445A] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('menu')} className="hover:text-[#F0445A] transition-colors">
                  Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-[#F0445A] transition-colors">
                  About Bitezzo
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('contact')} className="hover:text-[#F0445A] transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-base font-heading">Main Categories</h4>
            <ul className="space-y-2 text-sm">
              {CAFE_INFO.mainCategories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onCategoryClick(cat.toLowerCase())}
                    className="hover:text-[#F4D52E] transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-base font-heading">Contact Bitezzo</h4>
            <div className="space-y-2 text-sm">
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="flex items-center gap-2 text-white font-bold hover:text-[#F0445A] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F4D52E]" />
                <span>{CAFE_INFO.phone}</span>
              </a>

              <a
                href={CAFE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white font-bold hover:text-[#F0445A] transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#F4D52E]" />
                <span>{CAFE_INFO.instagram}</span>
              </a>

              <p className="text-xs text-gray-500 pt-2">
                Main Branch — Bitezzo Foods &amp; Beverage
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Bitezzo Foods &amp; Beverage. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-[#151515] text-gray-300 hover:text-white hover:bg-[#F0445A] border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
