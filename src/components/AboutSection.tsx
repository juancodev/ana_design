import React from 'react';
import { AboutContent } from '../types';
import { Link } from '../lib/router';

// Silhouette shown until the real portrait is uploaded from the CMS
export const PortraitPlaceholder: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 360 520" className={className} role="img" aria-label="Espacio para la foto de Ana">
    <circle cx="180" cy="120" r="72" fill="currentColor" />
    <path d="M40 520 C40 330 90 240 180 240 C270 240 320 330 320 520 Z" fill="currentColor" />
    <text x="180" y="430" textAnchor="middle" fontSize="15" fill="#F7F5EE" fontFamily="Poppins, sans-serif" letterSpacing="3">
      FOTO DE ANA
    </text>
  </svg>
);

// Outlined script word, like a neon sign crossing the portrait
const ScriptWord: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <span
    aria-hidden="true"
    className={`font-script leading-none whitespace-nowrap text-cream-light pointer-events-none select-none ${className}`}
    style={{ WebkitTextStroke: '2px #7B3D2C', textShadow: '0 4px 18px rgba(123, 61, 44, 0.25)' }}
  >
    {text}
  </span>
);

// Short introduction of the designer between the projects and the inquiry form
export const AboutSection: React.FC<{ about: AboutContent }> = ({ about }) => (
  <section id="sobre-ana" className="relative overflow-hidden bg-cream px-4 sm:px-8 pt-20 lg:pt-24 scroll-mt-16 md:scroll-mt-20">
    {/* Organic background shapes */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 760" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-40 140 C160 40 380 90 460 230 C540 370 430 520 300 600 C170 680 20 700 -40 640 Z" className="fill-olive-light/35" />
      <path d="M560 60 C700 -20 900 30 960 170 C1020 310 980 520 860 640 C760 740 600 760 540 640 C470 500 430 150 560 60 Z" className="fill-terracotta/10" />
      <path d="M1180 420 C1300 360 1480 400 1500 520 C1520 640 1400 760 1260 760 C1150 760 1080 520 1180 420 Z" className="fill-olive-light/25" />
    </svg>

    <div className="relative max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 lg:min-h-[620px]">
      {/* Name and introduction */}
      <div className="lg:col-span-4 lg:self-center lg:pb-24">
        <h2 className="font-sans text-7xl lg:text-[112px] font-bold leading-[0.9] tracking-tight text-terracotta">
          {about.firstName}
        </h2>
        <p className="mt-3 text-sm font-bold uppercase tracking-wide">{about.role}</p>
        <p className="mt-8 font-semibold leading-relaxed">{about.introLead}</p>
        <p className="mt-5 text-sm leading-relaxed">{about.introBody}</p>
      </div>

      {/* Portrait */}
      <div className="relative lg:col-span-4 flex justify-center items-end">
        {about.photo ? (
          <img src={about.photo} alt={`${about.firstName} ${about.lastName}`} className="w-full max-w-[360px] max-h-[600px] object-contain object-bottom" />
        ) : (
          <PortraitPlaceholder className="w-full max-w-[340px] text-olive-light" />
        )}
        <ScriptWord text={about.scriptWord} className="lg:hidden absolute top-[38%] left-1/2 -translate-x-1/2 -rotate-6 text-6xl" />
      </div>

      {/* Script word over the portrait (large screens) */}
      <ScriptWord
        text={about.scriptWord}
        className="hidden lg:block absolute top-[36%] left-[50%] -rotate-6 text-[120px] z-10"
      />

      {/* Closing text and link to the "Sobre mí" page */}
      <div className="lg:col-span-4 lg:self-end pb-16 lg:pb-28 lg:pt-56">
        <p className="leading-relaxed">{about.sideText}</p>
        <Link
          to="/sobre-mi"
          className="inline-block mt-8 px-7 py-2.5 rounded-full bg-terracotta text-cream text-sm font-bold uppercase tracking-wide hover:bg-terracotta/90 transition-colors"
        >
          {about.buttonLabel}
        </Link>
      </div>
    </div>
  </section>
);
