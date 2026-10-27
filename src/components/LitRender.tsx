import React from 'react';
import { LightTime, SpaceRender } from '../types';
import { LIGHT_GRADES, LIGHT_TRANSITION } from '../data/lightStudy';

interface LitRenderProps {
  render: SpaceRender;
  lightTime: LightTime;
  size?: 'full' | 'thumb';
  fit?: 'cover' | 'contain';
  // Classes for the wrapper; the overlays always match its box
  className?: string;
  // Classes for the in-flow image (sets the wrapper size when it is not absolutely sized)
  imgClassName?: string;
}

const LIGHT_TIMES: LightTime[] = ['dawn', 'zenith', 'dusk'];

/**
 * Shows a render under the selected light.
 * - With real per-time renders (Option B) it cross-fades between them.
 * - Otherwise (Option A) it color-grades the single render with filters and blend layers.
 */
export const LitRender: React.FC<LitRenderProps> = ({
  render,
  lightTime,
  size = 'full',
  fit = 'cover',
  className = '',
  imgClassName = '',
}) => {
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';
  const pick = (img: { src: string; thumb: string }) => (size === 'thumb' ? img.thumb : img.src);

  if (render.lightVariants) {
    const variants = render.lightVariants;
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* Base layer keeps the wrapper sized; variants fade in on top */}
        <img src={pick(render)} alt={render.alt} className={`${fitClass} ${imgClassName}`} />
        {LIGHT_TIMES.map((t) => {
          const variant = variants[t];
          if (!variant) return null;
          return (
            <img
              key={t}
              src={pick(variant)}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full ${fitClass}`}
              style={{ opacity: t === lightTime ? 1 : 0, transition: `opacity ${LIGHT_TRANSITION}` }}
            />
          );
        })}
      </div>
    );
  }

  const grade = LIGHT_GRADES[lightTime];
  const layer = (opacity: number): React.CSSProperties => ({
    opacity,
    transition: `opacity ${LIGHT_TRANSITION}`,
  });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={pick(render)}
        alt={render.alt}
        loading={size === 'thumb' ? 'lazy' : undefined}
        className={`${fitClass} ${imgClassName}`}
        style={{ filter: grade.filter, transition: `filter ${LIGHT_TRANSITION}, transform 1000ms ease` }}
      />

      {/* Low morning sun entering from one side */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          ...layer(grade.warmth),
          background:
            'linear-gradient(115deg, rgba(255,170,90,0.85) 0%, rgba(255,205,150,0.4) 45%, rgba(255,230,200,0) 80%)',
        }}
      />

      {/* Blue-hour night tint */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{ ...layer(grade.night), background: 'linear-gradient(180deg, #1F2B5C 0%, #2A3566 100%)' }}
      />

      {/* Warm lamp glow at the center of the room */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          ...layer(grade.lampGlow),
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255,190,120,0.9) 0%, rgba(255,170,100,0.3) 35%, rgba(0,0,0,0) 65%)',
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          ...layer(grade.vignette),
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
};
