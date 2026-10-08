import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { MENU_ITEMS, RECOMMENDATIONS } from '../data/menuData';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  onProceedToCheckout
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeDeliveryThreshold = 299;
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= freeDeliveryThreshold ? 0 : 30;
  const grandTotal = subtotal + deliveryFee;

  // Determine smart recommendations based on current cart categories
  const recommendedIds = new Set();
  cartItems.forEach(item => {
    const categoryRecs = RECOMMENDATIONS[item.category] || ["bev-2", "br-3"];
    categoryRecs.forEach(id => recommendedIds.add(id));
  });

  // Filter out items already in cart
  const cartIds = new Set(cartItems.map(i => i.id));
  const upsellItems = MENU_ITEMS.filter(
    item => recommendedIds.has(item.id) && !cartIds.has(item.id)
  ).slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="w-screen max-w-md bg-[#151515] border-l border-white/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1E1E1E]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#F0445A]/10 border border-[#F0445A]/30">
                  <ShoppingBag className="w-5 h-5 text-[#F0445A]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-heading">Your Food Cart</h2>
                  <p className="text-xs text-gray-400">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl">
                    🍔
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">Your cart is empty</h3>
                    <p className="text-sm text-gray-400 mt-1 max-w-xs">
                      Looks like you haven't added any Bitezzo delicacies yet!
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-full bg-[#F0445A] text-white font-bold text-sm shadow-lg shadow-[#F0445A]/30 hover:scale-105 transition-all"
                  >
                    Browse Delicious Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Free Delivery Bar Progress */}
                  <div className="bg-[#1E1E1E] p-3 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      {subtotal >= freeDeliveryThreshold ? (
                        <span className="text-green-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> 🎉 You've unlocked FREE Delivery!
                        </span>
                      ) : (
                        <span className="text-gray-300">
                          Add <strong className="text-[#F4D52E]">₹{freeDeliveryThreshold - subtotal}</strong> more for FREE Delivery
                        </span>
                      )}
                    </div>
                    <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#F0445A] to-[#F4D52E] transition-all duration-300"
                        style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#1E1E1E] p-3 rounded-2xl border border-white/10 flex items-center gap-3 group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate font-heading">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#F4D52E] font-extrabold mt-0.5">
                            ₹{item.price}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            {/* Qty controls */}
                            <div className="flex items-center bg-[#151515] border border-white/10 rounded-lg p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-gray-300 hover:text-white"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-gray-300 hover:text-white"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-gray-500 hover:text-red-400 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Smart Recommendations: "Perfect With Your Order" */}
                  {upsellItems.length > 0 && (
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#F4D52E]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Perfect With Your Order</span>
                      </div>

                      <div className="space-y-2">
                        {upsellItems.map((rec) => (
                          <div
                            key={rec.id}
                            className="bg-[#1E1E1E]/80 p-2.5 rounded-xl border border-white/5 flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={rec.image}
                                alt={rec.name}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-white truncate">{rec.name}</p>
                                <p className="text-[11px] text-gray-400 font-semibold">₹{rec.price}</p>
                              </div>
                            </div>

                            <button
                              onClick={() => onAddToCart(rec)}
                              className="flex-shrink-0 bg-white/10 hover:bg-[#F0445A] hover:text-white text-[#F4D52E] font-bold text-xs px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                            >
                              + ADD
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-white/10 bg-[#1E1E1E] space-y-3">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-white">
                      {deliveryFee === 0 ? (
                        <span className="text-green-400 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                    <span>Total Amount</span>
                    <span className="text-xl text-[#F4D52E]">₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full bg-gradient-to-r from-[#F0445A] to-[#D9354B] hover:from-[#D9354B] hover:to-[#C0263C] text-white font-extrabold py-3.5 rounded-2xl shadow-xl shadow-[#F0445A]/30 hover:shadow-[#F0445A]/50 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
