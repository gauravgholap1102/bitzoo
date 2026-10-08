import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Minus, Star, Flame, Check } from 'lucide-react';

export default function FoodCard({
  item,
  cartQuantity = 0,
  onAddToCart,
  onUpdateQuantity,
  onCardClick,
  isFavorite = false,
  onToggleFavorite
}) {
  const [isLiked, setIsLiked] = useState(isFavorite);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (onToggleFavorite) onToggleFavorite(item.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={() => onCardClick(item)}
      className="group bg-[#1E1E1E] rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#F0445A]/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1 relative"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-black/30 opacity-80" />

          {/* Top Badges & Favorite Button */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
            {/* Veg / Non-Veg Indicator */}
            <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              <div
                className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center ${
                  item.isVeg ? 'border-green-500' : 'border-red-500'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    item.isVeg ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
              </div>
              <span className="text-[10px] font-bold text-gray-200 uppercase tracking-wider">
                {item.isVeg ? 'VEG' : 'NON-VEG'}
              </span>
            </div>

            {/* Favorite Heart Micro-interaction */}
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                isLiked
                  ? 'bg-[#F0445A] text-white border-[#F0445A] scale-110'
                  : 'bg-black/50 text-gray-300 border-white/10 hover:text-white hover:bg-black/70'
              }`}
              title="Add to Favorites"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Bestseller Badge */}
          {item.isBestseller && (
            <div className="absolute bottom-3 left-3 bg-gradient-to-r from-[#F0445A] to-[#D9354B] text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
              <Flame className="w-3 h-3 text-[#F4D52E]" />
              <span>Bestseller</span>
            </div>
          )}

          {/* Rating Badge */}
          {item.rating && (
            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-[#F4D52E] font-bold text-xs px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#F4D52E]" />
              <span>{item.rating}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#F4D52E] transition-colors leading-snug line-clamp-1 font-heading">
              {item.name}
            </h3>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {item.description}
          </p>
        </div>
      </div>

      {/* Footer / Price & Add Action */}
      <div className="p-4 pt-0 flex items-center justify-between mt-2">
        <div>
          <span className="text-xs text-gray-400 block font-medium">Price</span>
          <span className="text-xl font-black text-white tracking-tight">
            ₹{item.price}
          </span>
        </div>

        {/* Add Button OR Quantity Controls */}
        <div onClick={(e) => e.stopPropagation()}>
          {cartQuantity === 0 ? (
            <button
              onClick={() => onAddToCart(item)}
              className="bg-gradient-to-r from-[#F0445A] to-[#D9354B] hover:from-[#D9354B] hover:to-[#C0263C] text-white font-extrabold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md shadow-[#F0445A]/30 hover:shadow-[#F0445A]/50 transition-all flex items-center gap-1.5 active:scale-95 group/btn cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#F4D52E] group-hover/btn:rotate-90 transition-transform" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="flex items-center bg-[#F0445A] text-white rounded-xl overflow-hidden shadow-lg shadow-[#F0445A]/30 border border-[#F0445A]">
              <button
                onClick={() => onUpdateQuantity(item.id, cartQuantity - 1)}
                className="p-2 hover:bg-black/20 transition-colors cursor-pointer"
                title="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <span className="px-3 text-xs font-black select-none">
                {cartQuantity}
              </span>

              <button
                onClick={() => onUpdateQuantity(item.id, cartQuantity + 1)}
                className="p-2 hover:bg-black/20 transition-colors cursor-pointer"
                title="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
