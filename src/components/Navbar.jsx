import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu as MenuIcon, X, Phone, Heart } from 'lucide-react';
import BitezzoLogo from './BitezzoLogo';
import { CAFE_INFO } from '../data/menuData';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenSearch,
  favoritesCount = 0
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About Bitezzo' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#151515]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-gradient-to-b from-[#0D0D0D]/90 via-[#151515]/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => handleNavClick('home')}>
            <BitezzoLogo size="md" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#1E1E1E]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-[#F0445A] text-white shadow-md shadow-[#F0445A]/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              title="Search food"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full text-white bg-white/5 hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2 group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#F4D52E] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#F0445A] text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-md shadow-[#F0445A]/50">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-sm text-gray-200">
                Cart
              </span>
            </button>

            {/* Order Now CTA Desktop */}
            <button
              onClick={() => handleNavClick('menu')}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[#F0445A] to-[#E03349] hover:from-[#E03349] hover:to-[#D02238] text-white font-bold px-5 py-2.5 rounded-full shadow-lg shadow-[#F0445A]/30 hover:shadow-[#F0445A]/50 transition-all transform hover:-translate-y-0.5"
            >
              <span>Order Now</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full text-gray-300 hover:text-white bg-white/5 border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#151515] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-base transition-colors flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-[#F0445A] text-white'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-2 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('menu');
              }}
              className="w-full bg-[#F0445A] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#F0445A]/30"
            >
              <ShoppingBag className="w-5 h-5 text-[#F4D52E]" />
              <span>Explore Full Menu</span>
            </button>

            <a
              href={`tel:${CAFE_INFO.phone}`}
              className="w-full bg-white/10 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 border border-white/10"
            >
              <Phone className="w-5 h-5 text-[#F4D52E]" />
              <span>Call Bitezzo: {CAFE_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
