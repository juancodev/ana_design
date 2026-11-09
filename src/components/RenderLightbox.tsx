import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { LightTime, SpaceRender } from '../types';
import { LitRender } from './LitRender';

interface RenderLightboxProps {
  renders: SpaceRender[];
  index: number;
  lightTime: LightTime;
  caption: string;
  onStep: (direction: 1 | -1) => void;
  onClose: () => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

// Full-screen viewer, portaled to <body> so no ancestor style can turn `fixed` into a local containing block
export const RenderLightbox: React.FC<RenderLightboxProps> = ({ renders, index, lightTime, caption, onStep, onClose }) => {
  const render = renders[index];
  const hasMultiple = renders.length > 1;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onStep]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={caption}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <LitRender
          key={render.src}
          render={render}
          lightTime={lightTime}
          fit="contain"
          className="render-fade-in rounded-lg"
          imgClassName="block max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-5rem)] max-h-[85vh] w-auto h-auto"
        />
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5" />
      </button>

      {hasMultiple && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onStep(-1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Render anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onStep(1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Render siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div className="absolute bottom-5 left-0 right-0 text-center text-white/80 text-xs tracking-[0.2em] uppercase">
        {caption} · {pad(index + 1)} / {pad(renders.length)}
      </div>
    </div>,
    document.body
  );
};
