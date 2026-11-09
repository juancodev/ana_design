import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { StudioConfig, Project } from '../types';
import { DeAndradeHeroBrand } from './DeAndradeLogo';
import defaultOliveBg from '../assets/images/olive_mineral_texture_1790628051119.jpg';

interface HeroProps {
  studioConfig: StudioConfig;
  projects: Project[];
  scrollProgress: number; // 0 (at top) to 1 (content completely covers hero)
}

export const Hero: React.FC<HeroProps> = ({
  studioConfig,
  projects,
  scrollProgress,
}) => {
  // Use projects or fallback list
  const slides = projects.length > 0 ? projects.slice(0, 5) : [];
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentProject = slides[currentSlideIndex] || projects[0];
  const totalSlides = slides.length || 1;

  // Auto-play slideshow effect (silent and smooth)
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 6000); // 6 seconds per slide

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSlides]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const monogram = studioConfig.heroMonogram || 'A&CO.';

  // Interpolated visual values matching Alexander & CO. scroll behavior
  // As the user scrolls down, the hero stays pinned, content rises over it
  const heroOpacity = Math.max(1 - scrollProgress * 0.4, 0.4);
  const parallaxOffset = scrollProgress * 80; // px
  const imageScale = 1 + scrollProgress * 0.06;
  const logoOpacity = Math.max(1 - scrollProgress * 1.8, 0);
  const logoTranslateY = -scrollProgress * 90; // Moves upward as you scroll down
  const captionsOpacity = Math.max(1 - scrollProgress * 2.2, 0);

  return (
    <>
      {/* Sticky Pinned Hero Container (Alexander & CO. architecture) */}
      <section 
        className="sticky top-0 left-0 w-full h-screen min-h-[640px] max-h-[1080px] bg-[#141311] text-white overflow-hidden select-none z-0"
        aria-label="Cinematic Architectural Hero"
        style={{
          opacity: heroOpacity,
        }}
      >
        {/* Full-bleed Hero Background: Custom shared photo or Slideshow */}
        {studioConfig.heroBackgroundImage ? (
          <div
            className="absolute inset-0 z-0 bg-[#505437]"
            style={{
              transform: `translateY(${parallaxOffset}px) scale(${imageScale})`,
              transition: 'transform 100ms ease-out',
              willChange: 'transform',
            }}
          >
            <img
              src={
                studioConfig.heroBackgroundImage && !studioConfig.heroBackgroundImage.includes('/src/assets/')
                  ? studioConfig.heroBackgroundImage
                  : defaultOliveBg
              }
              alt="Fondo de Autor Estudio"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== defaultOliveBg) {
                  img.src = defaultOliveBg;
                }
              }}
            />
            {/* Subtle atmospheric grading */}
            <div 
              className="absolute inset-0 transition-colors duration-300"
              style={{
                backgroundColor: `rgba(0, 0, 0, ${0.12 + scrollProgress * 0.3})`,
              }}
            />
          </div>
        ) : (
          slides.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
                }`}
                style={{
                  transform: `translateY(${parallaxOffset}px) scale(${imageScale})`,
                  transition: isActive ? 'opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 100ms ease-out' : 'opacity 1000ms ease-in-out',
                  willChange: 'transform, opacity',
                }}
              >
                <img
                  src={slide.coverImage}
                  alt={slide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Cinematic subtle contrast grading matching Alexander & CO */}
                <div 
                  className="absolute inset-0 transition-colors duration-300"
                  style={{
                    backgroundColor: `rgba(0, 0, 0, ${0.35 + scrollProgress * 0.25})`,
                  }}
                />
              </div>
            );
          })
        )}

        {/* Dead Center: De Andrade Brand Seal (LOGO-03 on top, LOGO-02 underneath) */}
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

        {/* Bottom Bar: Clean centered "Explorar" scroll indicator */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-center pb-8 sm:pb-10 transition-opacity duration-150 pointer-events-none"
          style={{
            opacity: captionsOpacity,
          }}
        >
          <div 
            className="flex flex-col items-center text-white/60 hover:text-white transition-colors cursor-pointer pb-1 group pointer-events-auto"
            onClick={() => {
              const el = document.getElementById('homeContentWrapper');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-[9px] uppercase tracking-[0.3em] font-light mb-1.5 opacity-80 group-hover:opacity-100">Explorar</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce opacity-70 group-hover:opacity-100" />
          </div>
        </div>
      </section>

    </>
  );
};
