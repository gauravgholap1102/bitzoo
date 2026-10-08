import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { CAFE_INFO } from '../data/menuData';

export default function InstagramSection() {
  const instagramPosts = [
    {
      id: 1,
      image: CAFE_INFO.images.screenshot2,
      caption: "Crispy Paneer & Chicken Kurkure Momos serving 🔥 #bitezzo",
      likes: "342"
    },
    {
      id: 2,
      image: CAFE_INFO.images.screenshot1,
      caption: "Juicy Tandoori Chicken Cheese Sandwich 🧀 #foodies",
      likes: "419"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80",
      caption: "Thick Chilled Cold Coffee for the warm weather ☕",
      likes: "512"
    },
    {
      id: 4,
      image: CAFE_INFO.images.shopFront,
      caption: "Good Foods. Great Vibes at Bitezzo Main Branch! ✨",
      likes: "680"
    }
  ];

  return (
    <section className="py-16 bg-[#0D0D0D] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-extrabold uppercase tracking-widest mb-2">
              <InstagramIcon className="w-4 h-4 text-[#F4D52E]" />
              <span>Social Feed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Follow the <span className="text-[#F0445A]">Bitezzo Vibe</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Join our food community <strong className="text-white">@bitezzo_</strong> on Instagram.
            </p>
          </div>

          <a
            href={CAFE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity self-start md:self-auto"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow Us on Instagram</span>
          </a>
        </div>

        {/* 4 Cards Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={CAFE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#1E1E1E] border border-white/10 shadow-lg cursor-pointer"
            >
              <img
                src={post.image}
                alt="Bitezzo Instagram post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-left">
                <div className="self-end bg-pink-600 text-white p-2 rounded-full shadow-lg">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#F4D52E] font-bold text-xs mb-1">
                    <Heart className="w-3.5 h-3.5 fill-[#F4D52E]" />
                    <span>{post.likes} likes</span>
                  </div>
                  <p className="text-white text-xs font-semibold line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
