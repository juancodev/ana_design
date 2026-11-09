import React from 'react';
import { SiteSettings } from '../types';

// Turns "que *abracen* la vida" into text with the starred words in bold italics
export const renderEmphasis = (text: string) =>
  text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
      <strong key={i} className="font-semibold italic">{part.slice(1, -1)}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

interface TaglineProps {
  settings: Pick<SiteSettings, 'taglineEyebrow' | 'tagline'>;
}

// Terracotta band under the hero with the studio's tagline
export const Tagline: React.FC<TaglineProps> = ({ settings }) => (
  <section className="bg-terracotta text-cream py-24 sm:py-28 px-6 text-center">
    <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-semibold mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-cream"></span>
      <span>{settings.taglineEyebrow}</span>
    </div>
    <p className="text-2xl sm:text-[32px] font-light leading-[1.3] max-w-xl mx-auto text-balance">
      {renderEmphasis(settings.tagline)}
    </p>
  </section>
);
