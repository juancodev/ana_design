import React, { useEffect } from 'react';
import { ArrowDown, ArrowLeft } from 'lucide-react';
import { AboutContent } from '../types';
import { Link } from '../lib/router';
import { PortraitPlaceholder } from './AboutSection';

const pad = (n: number) => String(n).padStart(2, '0');

// Two-letter monogram used in place of software logos
const monogram = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const SectionTitle: React.FC<{ eyebrow: string; title: string; light?: boolean }> = ({ eyebrow, title, light }) => (
  <div className="mb-10">
    <span className={`block text-[11px] uppercase tracking-[0.3em] mb-2 ${light ? 'text-cream/70' : ''}`}>{eyebrow}</span>
    <h2 className={`font-sans text-3xl sm:text-4xl font-semibold ${light ? 'text-cream' : 'text-olive'}`}>{title}</h2>
  </div>
);

interface AboutPageProps {
  about: AboutContent;
  // The design board shows the page inside a frame and must not change the tab title
  manageTitle?: boolean;
}

// "Sobre mí": the designer's story, path, way of working and the tools she uses
export const AboutPage: React.FC<AboutPageProps> = ({ about, manageTitle = true }) => {
  const fullName = `${about.firstName} ${about.lastName}`;
  const paragraphs = about.story.split(/\n\s*\n/).filter((p) => p.trim());
  const categories = [...new Set(about.tools.map((t) => t.category))];

  useEffect(() => {
    if (!manageTitle) return;
    const previousTitle = document.title;
    document.title = `Sobre mí ◦ ${fullName.toUpperCase()}`;
    return () => {
      document.title = previousTitle;
    };
  }, [fullName, manageTitle]);

  return (
    <>
      {/* Introduction */}
      <section className="pt-28 md:pt-36 pb-16 px-4 sm:px-8 max-w-[80rem] mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 mb-10 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-4 h-4" />
          Inicio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-olive"></span>
              <span>Sobre mí</span>
            </div>
            <h1 className="font-sans text-5xl sm:text-6xl lg:text-[72px] font-normal leading-[1.1] tracking-tight text-olive">
              {about.firstName} <span className="font-script text-[1.05em] whitespace-nowrap">{about.lastName}</span>
            </h1>
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-terracotta">{about.role}</p>
            <div className="mt-8 space-y-4 leading-relaxed max-w-2xl">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-t-full bg-olive-light overflow-hidden flex items-end justify-center">
              {about.photo ? (
                <img src={about.photo} alt={fullName} className="w-full h-full object-contain object-bottom" />
              ) : (
                <PortraitPlaceholder className="w-4/5 text-cream/70" />
              )}
            </div>
          </div>
        </div>

        {about.pagePhotos.length > 0 && (
          <div className={`grid gap-6 mt-16 ${about.pagePhotos.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {about.pagePhotos.map((src, i) => (
              <img key={i} src={src} alt={`${fullName} · foto ${i + 1}`} className="w-full aspect-4/3 object-cover rounded-xl" />
            ))}
          </div>
        )}
      </section>

      {/* Path */}
      {about.milestones.length > 0 && (
        <section className="pb-20 px-4 sm:px-8 max-w-[80rem] mx-auto">
          <SectionTitle eyebrow="Trayectoria" title="Mi camino" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.milestones.map((m, i) => (
              <li key={i} className="border-t-2 border-olive pt-5">
                <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-terracotta">{m.period}</span>
                <h3 className="font-sans text-lg font-semibold text-olive mt-2">{m.title}</h3>
                <p className="text-sm leading-relaxed mt-2">{m.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Way of working */}
      {about.process.length > 0 && (
        <section className="bg-olive text-cream py-20 px-4 sm:px-8">
          <div className="max-w-[80rem] mx-auto">
            <SectionTitle eyebrow="Cómo trabajo" title="Del primer encuentro a la obra terminada" light />
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {about.process.map((step, i) => (
                <li key={i}>
                  <span className="block text-5xl font-light text-cream/40">{pad(i + 1)}</span>
                  <h3 className="font-sans text-lg font-semibold text-cream mt-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed mt-2 text-cream/80">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Tools and software */}
      {about.tools.length > 0 && (
        <section id="herramientas" className="py-20 px-4 sm:px-8 max-w-[80rem] mx-auto">
          <SectionTitle eyebrow="Herramientas y programas" title="Con qué diseño" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category} className="rounded-xl bg-cream-light/60 border border-olive/15 p-5">
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-olive mb-4">{category}</h3>
                <ul className="space-y-3">
                  {about.tools.filter((t) => t.category === category).map((tool) => (
                    <li key={tool.name} className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-olive text-cream text-xs font-bold flex items-center justify-center shrink-0">
                        {monogram(tool.name)}
                      </span>
                      <span className="font-medium">{tool.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="bg-terracotta text-cream py-16 px-4 sm:px-8 text-center">
        <h2 className="font-sans text-3xl sm:text-4xl font-semibold text-cream">{about.ctaTitle}</h2>
        <p className="mt-3 max-w-xl mx-auto text-cream/85">{about.ctaText}</p>
        <a
          href="#consulta"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('consulta')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 mt-8 px-7 py-2.5 rounded-full bg-cream text-terracotta text-sm font-bold uppercase tracking-wide hover:bg-cream-light transition-colors"
        >
          Comisionar proyecto
          <ArrowDown className="w-4 h-4" />
        </a>
      </section>
    </>
  );
};
