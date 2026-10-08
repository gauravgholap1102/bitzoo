import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Flame, ShoppingBag } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export default function Hero({ onOrderNow, onExploreMenu }) {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#151515]">
      {/* Background Glows & Shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F0445A]/20 to-[#F4D52E]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#F0445A]/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Decorative Grid texture */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#F4D52E]/30 text-[#F4D52E] text-xs sm:text-sm font-semibold tracking-wide shadow-inner"
            >
              <Sparkles className="w-4 h-4 text-[#F4D52E] animate-pulse" />
              <span>Freshly Prepared • Delicious • Made With Love</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight font-heading">
                GOOD FOODS.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F0445A] via-[#F4D52E] to-[#F0445A]">
                  GREAT VIBES.
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Craving something delicious? Order your favourite Momos, Burgers, Crispy Sandwiches, and Thick Cold Coffee directly from <strong className="text-white font-semibold">Bitezzo</strong>.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Flame className="w-4 h-4 text-[#F0445A]" />
                <span>Original Bitezzo Recipe</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Star className="w-4 h-4 text-[#F4D52E] fill-[#F4D52E]" />
                <span>4.9 ★ Customer Rating</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#F0445A] to-[#D9354B] text-white font-bold text-lg shadow-xl shadow-[#F0445A]/30 hover:shadow-[#F0445A]/50 hover:scale-105 transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#F4D52E]" />
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-lg border border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Menu</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Food Collage */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              
              {/* Outer Decorative Glow Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F4D52E]/20 animate-[spin_60s_linear_infinite]" />

              {/* Main Center Image Card - Bitezzo Kurkure Momos Screenshot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 bg-[#1E1E1E] rounded-3xl p-3 border-2 border-[#F4D52E]/40 shadow-2xl shadow-black/80 z-20"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                  <img
                    src={CAFE_INFO.images.screenshot2}
                    alt="Bitezzo Paneer & Chicken Kurkure Momos"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 text-left">
                    <span className="text-[10px] font-bold text-[#F4D52E] uppercase tracking-wider bg-[#F0445A]/90 px-2 py-0.5 rounded">
                      🔥 Top Seller
                    </span>
                    <p className="text-white font-bold text-sm mt-1">Kurkure Momos [6 Pcs]</p>
                    <p className="text-gray-300 text-xs font-semibold">₹199</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Food Card 1: Burger (Top Right) */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 right-0 w-36 h-36 sm:w-40 sm:h-40 bg-[#1E1E1E] rounded-2xl p-2 border border-white/10 shadow-xl z-30"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
                    alt="Crispy Burger"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 text-[#F4D52E] font-bold text-xs px-2 py-0.5 rounded-full">
                    ₹119
                  </div>
                </div>
              </motion.div>

              {/* Floating Food Card 2: Sandwich (Bottom Left) */}
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 left-0 w-36 h-36 sm:w-40 sm:h-40 bg-[#1E1E1E] rounded-2xl p-2 border border-white/10 shadow-xl z-30"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src={CAFE_INFO.images.screenshot1}
                    alt="Tandoori Chicken Sandwich"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1 bg-[#F0445A] text-white font-bold text-[10px] px-1.5 py-0.5 rounded">
                    Tandoori Cheese
                  </div>
                </div>
              </motion.div>

              {/* Floating Food Card 3: Cold Coffee / Beverage (Top Left) */}
              <motion.div
                animate={{ x: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-6 -left-6 w-28 h-28 bg-[#1E1E1E] rounded-2xl p-2 border border-[#F4D52E]/30 shadow-lg z-10"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80"
                    alt="Thick Cold Coffee"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1 rounded">
                    Cold Coffee
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge (Bottom Right) */}
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#F0445A] to-[#F4D52E] text-[#151515] p-3 rounded-2xl shadow-xl z-40 flex items-center gap-2 border border-white/20"
              >
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider leading-none">Special Combos</p>
                  <p className="text-xs font-black text-black">Starting @ ₹149</p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
