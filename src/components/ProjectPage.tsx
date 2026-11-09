import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LightTime, PortfolioProject } from '../types';
import { usePublishedProjects } from '../store/SiteStore';
import { Link } from '../lib/router';
import { ProjectHeading } from './ProjectHeading';
import { SpaceGallery } from './SpaceGallery';

interface ProjectPageProps {
  project: PortfolioProject;
  initialLightTime?: LightTime;
  // The design board shows several pages at once and must not change the tab title
  manageTitle?: boolean;
}

// Dedicated page for one project: full gallery organized by space.
// Rendered with key={slug} so light and gallery state reset between projects.
export const ProjectPage: React.FC<ProjectPageProps> = ({ project, initialLightTime = 'zenith', manageTitle = true }) => {
  const [lightTime, setLightTime] = useState<LightTime>(initialLightTime);
  const portfolio = usePublishedProjects();

  const index = portfolio.findIndex((p) => p.id === project.id);
  const next = portfolio.length > 1 ? portfolio[(index + 1) % portfolio.length] : undefined;
  const fullName = `${project.kind} ${project.name}`;

  useEffect(() => {
    if (!manageTitle) return;
    const previousTitle = document.title;
    document.title = `${fullName} ◦ ANA DE ANDRADE`;
    return () => {
      document.title = previousTitle;
    };
  }, [fullName, manageTitle]);

  return (
    <section className="pt-28 md:pt-36 pb-20 px-4 sm:px-8 max-w-[80rem] mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-10 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-70 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        Todos los proyectos
      </Link>

      <ProjectHeading project={project} lightTime={lightTime} onLightChange={setLightTime} as="h1" />
      <SpaceGallery projectName={fullName} spaces={project.spaces} lightTime={lightTime} />

      {next && (
      <div className="mt-16 pt-8 border-t border-olive/30 flex justify-end">
        <Link to={`/proyectos/${next.slug}`} className="group text-right">
          <span className="block text-[11px] uppercase tracking-[0.3em] mb-1">Siguiente proyecto</span>
          <span className="inline-flex items-center gap-3 text-2xl sm:text-3xl">
            {next.kind} <span className="font-script">{next.name}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
      )}
    </section>
  );
};
