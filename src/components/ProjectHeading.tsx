import React from 'react';
import { LightTime, PortfolioProject } from '../types';
import { LightStudyBar } from './LightStudyBar';

interface ProjectHeadingProps {
  project: PortfolioProject;
  lightTime: LightTime;
  onLightChange: (lightTime: LightTime) => void;
  // The project page uses an <h1>; the home list uses <h2>
  as?: 'h1' | 'h2';
}

// Location, two-part title, divider, light study bar and description
export const ProjectHeading: React.FC<ProjectHeadingProps> = ({ project, lightTime, onLightChange, as: Title = 'h2' }) => (
  <>
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] mb-2">
      <span className="inline-block w-2 h-2 rounded-full bg-olive"></span>
      <span>{project.location}</span>
    </div>
    <Title className="font-sans text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[1.15] tracking-tight text-olive">
      {project.kind}{' '}
      <span className="font-script text-[1.05em] leading-none whitespace-nowrap">{project.name}</span>
    </Title>
    <hr className="border-0 border-t border-olive/80 mt-6 mb-10" />

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-9 items-start">
      <LightStudyBar lightTime={lightTime} onChange={onLightChange} className="lg:col-span-6 lg:mr-10" />
      <p className="lg:col-start-8 lg:col-span-5 lg:justify-self-end max-w-[29.5rem] text-sm leading-relaxed">
        {project.description}
      </p>
    </div>
  </>
);
