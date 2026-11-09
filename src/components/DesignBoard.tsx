import React from 'react';
import { useSite } from '../store/SiteStore';
import { CmsApp } from '../cms/CmsApp';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { ProjectFeature } from './ProjectFeature';
import { ProjectPage } from './ProjectPage';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { SiteMenu } from './SiteMenu';

const noop = () => {};

interface FrameProps {
  id: string;
  number: number;
  title: string;
  note: string;
  // Fixed height for screens built around the viewport (menu, viewer, CMS sign-in)
  height?: number;
  children: React.ReactNode;
}

// One labelled screen. The transform makes `position: fixed` children (header, menu, viewer)
// stay inside the frame instead of covering the board.
const Frame: React.FC<FrameProps> = ({ id, number, title, note, height, children }) => (
  <section id={id} className="scroll-mt-6">
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 sm:px-8 py-4">
      <span className="text-xs font-semibold text-olive/50">{String(number).padStart(2, '0')}</span>
      <h2 className="font-sans text-lg font-semibold text-olive">{title}</h2>
      <span className="text-xs text-olive/60">{note}</span>
    </div>
    <div
      className="relative overflow-hidden bg-cream border-y border-olive/20"
      style={{ transform: 'translateZ(0)', height }}
    >
      {children}
    </div>
  </section>
);

// Every screen of the site and the CMS on one page, for importing into Figma with html.to.design
export const DesignBoard: React.FC = () => {
  const { projects } = useSite();
  const published = projects.filter((p) => p.published);
  const restaurant = published.find((p) => p.spaces.some((s) => s.renders.some((r) => r.lightVariants))) ?? published[0];
  const firstProject = published[0];

  const siteFrames: Omit<FrameProps, 'number'>[] = [
    {
      id: 'portada',
      title: 'Portada',
      note: 'Página de inicio completa con la luz de Tarde.',
      children: (
        <>
          <Header onOpenMenu={noop} />
          <HomePage scrollProgress={0} pinnedHero={false} />
        </>
      ),
    },
    ...(firstProject
      ? [
          {
            id: 'portada-manana',
            title: 'Proyecto en portada · Mañana',
            note: 'Estudio de Luz con el filtro de mañana.',
            children: <ProjectFeature project={firstProject} initialLightTime="dawn" />,
          },
        ]
      : []),
    ...(restaurant
      ? [
          {
            id: 'portada-noche',
            title: 'Proyecto en portada · Noche',
            note: 'Estudio de Luz con renders reales de noche.',
            children: <ProjectFeature project={restaurant} initialLightTime="dusk" />,
          },
          {
            id: 'visor',
            title: 'Visor de imagen',
            note: 'Al pulsar ampliar sobre un render.',
            height: 900,
            children: <ProjectFeature project={restaurant} initialLightboxOpen inlineLightbox />,
          },
        ]
      : []),
    {
      id: 'menu',
      title: 'Menú abierto',
      note: 'Botón de menú del header.',
      height: 900,
      children: <SiteMenu onClose={noop} />,
    },
    ...published.map((project) => ({
      id: `proyecto-${project.slug}`,
      title: `Página · ${project.kind} ${project.name}`,
      note: `/proyectos/${project.slug}`,
      children: (
        <>
          <Header onOpenMenu={noop} />
          <ProjectPage project={project} manageTitle={false} />
          <Footer />
        </>
      ),
    })),
    {
      id: 'formulario-error',
      title: 'Formulario · Con errores',
      note: 'Al enviar sin nombre ni correo.',
      children: <ContactSection initialState="error" />,
    },
    {
      id: 'formulario-enviado',
      title: 'Formulario · Enviado',
      note: 'Confirmación tras enviar la solicitud.',
      children: <ContactSection initialState="sent" />,
    },
  ];

  const cmsFrames: Omit<FrameProps, 'number'>[] = [
    { id: 'cms-acceso', title: 'CMS · Inicio de sesión', note: '/admin', height: 900, children: <CmsApp embeddedPath="/admin/login" className="h-full" /> },
    { id: 'cms-panel', title: 'CMS · Panel', note: 'Resumen y accesos rápidos.', children: <CmsApp embeddedPath="/admin" className="min-h-[900px]" /> },
    { id: 'cms-proyectos', title: 'CMS · Proyectos', note: 'Orden, publicación y edición.', children: <CmsApp embeddedPath="/admin/proyectos" className="min-h-[900px]" /> },
    ...(firstProject
      ? [
          {
            id: 'cms-editor',
            title: 'CMS · Editor de proyecto',
            note: 'Información, ambientes, renders y vista previa.',
            children: <CmsApp embeddedPath={`/admin/proyectos/${firstProject.id}`} className="min-h-[900px]" />,
          },
        ]
      : []),
    { id: 'cms-mensajes', title: 'CMS · Mensajes', note: 'Bandeja del formulario.', children: <CmsApp embeddedPath="/admin/mensajes" className="min-h-[900px]" /> },
    { id: 'cms-contenido', title: 'CMS · Contenido del sitio', note: 'Portada, formulario, contacto y redes.', children: <CmsApp embeddedPath="/admin/contenido" className="min-h-[900px]" /> },
  ];

  const numbered = (frames: Omit<FrameProps, 'number'>[], offset: number) => frames.map((f, i) => ({ ...f, number: offset + i + 1 }));
  const site = numbered(siteFrames, 0);
  const cms = numbered(cmsFrames, site.length);

  return (
    <div className="bg-paper text-olive font-sans min-h-screen">
      <header className="px-4 sm:px-8 py-10 border-b border-olive/15">
        <span className="text-[11px] uppercase tracking-[0.3em]">De Andrade · Interior Design</span>
        <h1 className="font-sans text-3xl sm:text-4xl font-semibold mt-1">Mesa de diseño</h1>
        <p className="text-sm text-olive/70 mt-2 max-w-2xl">
          Todas las vistas de la web y del gestor de contenidos en una sola página, para importarlas en Figma con
          html.to.design: una importación a 1440 px (escritorio) y otra a 390 px (móvil).
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mt-6 text-sm">
          {[
            { label: 'Sitio web', frames: site },
            { label: 'Gestor de contenidos (CMS)', frames: cms },
          ].map(({ label, frames }) => (
            <div key={label}>
              <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold mb-2">{label}</h2>
              <ol className="space-y-1">
                {frames.map((f) => (
                  <li key={f.id}>
                    <a href={`#${f.id}`} className="hover:underline">
                      <span className="text-olive/50 mr-2">{String(f.number).padStart(2, '0')}</span>
                      {f.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </header>

      <div className="space-y-12 py-10">
        <h2 className="px-4 sm:px-8 font-sans text-xs uppercase tracking-[0.3em] font-semibold">Sitio web</h2>
        {site.map(({ id, ...frame }) => <Frame key={id} id={id} {...frame} />)}
        <h2 className="px-4 sm:px-8 pt-10 font-sans text-xs uppercase tracking-[0.3em] font-semibold">Gestor de contenidos (CMS)</h2>
        {cms.map(({ id, ...frame }) => <Frame key={id} id={id} {...frame} />)}
      </div>
    </div>
  );
};
