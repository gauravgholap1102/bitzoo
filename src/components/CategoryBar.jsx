import React from 'react';
import { CATEGORIES } from '../data/menuData';
import {
  Utensils,
  Flame,
  Beef,
  Pizza as PizzaIcon,
  Sandwich,
  Coffee,
  Soup,
  Sparkles,
  Cake,
  IceCream,
  Gift
} from 'lucide-react';

const iconMap = {
  Utensils,
  Flame,
  Beef,
  Pizza: PizzaIcon,
  Sandwich,
  Coffee,
  Soup,
  Sparkles,
  Cake,
  IceCream,
  Gift
};

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  return (
    <section className="bg-[#151515] border-y border-white/10 sticky top-[68px] z-30 py-4 shadow-xl backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#F4D52E] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Quick Categories
          </span>
          <span className="text-xs text-gray-400 font-medium hidden sm:inline">
            Scroll or tap to filter items
          </span>
        </div>

        {/* Scrollable category pills */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1 pt-1 scroll-smooth">
          {CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Utensils;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#F0445A] to-[#D9354B] text-white shadow-lg shadow-[#F0445A]/40 scale-105 border border-[#F0445A]'
                    : 'bg-[#1E1E1E] text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                }`}
              >
                <div className={`p-1 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'text-[#F4D52E]'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
