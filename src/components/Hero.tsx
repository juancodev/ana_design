import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown, X, ExternalLink } from 'lucide-react';
import { StudioConfig, Project } from '../types';
import { DeAndradeHeroBrand } from './DeAndradeLogo';
import defaultOliveBg from '../assets/images/olive_mineral_texture_1790628051119.jpg';

interface HeroProps {
  studioConfig: StudioConfig;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenCms: () => void;
  onOpenPitch: () => void;
  onToggleDesign: (design: 'choros' | 'hybrid') => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollProgress: number; // 0 (at top) to 1 (content completely covers hero)
}

export const Hero: React.FC<HeroProps> = ({
  studioConfig,
  projects,
  onSelectProject,
  onOpenCms,
  onOpenPitch,
  onToggleDesign,
  isMenuOpen,
  setIsMenuOpen,
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
          <DeAndradeHeroBrand color="#D4C19C" emblemSize={96} />
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

      {/* Full-Screen Minimalist Architectural Overlay Menu (Alexander & CO. Inspired) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-[99999] bg-[#161513]/98 backdrop-blur-xl text-white flex flex-col justify-between p-8 sm:p-14 md:p-20 transition-all duration-300"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Row of Overlay Menu */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <span className="font-serif text-2xl tracking-wider text-white">
                {studioConfig.studioName}
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/50">
                Index & Directory
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <span>Cerrar</span>
              <X className="w-5 h-5 text-white/70 group-hover:text-white" />
            </button>
          </div>

          {/* Main Navigation Links */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 py-8 sm:py-12 my-auto">
            {/* Primary Navigation Links */}
            <div className="md:col-span-6 flex flex-col space-y-4 sm:space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#A89366] font-medium">
                Navegación del Atelier
              </span>
              
              <a
                href="#proyectos"
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-baseline justify-between text-3xl sm:text-4xl md:text-5xl font-serif text-white/90 hover:text-white transition-all hover:translate-x-2"
              >
                <span>01. Obras & Proyectos</span>
                <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-[#D8CBB7] font-mono">
                  {projects.length} Obras
                </span>
              </a>

              <a
                href="#objetos"
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-baseline justify-between text-3xl sm:text-4xl md:text-5xl font-serif text-white/90 hover:text-white transition-all hover:translate-x-2"
              >
                <span>02. Objetos de Autor</span>
                <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-[#D8CBB7] font-mono">
                  Colección
                </span>
              </a>

              <a
                href="#filosofia"
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-baseline justify-between text-3xl sm:text-4xl md:text-5xl font-serif text-white/90 hover:text-white transition-all hover:translate-x-2"
              >
                <span>03. Materialidad & Calma</span>
                <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-[#D8CBB7] font-mono">
                  Manifiesto
                </span>
              </a>

              <a
                href="#consulta"
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-baseline justify-between text-3xl sm:text-4xl md:text-5xl font-serif text-white/90 hover:text-white transition-all hover:translate-x-2"
              >
                <span>04. Comisión de Proyecto</span>
                <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-[#D8CBB7] font-mono">
                  Contacto VIP
                </span>
              </a>
            </div>

            {/* Architectural Statement & Quick Tools */}
            <div className="md:col-span-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#A89366] font-medium block mb-3">
                  Declaración Conceptual
                </span>
                <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed font-serif max-w-md">
                  &ldquo;{studioConfig.philosophyStatement}&rdquo;
                </p>
              </div>

              {/* Design Atmosphere Switcher inside menu */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium block mb-3">
                  Cambiar Enfoque Estético
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onToggleDesign('choros');
                      setIsMenuOpen(false);
                    }}
                    className={`px-4 py-2 text-xs uppercase tracking-widest rounded border transition-colors cursor-pointer ${
                      studioConfig.activeDesign === 'choros'
                        ? 'border-white bg-white text-black font-medium'
                        : 'border-white/20 text-white/70 hover:border-white/50'
                    }`}
                  >
                    Studio Choros (Prevalencia Táctil)
                  </button>
                  <button
                    onClick={() => {
                      onToggleDesign('hybrid');
                      setIsMenuOpen(false);
                    }}
                    className={`px-4 py-2 text-xs uppercase tracking-widest rounded border transition-colors cursor-pointer ${
                      studioConfig.activeDesign === 'hybrid'
                        ? 'border-white bg-white text-black font-medium'
                        : 'border-white/20 text-white/70 hover:border-white/50'
                    }`}
                  >
                    Híbrido Mas & Alex
                  </button>
                </div>
              </div>

              {/* Admin & Pitch Quick Access */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenCms();
                  }}
                  className="px-4 py-2.5 bg-[#2B2925] hover:bg-[#3D3A34] text-xs uppercase tracking-widest text-[#D8CBB7] border border-[#524B3E] rounded transition-colors cursor-pointer"
                >
                  Abrir Gestor CMS
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenPitch();
                  }}
                  className="px-4 py-2.5 bg-transparent hover:bg-white/10 text-xs uppercase tracking-widest text-white/80 border border-white/20 rounded transition-colors cursor-pointer"
                >
                  Ver Propuesta UI/UX
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer Info inside Menu */}
          <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between text-xs text-white/50 tracking-wider">
            <span>{studioConfig.location}</span>
            <span>{studioConfig.email}</span>
            <span>{studioConfig.phone}</span>
            <span>{studioConfig.instagram}</span>
          </div>
        </div>
      )}
    </>
  );
};
