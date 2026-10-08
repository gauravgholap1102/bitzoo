import React from 'react';

export default function BitezzoLogo({ size = "md", light = false }) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl lg:text-3xl",
    lg: "text-4xl lg:text-5xl",
    xl: "text-5xl lg:text-6xl"
  };

  return (
    <div className="flex flex-col items-start select-none cursor-pointer group">
      <div className={`font-black tracking-tight flex items-center font-heading ${sizeClasses[size] || sizeClasses.md}`}>
        <span className="text-[#F0445A] drop-shadow-sm">Bite</span>
        <span className="text-[#F4D52E] flex items-center drop-shadow-sm">
          zz
          <span className="inline-flex items-center justify-center bg-[#F4D52E] text-[#151515] rounded-full w-[0.8em] h-[0.8em] ml-[0.05em] shadow-inner text-[0.6em] font-bold">
            🍔
          </span>
        </span>
      </div>
      <div className={`text-[0.45em] font-bold tracking-widest uppercase mt-[-0.2em] flex items-center gap-1 ${light ? 'text-gray-300' : 'text-gray-400'}`}>
        <span className="text-[#F0445A]">FOODS</span>
        <span className="text-[#F4D52E]">&amp;</span>
        <span>BEVERAGE</span>
      </div>
    </div>
  );
}
