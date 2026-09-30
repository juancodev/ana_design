import React, { useState } from 'react';
import { Sparkles, Sliders, Menu, X, ArrowUp } from 'lucide-react';
import { StudioConfig } from '../types';
import { DeAndradeEmblem } from './DeAndradeLogo';

interface HeaderProps {
  studioConfig: StudioConfig;
  onOpenCms: () => void;
  onOpenPitch: () => void;
  cmsOpen: boolean;
  activeDesign: 'choros' | 'hybrid';
  onToggleDesign: (design: 'choros' | 'hybrid') => void;
  scrollProgress: number; // 0 (over hero) to 1 (over content)
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  studioConfig,
  onOpenCms,
  onOpenPitch,
  cmsOpen,
  activeDesign,
  onToggleDesign,
  scrollProgress,
  onOpenMenu,
}) => {
  const isOverContent = scrollProgress >= 0.75;
  const monogram = studioConfig.heroMonogram || 'A&CO.';
  const isOlive = studioConfig.themeAtmosphere === 'olive';

  const getHeaderBackground = () => {
    if (!isOverContent) return 'bg-transparent text-white border-b border-transparent h-20 md:h-24';
    if (isOlive) return 'bg-[#41482C]/95 backdrop-blur-md border-b border-white/15 text-[#F6F4ED] shadow-lg h-16 md:h-20';
    return 'bg-[#DAD8D2]/95 backdrop-blur-md border-b border-[#C8C2B4] text-[#191919] shadow-xs h-16 md:h-20';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out select-none ${getHeaderBackground()}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-full flex items-center justify-between">
        
        {/* Left: De Andrade Logo / Icon (Larger size, reveals on scroll down) */}
        <div className="flex items-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`flex items-center group cursor-pointer focus:outline-none transition-all duration-500 ease-out hover:scale-105 ${
              isOverContent 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
            title="De Andrade - Volver al inicio"
          >
            <DeAndradeEmblem size={42} color="#8A7149" className="drop-shadow-xs" />
          </button>
        </div>

        {/* Center: Brand Name (De Andrade / INTERIOR DESIGN, reveals on scroll down) */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-out flex flex-col items-center text-center ${
            isOverContent 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group cursor-pointer focus:outline-none flex flex-col items-center"
            title="De Andrade - Inicio"
          >
            <span 
              className="text-2xl sm:text-3xl font-normal tracking-wide text-[#191919] leading-none group-hover:text-black transition-colors"
              style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}
            >
              De Andrade
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.34em] text-[#7C7465] font-sans font-medium mt-1">
              Interior Design
            </span>
          </button>
        </div>

        {/* Right: CMS / Pitch, and iconic MENU trigger */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Quick CMS Button */}
          <button
            onClick={onOpenCms}
            className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
              isOverContent
                ? (isOlive ? 'bg-white text-black hover:bg-[#EAE5DA]' : 'bg-[#191919] text-white hover:bg-[#33302B]')
                : 'bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-sm'
            }`}
            title="Abrir Gestor de Contenidos"
          >
            <Sliders className="w-3 h-3" />
            <span>CMS</span>
          </button>

          {/* Quick Pitch Button */}
          <button
            onClick={onOpenPitch}
            className={`hidden lg:flex items-center gap-1 px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
              isOverContent
                ? (isOlive ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20' : 'bg-[#E3DFD6] hover:bg-[#DDD8CD] text-[#2C2822] border border-[#BFB8A9]')
                : 'bg-white/10 hover:bg-white/25 text-white border border-white/20'
            }`}
            title="Ver propuesta de valor para el cliente"
          >
            <Sparkles className="w-3 h-3 text-[#A89366]" />
            <span>Propuesta</span>
          </button>

          {/* Hamburger Menu Icon trigger */}
          <button
            onClick={onOpenMenu}
            className={`group flex items-center justify-center p-1.5 sm:p-2 rounded-md transition-all cursor-pointer focus:outline-none ${
              isOverContent 
                ? (isOlive ? 'text-[#F6F4ED] hover:bg-white/10' : 'text-[#191919] hover:bg-black/5') 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Abrir Menú Principal"
            title="Menú"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] transition-transform duration-300 group-hover:scale-110" />
          </button>

        </div>

      </div>
    </header>
  );
};
