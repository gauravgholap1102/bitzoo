import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryBar from './components/CategoryBar';
import PopularSection from './components/PopularSection';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import InstagramSection from './components/InstagramSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FoodModal from './components/FoodModal';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import FloatingCartBar from './components/FloatingCartBar';
import Toast from './components/Toast';

export default function App() {
  // 1. Cart State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bitezzo_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // 2. Navigation & View State
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Modals & Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedFoodModal, setSelectedFoodModal] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // 4. Micro-interaction Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('bitezzo_cart_v1', JSON.stringify(cartItems));
    } catch (e) {
      console.error('LocalStorage save error', e);
    }
  }, [cartItems]);

  // Toast auto-hide helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart Operations
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    showToast(`✓ ${item.name} added to cart`);
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  const handlePlaceOrder = (orderPayload) => {
    setPlacedOrderDetails(orderPayload);
    setIsCheckoutOpen(false);
    setCartItems([]); // Clear cart after successful order
    try {
      localStorage.removeItem('bitezzo_cart_v1');
    } catch (e) {}
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSearch = () => {
    setActiveTab('menu');
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#151515] text-white selection:bg-[#F0445A] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Sticky Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={handleOpenSearch}
      />

      {/* Hero Banner Section */}
      <Hero
        onOrderNow={() => handleSelectCategory('all')}
        onExploreMenu={() => handleSelectCategory('all')}
      />

      {/* Sticky Category Bar */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Popular Today Showcase */}
      <PopularSection
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCardClick={(item) => setSelectedFoodModal(item)}
        onViewAllMenu={() => handleSelectCategory('all')}
      />

      {/* Full Filterable Menu Grid */}
      <MenuSection
        selectedCategory={selectedCategory}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCardClick={(item) => setSelectedFoodModal(item)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* About Bitezzo Section */}
      <AboutSection />

      {/* Instagram Vibe Section */}
      <InstagramSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          const el = document.getElementById(tab);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onCategoryClick={(catId) => handleSelectCategory(catId)}
      />

      {/* Floating Sticky Mobile Cart Bar */}
      <FloatingCartBar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Slide-in Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Food Item Quick View Modal */}
      {selectedFoodModal && (
        <FoodModal
          item={selectedFoodModal}
          onClose={() => setSelectedFoodModal(null)}
          cartQuantity={
            cartItems.find((i) => i.id === selectedFoodModal.id)?.quantity || 0
          }
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Order Success Confirmation Screen */}
      <OrderSuccessModal
        orderDetails={placedOrderDetails}
        onClose={() => setPlacedOrderDetails(null)}
        onViewMenu={() => handleSelectCategory('all')}
      />

      {/* Toast Notification */}
      <Toast
        toastMessage={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
