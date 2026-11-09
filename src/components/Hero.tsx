import React from 'react';
import { ArrowDown } from 'lucide-react';
import { DeAndradeHeroBrand } from './DeAndradeLogo';
import defaultOliveBg from '../assets/images/olive_mineral_texture_1790628051119.jpg';

interface HeroProps {
  image: string;
  scrollProgress: number; // 0 (at top) to 1 (content completely covers hero)
  // Pinned behind the content on the live site; static on the design board
  pinned?: boolean;
}

// Pinned hero: the content below rises over it as the page scrolls
export const Hero: React.FC<HeroProps> = ({ image, scrollProgress, pinned = true }) => {
  const heroOpacity = Math.max(1 - scrollProgress * 0.4, 0.4);
  const parallaxOffset = scrollProgress * 80; // px
  const imageScale = 1 + scrollProgress * 0.06;
  const logoOpacity = Math.max(1 - scrollProgress * 1.8, 0);
  const logoTranslateY = -scrollProgress * 90; // Moves upward as you scroll down
  const captionsOpacity = Math.max(1 - scrollProgress * 2.2, 0);

  return (
    <section
      className={`${pinned ? 'sticky top-0' : 'relative'} left-0 w-full h-screen min-h-[640px] max-h-[1080px] bg-olive text-white overflow-hidden select-none z-0`}
      aria-label="De Andrade Interior Design"
      style={{ opacity: heroOpacity }}
    >
      <div
        className="absolute inset-0 z-0 bg-[#505437]"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(${imageScale})`,
          transition: 'transform 100ms ease-out',
          willChange: 'transform',
        }}
      >
        <img
          src={image || defaultOliveBg}
          alt=""
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src !== defaultOliveBg) img.src = defaultOliveBg;
          }}
        />
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{ backgroundColor: `rgba(0, 0, 0, ${0.12 + scrollProgress * 0.3})` }}
        />
      </div>

      {/* Brand seal */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 transition-all duration-75"
        style={{
          opacity: logoOpacity,
          transform: `translateY(${logoTranslateY}px)`,
          willChange: 'transform, opacity',
        }}
      >
        <DeAndradeHeroBrand color="#D4C19C" emblemSize={150} wordmarkSize="md" />
      </div>

      {/* "Explorar" scroll indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-center pb-8 sm:pb-10 transition-opacity duration-150 pointer-events-none"
        style={{ opacity: captionsOpacity }}
      >
        <div
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors cursor-pointer pb-1 group pointer-events-auto"
          onClick={() => document.getElementById('homeContentWrapper')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-light mb-1.5 opacity-80 group-hover:opacity-100">Explorar</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce opacity-70 group-hover:opacity-100" />
        </div>
      </div>
    </section>
  );
};
