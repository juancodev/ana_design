import React, { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, ImageOff, Maximize2 } from 'lucide-react';
import { LightTime, PortfolioProject } from '../types';
import { Link } from '../lib/router';
import { LitRender } from './LitRender';
import { ProjectHeading } from './ProjectHeading';
import { RenderLightbox } from './RenderLightbox';

interface ProjectFeatureProps {
  project: PortfolioProject;
  // Starting state, used by the design board to show each variant
  initialLightTime?: LightTime;
  initialLightboxOpen?: boolean;
  inlineLightbox?: boolean;
}

// One project on the home page: heading, a single carousel over all its renders and a link to its page
export const ProjectFeature: React.FC<ProjectFeatureProps> = ({
  project,
  initialLightTime = 'zenith',
  initialLightboxOpen = false,
  inlineLightbox = false,
}) => {
  const [lightTime, setLightTime] = useState<LightTime>(initialLightTime);
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(initialLightboxOpen);

  const renders = project.spaces.flatMap((s) => s.renders);
  const render = renders[Math.min(index, renders.length - 1)];
  const hasMultiple = renders.length > 1;
  const projectPath = `/proyectos/${project.slug}`;

  const step = useCallback(
    (direction: 1 | -1) => setIndex((prev) => (prev + direction + renders.length) % renders.length),
    [renders.length]
  );
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  return (
    <section id={project.slug} className="scroll-mt-16 md:scroll-mt-20 py-16 px-4 sm:px-8 max-w-[80rem] mx-auto">
      <ProjectHeading project={project} lightTime={lightTime} onLightChange={setLightTime} />

      {!render ? (
        <div className="aspect-4/3 sm:aspect-16/10 rounded-xl bg-olive-light/50 border border-dashed border-olive/40 flex flex-col items-center justify-center gap-2 text-sm">
          <ImageOff className="w-6 h-6" />
          Este proyecto todavía no tiene renders.
        </div>
      ) : (
      <div className="group relative aspect-4/3 sm:aspect-16/10 overflow-hidden rounded-xl bg-olive-light">
        <LitRender
          key={render.src}
          render={render}
          lightTime={lightTime}
          fit={render.orientation === 'portrait' ? 'contain' : 'cover'}
          className="render-fade-in w-full h-full"
          imgClassName="w-full h-full"
        />

        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 p-1.5 rounded bg-cream/90 text-olive hover:bg-cream transition-colors cursor-pointer"
          aria-label={`Ampliar: ${render.alt}`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {hasMultiple && (
          <>
            <button
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-paper text-olive shadow-sm hover:bg-white transition-colors cursor-pointer"
              aria-label="Render anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-paper text-olive shadow-sm hover:bg-white transition-colors cursor-pointer"
              aria-label="Render siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
      )}

      <div className="flex justify-center mt-5">
        <Link
          to={projectPath}
          className="px-4 py-1.5 rounded-md bg-olive text-cream text-xs font-semibold uppercase hover:bg-olive/90 transition-colors"
        >
          Ver proyecto
        </Link>
      </div>

      {lightboxOpen && render && (
        <RenderLightbox
          inline={inlineLightbox}
          renders={renders}
          index={renders.indexOf(render)}
          lightTime={lightTime}
          caption={`${project.kind} ${project.name}`}
          onStep={step}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
};
