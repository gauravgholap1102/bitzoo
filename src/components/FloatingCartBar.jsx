import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function FloatingCartBar({ cartItems, onOpenCart }) {
  if (!cartItems || cartItems.length === 0) return null;

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 inset-x-4 z-30 md:hidden"
      >
        <button
          onClick={onOpenCart}
          className="w-full bg-gradient-to-r from-[#F0445A] to-[#D9354B] text-white p-3.5 rounded-2xl shadow-2xl shadow-[#F0445A]/50 border border-white/20 flex items-center justify-between group active:scale-98 transition-transform cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center relative">
              <ShoppingBag className="w-5 h-5 text-[#F4D52E]" />
              <span className="absolute -top-1 -right-1 bg-white text-[#F0445A] font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-gray-200">
                {totalCount} {totalCount === 1 ? 'Item' : 'Items'} Added
              </p>
              <p className="text-base font-black text-white">
                ₹{subtotal} <span className="text-[10px] font-semibold text-gray-300">+ taxes &amp; delivery</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider">
            <span>View Cart</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
