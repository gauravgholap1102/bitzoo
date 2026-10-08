import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Phone, Utensils, Clock, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CAFE_INFO } from '../data/menuData';

export default function OrderSuccessModal({ orderDetails, onClose, onViewMenu }) {
  useEffect(() => {
    if (orderDetails) {
      // Trigger festive confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F0445A', '#F4D52E', '#ffffff']
      });
    }
  }, [orderDetails]);

  if (!orderDetails) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Success Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          className="relative bg-[#1E1E1E] border border-[#F4D52E]/30 w-full max-w-lg rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl shadow-black z-10 my-auto"
        >
          {/* Animated Green Checkmark Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-tr from-[#F0445A] to-[#F4D52E] rounded-full flex items-center justify-center mx-auto shadow-xl shadow-[#F0445A]/30 p-1"
          >
            <div className="w-full h-full bg-[#151515] rounded-full flex items-center justify-center text-green-400">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>
          </motion.div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#F4D52E] bg-white/5 px-3 py-1 rounded-full border border-white/10">
              Order Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Thank You for Ordering!
            </h2>
            <p className="text-sm text-gray-300">
              Your order has been received at <strong className="text-white">Bitezzo Foods &amp; Beverage</strong>.
            </p>
          </div>

          {/* Order Details Ticket */}
          <div className="bg-[#151515] p-5 rounded-2xl border border-white/10 text-left space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Order Reference</span>
                <span className="text-lg font-black text-[#F4D52E]">{orderDetails.orderId}</span>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-400 block font-medium">Est. Prep Time</span>
                <span className="text-sm font-bold text-white flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#F0445A]" /> 20–30 Mins
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <p className="text-xs text-gray-400">Customer Name: <strong className="text-white">{orderDetails.customer.fullName}</strong></p>
              <p className="text-xs text-gray-400">Phone: <strong className="text-white">{orderDetails.customer.mobileNumber}</strong></p>
              <p className="text-xs text-gray-400">Total Paid: <strong className="text-[#F4D52E] font-bold">₹{orderDetails.grandTotal}</strong> ({orderDetails.customer.paymentMethod.toUpperCase()})</p>
            </div>
          </div>

          {/* Disclaimer Banner */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-left flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-200/90 leading-tight">
              <strong>Frontend Demo Note:</strong> This website preview simulates the complete customer ordering experience. For direct live orders or enquiries, feel free to call Bitezzo directly!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${CAFE_INFO.phone}`}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-4 rounded-xl border border-white/10 flex items-center justify-center gap-2 text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-[#F4D52E]" />
              <span>Call Bitezzo ({CAFE_INFO.phone})</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onViewMenu();
              }}
              className="bg-gradient-to-r from-[#F0445A] to-[#D9354B] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#F0445A]/30 flex items-center justify-center gap-2 text-sm hover:scale-105 transition-all cursor-pointer"
            >
              <Utensils className="w-4 h-4" />
              <span>Back to Menu</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
