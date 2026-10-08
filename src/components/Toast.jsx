import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function Toast({ toastMessage, onClose }) {
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 bg-[#1E1E1E] border border-green-500/40 text-white px-4 py-3 rounded-2xl shadow-2xl shadow-black flex items-center gap-3 max-w-sm backdrop-blur-md"
        >
          <div className="p-1.5 rounded-full bg-green-500/20 text-green-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cart Updated</p>
            <p className="text-sm font-semibold text-white truncate">{toastMessage}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
