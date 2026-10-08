import React from 'react';
import { Phone, MapPin, Navigation, Clock, MessageCircle } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { CAFE_INFO } from '../data/menuData';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-[#151515] border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#F4D52E] bg-white/5 px-3 py-1 rounded-full border border-white/10">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            Visit or Call <span className="text-[#F0445A]">Bitezzo</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            We are ready to serve you hot and fresh! Reach out for home delivery or cafe visits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Phone */}
          <div className="bg-[#1E1E1E] p-8 rounded-3xl border border-white/10 text-center space-y-4 shadow-xl hover:border-[#F0445A]/50 transition-colors group">
            <div className="w-16 h-16 rounded-2xl bg-[#F0445A]/10 border border-[#F0445A]/30 flex items-center justify-center mx-auto text-[#F0445A] group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">Call &amp; Order</h3>
              <p className="text-xs text-gray-400 mt-1">Direct Helpline &amp; Delivery</p>
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="text-xl font-black text-[#F4D52E] block mt-2 hover:underline"
              >
                {CAFE_INFO.phone}
              </a>
            </div>

            <a
              href={`tel:${CAFE_INFO.phone}`}
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#F0445A] text-white font-bold text-sm shadow-md hover:bg-[#D9354B] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Card 2: Instagram */}
          <div className="bg-[#1E1E1E] p-8 rounded-3xl border border-white/10 text-center space-y-4 shadow-xl hover:border-[#F4D52E]/50 transition-colors group">
            <div className="w-16 h-16 rounded-2xl bg-[#F4D52E]/10 border border-[#F4D52E]/30 flex items-center justify-center mx-auto text-[#F4D52E] group-hover:scale-110 transition-transform">
              <InstagramIcon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">Instagram</h3>
              <p className="text-xs text-gray-400 mt-1">Follow our food vibes &amp; offers</p>
              <a
                href={CAFE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-black text-[#F4D52E] block mt-2 hover:underline"
              >
                {CAFE_INFO.instagram}
              </a>
            </div>

            <a
              href={CAFE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-md hover:opacity-90 transition-opacity"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow @bitezzo_</span>
            </a>
          </div>

          {/* Card 3: Location */}
          <div className="bg-[#1E1E1E] p-8 rounded-3xl border border-white/10 text-center space-y-4 shadow-xl hover:border-white/30 transition-colors group">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-[#F4D52E]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">Main Branch Location</h3>
              <p className="text-xs text-gray-400 mt-1">Visit our cafe</p>
              <p className="text-sm font-semibold text-gray-200 mt-2">
                {CAFE_INFO.addressPlaceholder}
              </p>
            </div>

            <button
              onClick={() => alert(`Bitezzo Main Branch Contact: ${CAFE_INFO.phone}`)}
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/10 transition-colors cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#F4D52E]" />
              <span>Get Directions</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
