import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useSite, usePublishedProjects } from '../store/SiteStore';
import { goToSection, Link } from '../lib/router';

interface SiteMenuProps {
  onClose: () => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

// Full-screen navigation opened from the header's menu button
export const SiteMenu: React.FC<SiteMenuProps> = ({ onClose }) => {
  const { settings } = useSite();
  const portfolio = usePublishedProjects();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const linkClass =
    'group flex items-baseline gap-4 text-2xl sm:text-4xl md:text-5xl text-cream/85 hover:text-cream transition-all hover:translate-x-2';

  return (
    <div
      className="fixed inset-0 z-50 bg-olive text-cream flex flex-col p-6 sm:p-14 md:p-20 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
    >
      <div className="flex items-center justify-between border-b border-cream/20 pb-6">
        <span className="font-script text-3xl">{settings.studioName}</span>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-cream/70 hover:text-cream transition-colors cursor-pointer"
        >
          <span>Cerrar</span>
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex flex-col gap-5 sm:gap-7 my-auto py-10">
        <span className="text-[11px] uppercase tracking-[0.3em] text-cream/60">Proyectos</span>
        {portfolio.map((project, index) => (
          <Link key={project.id} to={`/proyectos/${project.slug}`} onClick={onClose} className={linkClass}>
            <span className="text-sm text-cream/50">{pad(index + 1)}</span>
            <span>
              {project.kind} <span className="font-script">{project.name}</span>
            </span>
          </Link>
        ))}
        <a
          href="/#consulta"
          onClick={(e) => {
            e.preventDefault();
            onClose();
            goToSection('consulta');
          }}
          className={linkClass}
        >
          <span className="text-sm text-cream/50">{pad(portfolio.length + 1)}</span>
          <span>Comisionar proyecto</span>
        </a>
      </nav>

      <div className="border-t border-cream/20 pt-6 flex flex-wrap gap-4 justify-between text-xs tracking-wider text-cream/70">
        <span className="uppercase">{settings.location}</span>
        <a href={`mailto:${settings.email}`} className="hover:text-cream">{settings.email}</a>
        <span>{settings.instagram}</span>
      </div>
    </div>
  );
};
