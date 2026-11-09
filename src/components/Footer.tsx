import React from 'react';
import { StudioConfig } from '../types';
import { portfolio } from '../data/portfolio';
import { goToSection, Link } from '../lib/router';

interface FooterProps {
  studioConfig: StudioConfig;
}

export const Footer: React.FC<FooterProps> = ({ studioConfig }) => (
  <footer className="bg-ochre text-cream py-16 px-4 sm:px-8">
    <div className="max-w-[77rem] mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b-2 border-cream">
        <div className="md:col-span-5">
          <span className="text-2xl font-semibold tracking-[0.25em] uppercase">
            {studioConfig.studioName}
          </span>
        </div>

        <div className="md:col-span-3">
          <h5 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-3">Navegación</h5>
          <ul className="space-y-1.5 text-xs font-medium">
            {portfolio.map((project) => (
              <li key={project.slug}>
                <Link to={`/proyectos/${project.slug}`} className="hover:text-white transition-colors">
                  {project.kind} {project.name}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/#consulta"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection('consulta');
                }}
                className="hover:text-white transition-colors"
              >
                Contacto Directo
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h5 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-3">Contacto</h5>
          <ul className="space-y-1.5 text-xs font-medium">
            <li>
              <a href={`mailto:${studioConfig.email}`} className="hover:text-white transition-colors">
                {studioConfig.email}
              </a>
            </li>
            <li className="uppercase">{studioConfig.location}</li>
          </ul>
        </div>
      </div>

      <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-4 text-sm">
        <p className="md:col-span-5">
          © {new Date().getFullYear()} {studioConfig.studioName} I Ana De Andrade
        </p>
        <div className="md:col-span-7 flex flex-wrap items-center justify-between gap-4 uppercase tracking-wider">
          <span>Privacidad</span>
          <span>Términos legales</span>
          <a
            href={`https://www.instagram.com/${studioConfig.instagram.replace('@', '')}/`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram: {studioConfig.instagram}
          </a>
        </div>
      </div>

    </div>
  </footer>
);
