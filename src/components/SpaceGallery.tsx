import React, { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { LightTime, ProjectSpace } from '../types';
import { LitRender } from './LitRender';
import { RenderLightbox } from './RenderLightbox';

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

  const stepRender = useCallback(
    (direction: 1 | -1) =>
      setRenderIndex((prev) => (prev + direction + space.renders.length) % space.renders.length),
    [space.renders.length]
  );
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  return (
    <>
      {/* Space selector (one tab per space, grouped by zone when defined) */}
      {spaces.length > 1 && (
        <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
          <div className="flex flex-col gap-3 min-w-max">
            {tabGroups.map(({ group, items }) => (
              <div key={group ?? 'default'} className="flex items-center gap-2">
                {group && (
                  <span className="w-24 shrink-0 text-[10px] uppercase tracking-[0.25em] font-medium">
                    {group}
                  </span>
                )}
                {items.map(({ space: s, index }) => (
                  <button
                    key={s.id}
                    onClick={() => selectSpace(index)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase rounded-lg border transition-all cursor-pointer ${
                      index === spaceIndex
                        ? 'bg-olive text-cream border-olive'
                        : 'bg-cream-light/60 text-olive border-olive/20 hover:border-olive'
                    }`}
                  >
                    <span className="text-[11px] opacity-60">{pad(index + 1)}</span>
                    <span className="font-medium">{s.name}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Primary render */}
        <div className="lg:col-span-8 group relative aspect-4/3 sm:aspect-16/10 overflow-hidden rounded-xl bg-olive-light">
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80"></div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            {render.lightVariants && (
              <span className="bg-olive/90 text-cream text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded">
                Luz real
              </span>
            )}
            <span className="bg-olive/90 text-cream text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded">
              {pad(renderIndex + 1)} / {pad(space.renders.length)}
            </span>
            <span className="pointer-events-none bg-cream/90 text-olive p-1.5 rounded">
              <Maximize2 className="w-3.5 h-3.5" />
            </span>
          </div>

          {hasMultipleRenders && (
            <>
              <button
                onClick={() => stepRender(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-paper text-olive shadow-sm hover:bg-white transition-colors cursor-pointer"
                aria-label="Render anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => stepRender(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-paper text-olive shadow-sm hover:bg-white transition-colors cursor-pointer"
                aria-label="Render siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Floating caption */}
          <div className="pointer-events-none absolute bottom-6 left-6 right-6 text-white">
            <div className="text-[10px] tracking-[0.25em] uppercase text-cream mb-1">
              Ambiente {pad(spaceIndex + 1)} · {space.group ?? projectName}
            </div>
            <div className="text-2xl sm:text-3xl">{space.name}</div>
          </div>
        </div>

        {/* Space details & thumbnails */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-5 rounded-xl bg-cream-light/60 border border-olive/15">
            <div className="text-[10px] uppercase tracking-widest mb-2">
              {space.group ? `${space.group} · ` : ''}Ambiente {pad(spaceIndex + 1)} de {pad(spaces.length)}
            </div>
            <h3 className="font-sans text-2xl text-olive mb-2">{space.name}</h3>
            <p className="text-sm leading-relaxed">
              {space.description}
            </p>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
            {space.renders.map((r, index) => (
              <button
                key={r.src}
                onClick={() => setRenderIndex(index)}
                className={`relative aspect-4/3 overflow-hidden rounded-lg bg-olive-light border-2 transition-all cursor-pointer ${
                  index === renderIndex
                    ? 'border-olive'
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

      {lightboxOpen && (
        <RenderLightbox
          renders={space.renders}
          index={renderIndex}
          lightTime={lightTime}
          caption={space.name}
          onStep={stepRender}
          onClose={closeLightbox}
        />
      )}
    </>
  );
};
