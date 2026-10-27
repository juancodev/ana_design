import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { LightTime, ProjectSpace } from '../types';
import { LitRender } from './LitRender';

interface SpaceGalleryProps {
  projectName: string;
  spaces: ProjectSpace[];
  lightTime: LightTime;
}

const pad = (n: number) => String(n).padStart(2, '0');

// Groups consecutive spaces by their `group` field, keeping each space's global index
const groupSpaces = (spaces: ProjectSpace[]) =>
  spaces.reduce<{ group?: string; items: { space: ProjectSpace; index: number }[] }[]>((groups, space, index) => {
    const last = groups[groups.length - 1];
    if (last && last.group === space.group) last.items.push({ space, index });
    else groups.push({ group: space.group, items: [{ space, index }] });
    return groups;
  }, []);

export const SpaceGallery: React.FC<SpaceGalleryProps> = ({ projectName, spaces, lightTime }) => {
  const [spaceIndex, setSpaceIndex] = useState(0);
  const [renderIndex, setRenderIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const space = spaces[spaceIndex];
  const render = space.renders[renderIndex];
  const hasMultipleRenders = space.renders.length > 1;
  const tabGroups = groupSpaces(spaces);

  const selectSpace = (index: number) => {
    setSpaceIndex(index);
    setRenderIndex(0);
  };

  const stepRender = (direction: 1 | -1) => {
    setRenderIndex((prev) => (prev + direction + space.renders.length) % space.renders.length);
  };

  // Keyboard navigation while the lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') stepRender(1);
      if (e.key === 'ArrowLeft') stepRender(-1);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, space]);

  return (
    <>
      {/* Space selector (one tab per space, grouped by zone when defined) */}
      <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
        <div className="flex flex-col gap-3 min-w-max">
          {tabGroups.map(({ group, items }) => (
            <div key={group ?? 'default'} className="flex items-center gap-2">
              {group && (
                <span className="w-24 shrink-0 text-[10px] uppercase tracking-[0.25em] text-[#8A7149] font-medium">
                  {group}
                </span>
              )}
              {items.map(({ space: s, index }) => (
                <button
                  key={s.id}
                  onClick={() => selectSpace(index)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase rounded-lg border transition-all cursor-pointer ${
                    index === spaceIndex
                      ? 'bg-[#1F1D1A] text-white border-[#1F1D1A]'
                      : 'bg-[#F3EFE7] text-[#544D42] border-[#E4DFD5] hover:border-[#8A7149]'
                  }`}
                >
                  <span className="font-serif text-sm normal-case tracking-normal opacity-60">{pad(index + 1)}</span>
                  <span className="font-medium">{s.name}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Master Framed Diptych (Passe-Partout Framing) */}
      <div className="bg-[#FAF8F5] p-3 sm:p-6 lg:p-8 rounded-2xl border border-[#E5E0D5] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Primary render */}
          <div className="lg:col-span-8 group relative aspect-4/3 sm:aspect-16/10 overflow-hidden rounded-xl bg-[#EBE7DF]">
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute inset-0 w-full h-full cursor-zoom-in"
              aria-label={`Ampliar: ${render.alt}`}
            >
              <LitRender
                key={render.src}
                render={render}
                lightTime={lightTime}
                fit={render.orientation === 'portrait' ? 'contain' : 'cover'}
                className="render-fade-in w-full h-full"
                imgClassName="w-full h-full group-hover:scale-[1.02]"
              />
            </button>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
              {render.lightVariants && (
                <span className="bg-[#8A7149]/90 backdrop-blur-md text-white text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded">
                  Luz real
                </span>
              )}
              <span className="bg-[#1F1D1A]/80 backdrop-blur-md text-white text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded">
                {pad(renderIndex + 1)} / {pad(space.renders.length)}
              </span>
              <span className="pointer-events-none bg-white/20 backdrop-blur-md border border-white/30 text-white p-1.5 rounded">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </div>

            {hasMultipleRenders && (
              <>
                <button
                  onClick={() => stepRender(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/35 transition-colors cursor-pointer"
                  aria-label="Render anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => stepRender(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/35 transition-colors cursor-pointer"
                  aria-label="Render siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Floating caption */}
            <div className="pointer-events-none absolute bottom-6 left-6 right-6 text-white">
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#EADFC9] mb-1">
                Ambiente {pad(spaceIndex + 1)} · {space.group ?? projectName}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif">{space.name}</h2>
            </div>
          </div>

          {/* Space details & thumbnails */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-5 rounded-xl bg-[#EFECE5] border border-[#DFD9CD]">
              <div className="text-[10px] uppercase tracking-widest text-[#8A7149] mb-2">
                {space.group ? `${space.group} · ` : ''}Ambiente {pad(spaceIndex + 1)} de {pad(spaces.length)}
              </div>
              <h3 className="text-2xl font-serif text-[#211E1A] mb-2">{space.name}</h3>
              <p className="font-serif italic text-sm text-[#463F36] leading-relaxed">
                {space.description}
              </p>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
              {space.renders.map((r, index) => (
                <button
                  key={r.src}
                  onClick={() => setRenderIndex(index)}
                  className={`relative aspect-4/3 overflow-hidden rounded-lg bg-[#EBE7DF] border-2 transition-all cursor-pointer ${
                    index === renderIndex
                      ? 'border-[#8A7149]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={r.alt}
                >
                  <LitRender
                    render={r}
                    lightTime={lightTime}
                    size="thumb"
                    className="w-full h-full"
                    imgClassName="w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Full-screen lightbox, portaled to <body> so no ancestor style can turn
          `fixed` into a local containing block */}
      {lightboxOpen && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={space.name}
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
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {hasMultipleRenders && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); stepRender(-1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Render anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); stepRender(1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Render siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-5 left-0 right-0 text-center text-white/80 text-xs tracking-[0.2em] uppercase">
            {space.name} · {pad(renderIndex + 1)} / {pad(space.renders.length)}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
