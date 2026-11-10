import React from 'react';
import { useSite, usePublishedProjects } from '../store/SiteStore';
import { goToSection, Link } from '../lib/router';

export const Footer: React.FC = () => {
  const { settings } = useSite();
  const projects = usePublishedProjects();

  return (
    <footer className="bg-ochre text-cream py-16 px-4 sm:px-8">
      <div className="max-w-[77rem] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b-2 border-cream">
          <div className="md:col-span-5">
            <span className="text-2xl font-semibold tracking-[0.25em] uppercase">
              {settings.studioName}
            </span>
          </div>

          <div className="md:col-span-3">
            <h5 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-3">Navegación</h5>
            <ul className="space-y-1.5 text-xs font-medium">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link to={`/proyectos/${project.slug}`} className="hover:text-white transition-colors">
                    {project.kind} {project.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/sobre-mi" className="hover:text-white transition-colors">
                  Sobre mí
                </Link>
              </li>
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
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="uppercase">{settings.location}</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-4 text-sm">
          <p className="md:col-span-5">
            © {new Date().getFullYear()} {settings.studioName} I {settings.copyrightName}
          </p>
          <div className="md:col-span-7 flex flex-wrap items-center justify-between gap-4 uppercase tracking-wider">
            <span>Privacidad</span>
            <span>Términos legales</span>
            <a
              href={`https://www.instagram.com/${settings.instagram.replace('@', '')}/`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram: {settings.instagram}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
