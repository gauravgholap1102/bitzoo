import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Coffee, ShieldCheck, Star } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#0D0D0D] relative border-t border-white/10 overflow-hidden scroll-mt-20">
      
      {/* Glow shapes */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#F0445A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F4D52E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Cafe Shop Front Photography */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl group">
              <img
                src={CAFE_INFO.images.shopFront}
                alt="Bitezzo Shop Signboard and Cafe Frontage"
                className="w-full h-[380px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-[#F0445A] text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  Actual Bitezzo Storefront
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 font-heading">
                  Bitezzo Main Branch
                </h3>
                <p className="text-sm text-gray-300">
                  "Good Food → Good Mood → Good Vibes → Repeat"
                </p>
              </div>
            </div>

            {/* Thumbnail mini gallery */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl overflow-hidden h-24 border border-white/10">
                <img
                  src={CAFE_INFO.images.screenshot1}
                  alt="Bitezzo Sandwiches & Momos"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-24 border border-white/10">
                <img
                  src={CAFE_INFO.images.menu1}
                  alt="Bitezzo Menu Card"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-24 border border-white/10">
                <img
                  src={CAFE_INFO.images.screenshot2}
                  alt="Bitezzo Kurkure Dumplings"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4D52E]/10 border border-[#F4D52E]/30 text-[#F4D52E] text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Our Story &amp; Vibe</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight font-heading">
              About <span className="text-[#F0445A]">Bitezzo</span> Foods &amp; Beverage
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed font-normal">
              <strong>Bitezzo Foods &amp; Beverage</strong> is a casual food and beverage destination focused on delicious food, refreshing drinks and great vibes.
            </p>

            <p className="text-base text-gray-400 leading-relaxed">
              From signature crispy Kurkure Momos and gourmet Cheeseburgers to thick cold coffee and sizzling chocolate brownies, every single order is crafted with fresh ingredients and vibrant seasonings to uplift your mood.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="bg-[#151515] p-4 rounded-2xl border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#F4D52E] font-bold text-sm">
                  <Heart className="w-4 h-4 fill-[#F4D52E]" />
                  <span>Fresh Ingredients</span>
                </div>
                <p className="text-xs text-gray-400">Made hot &amp; fresh right when you place your order.</p>
              </div>

              <div className="bg-[#151515] p-4 rounded-2xl border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[#F0445A] font-bold text-sm">
                  <Coffee className="w-4 h-4" />
                  <span>Great Vibes</span>
                </div>
                <p className="text-xs text-gray-400">Casual atmosphere perfect for friends &amp; family hangout.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F0445A]/20 to-[#F4D52E]/20 border border-[#F0445A]/40 flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-gray-300 uppercase tracking-widest">Brand Tagline</p>
                <p className="text-xl font-black text-white font-heading">"Good Foods, Great Vibes"</p>
              </div>
              <span className="text-3xl">✨</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
