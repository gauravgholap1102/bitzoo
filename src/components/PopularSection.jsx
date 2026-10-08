import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, ArrowRight } from 'lucide-react';
import FoodCard from './FoodCard';
import { MENU_ITEMS } from '../data/menuData';

export default function PopularSection({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onCardClick,
  onViewAllMenu
}) {
  const popularItems = MENU_ITEMS.filter(item => item.isBestseller).slice(0, 4);

  return (
    <section className="py-12 bg-[#151515] border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0445A]/10 border border-[#F0445A]/30 text-[#F0445A] text-xs font-extrabold uppercase tracking-widest mb-2">
              <Flame className="w-4 h-4 text-[#F4D52E]" />
              <span>Popular Today</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Customer Favourites at <span className="text-[#F4D52E]">Bitezzo</span>
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Handpicked top-rated items loved by our local regulars.
            </p>
          </div>

          <button
            onClick={onViewAllMenu}
            className="inline-flex items-center gap-2 text-[#F4D52E] hover:text-white font-bold text-sm transition-colors group self-start md:self-auto cursor-pointer"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Popular Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item) => {
            const inCart = cartItems.find(i => i.id === item.id);
            const cartQuantity = inCart ? inCart.quantity : 0;

            return (
              <FoodCard
                key={item.id}
                item={item}
                cartQuantity={cartQuantity}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
                onCardClick={onCardClick}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
