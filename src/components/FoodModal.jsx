import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Star, ShoppingBag, Flame, Sparkles } from 'lucide-react';

export default function FoodModal({
  item,
  onClose,
  cartQuantity = 0,
  onAddToCart,
  onUpdateQuantity
}) {
  const [modalQty, setModalQty] = useState(cartQuantity > 0 ? cartQuantity : 1);

  if (!item) return null;

  const handleAddOrUpdate = () => {
    onUpdateQuantity(item.id, modalQty);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-[#1E1E1E] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-black z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white hover:bg-black/90 transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Large Image Header */}
          <div className="relative h-64 sm:h-72 w-full bg-black">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-black/40" />

            {/* Badges */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
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
                <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                  {item.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
              </div>

              {item.isBestseller && (
                <div className="bg-[#F0445A] text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#F4D52E]" />
                  <span>Bestseller</span>
                </div>
              )}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white font-heading">
                  {item.name}
                </h2>
                {item.rating && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-[#F4D52E] font-bold text-sm">
                      <Star className="w-4 h-4 fill-[#F4D52E]" />
                      <span>{item.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      ({item.reviewsCount || 100}+ Bitezzo customer reviews)
                    </span>
                  </div>
                )}
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-[#F4D52E]">
                  ₹{item.price}
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-3">
              {item.description}
            </p>

            {/* Price & Quantity Selector */}
            <div className="bg-[#151515] p-4 rounded-2xl border border-white/10 flex items-center justify-between mt-4">
              <div>
                <span className="text-xs text-gray-400 block font-semibold">Total Price</span>
                <span className="text-xl font-extrabold text-white">
                  ₹{item.price * modalQty}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center bg-[#1E1E1E] border border-white/20 rounded-xl p-1">
                <button
                  onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                  className="p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-black text-white text-base">
                  {modalQty}
                </span>
                <button
                  onClick={() => setModalQty(modalQty + 1)}
                  className="p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddOrUpdate}
              className="w-full bg-gradient-to-r from-[#F0445A] to-[#D9354B] hover:from-[#D9354B] hover:to-[#C0263C] text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-[#F0445A]/30 hover:shadow-[#F0445A]/50 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-[#F4D52E]" />
              <span>{cartQuantity > 0 ? 'Update Item in Cart' : 'Add Item to Cart'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
