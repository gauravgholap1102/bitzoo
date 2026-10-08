import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, MapPin, Phone, User, FileText, CreditCard, Banknote, QrCode, ArrowLeft } from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onPlaceOrder
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    landmark: '',
    instructions: '',
    paymentMethod: 'cod' // cod | upi | card
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 299 ? 0 : 30;
  const grandTotal = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.mobileNumber.trim() || formData.mobileNumber.length < 10) {
      newErrors.mobileNumber = 'Valid 10-digit mobile number required';
    }
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const orderPayload = {
      orderId: `#BZ${Math.floor(1000 + Math.random() * 9000)}`,
      customer: formData,
      items: cartItems,
      subtotal,
      deliveryFee,
      grandTotal,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onPlaceOrder(orderPayload);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-[#151515] border border-white/10 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl z-10 my-auto"
        >
          {/* Top Bar Header */}
          <div className="p-5 bg-[#1E1E1E] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-extrabold text-white font-heading">Complete Your Order</h2>
                <p className="text-xs text-gray-400">Bitezzo Direct Food Delivery</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Customer Details */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                  <User className="w-4 h-4 text-[#F4D52E]" />
                  <span>Delivery Information</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`w-full bg-[#1E1E1E] text-white text-sm px-4 py-3 rounded-xl border ${
                          errors.fullName ? 'border-red-500' : 'border-white/10'
                        } focus:outline-none focus:border-[#F0445A]`}
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. 7249820484"
                        className={`w-full bg-[#1E1E1E] text-white text-sm pl-10 pr-4 py-3 rounded-xl border ${
                          errors.mobileNumber ? 'border-red-500' : 'border-white/10'
                        } focus:outline-none focus:border-[#F0445A]`}
                      />
                    </div>
                    {errors.mobileNumber && <p className="text-xs text-red-400 mt-1">{errors.mobileNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Delivery Address *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <textarea
                        name="address"
                        rows={2}
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Flat no, House name, Street area details"
                        className={`w-full bg-[#1E1E1E] text-white text-sm pl-10 pr-4 py-2.5 rounded-xl border ${
                          errors.address ? 'border-red-500' : 'border-white/10'
                        } focus:outline-none focus:border-[#F0445A]`}
                      />
                    </div>
                    {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        placeholder="e.g. Near Main Gate"
                        className="w-full bg-[#1E1E1E] text-white text-sm px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#F0445A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                        Instructions
                      </label>
                      <input
                        type="text"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleInputChange}
                        placeholder="e.g. Make it spicy / Don't ring bell"
                        className="w-full bg-[#1E1E1E] text-white text-sm px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#F0445A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Options Selection */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#F4D52E]" />
                    <span>Select Payment Option</span>
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    {/* COD */}
                    <label
                      className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'bg-[#F0445A]/15 border-[#F0445A] text-white'
                          : 'bg-[#1E1E1E] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <Banknote className="w-5 h-5 text-[#F4D52E] mb-1" />
                      <span className="text-xs font-extrabold">Cash on Delivery</span>
                    </label>

                    {/* UPI */}
                    <label
                      className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                        formData.paymentMethod === 'upi'
                          ? 'bg-[#F0445A]/15 border-[#F0445A] text-white'
                          : 'bg-[#1E1E1E] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <QrCode className="w-5 h-5 text-[#F4D52E] mb-1" />
                      <span className="text-xs font-extrabold">UPI / GPay / Paytm</span>
                    </label>

                    {/* Card */}
                    <label
                      className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'bg-[#F0445A]/15 border-[#F0445A] text-white'
                          : 'bg-[#1E1E1E] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <CreditCard className="w-5 h-5 text-[#F4D52E] mb-1" />
                      <span className="text-xs font-extrabold">Online Payment</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 bg-[#1E1E1E] p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white border-b border-white/10 pb-2 mb-3">
                    Order Summary ({cartItems.length} items)
                  </h3>

                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <span className="text-gray-300 font-medium truncate max-w-[170px]">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-white font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span className="text-white font-semibold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Delivery Charge</span>
                      <span className="text-white font-semibold">
                        {deliveryFee === 0 ? <span className="text-green-400 font-bold">FREE</span> : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                      <span>Grand Total</span>
                      <span className="text-xl text-[#F4D52E]">₹{grandTotal}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#F0445A] to-[#D9354B] hover:from-[#D9354B] hover:to-[#C0263C] text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-[#F0445A]/30 hover:shadow-[#F0445A]/50 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5 text-[#F4D52E]" />
                  <span>Place Order (₹{grandTotal})</span>
                </button>
              </div>

            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
