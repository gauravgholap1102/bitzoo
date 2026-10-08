import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, ArrowUpDown, Utensils } from 'lucide-react';
import FoodCard from './FoodCard';
import { MENU_ITEMS } from '../data/menuData';

export default function MenuSection({
  selectedCategory,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onCardClick,
  searchQuery,
  setSearchQuery
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');

  const filterOptions = ['All', 'Veg', 'Non-Veg', 'Spicy', 'Under ₹100', 'Best Sellers'];
  const sortOptions = [
    { label: 'Popularity', value: 'Popular' },
    { label: 'Price: Low to High', value: 'PriceLowHigh' },
    { label: 'Price: High to Low', value: 'PriceHighLow' }
  ];

  // Filter & Sort logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Search Query Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // 3. Tag / Diet Filters
      if (activeFilter === 'Veg' && !item.isVeg) return false;
      if (activeFilter === 'Non-Veg' && item.isVeg) return false;
      if (activeFilter === 'Spicy' && !item.isSpicy) return false;
      if (activeFilter === 'Under ₹100' && item.price >= 100) return false;
      if (activeFilter === 'Best Sellers' && !item.isBestseller) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'PriceLowHigh') return a.price - b.price;
      if (sortBy === 'PriceHighLow') return b.price - a.price;
      // Default: Popularity (rating/bestsellers)
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [selectedCategory, searchQuery, activeFilter, sortBy]);

  return (
    <section id="menu" className="py-16 bg-[#151515] min-h-[600px] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Our Menu
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Something delicious for every mood. Freshly made on order.
          </p>
        </div>

        {/* Controls Container: Search & Filters Bar */}
        <div className="bg-[#1E1E1E] p-4 sm:p-6 rounded-3xl border border-white/10 shadow-xl mb-10 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for your favourite food... (e.g. Momos, Burger, Coffee)"
                className="w-full bg-[#151515] text-white placeholder-gray-400 text-sm font-medium pl-12 pr-10 py-3.5 rounded-2xl border border-white/10 focus:outline-none focus:border-[#F0445A] focus:ring-1 focus:ring-[#F0445A] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-[#F4D52E] flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#151515] text-white text-sm font-bold px-4 py-3.5 rounded-2xl border border-white/10 focus:outline-none focus:border-[#F0445A] cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    Sort by: {opt.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick Filter Tag Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 flex-shrink-0 mr-1" />
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#F4D52E] text-[#151515] shadow-md shadow-[#F4D52E]/20 scale-105'
                      : 'bg-[#151515] text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Items Grid or Empty State */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#1E1E1E]/50 rounded-3xl border border-white/10 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-3xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-white font-heading">No food found</h3>
            <p className="text-sm text-gray-400">
              We couldn't find any item matching "{searchQuery || activeFilter}". Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('All');
              }}
              className="px-6 py-2.5 rounded-full bg-[#F0445A] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredItems.map((item) => {
                const inCart = cartItems.find((i) => i.id === item.id);
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
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
