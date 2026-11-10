/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SiteMenu } from './components/SiteMenu';
import { ProjectPage } from './components/ProjectPage';
import { AboutPage } from './components/AboutPage';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ClientPitchModal } from './components/ClientPitchModal';
import { DesignBoard } from './components/DesignBoard';
import { CmsApp } from './cms/CmsApp';
import { SiteProvider, usePublishedProjects, useSite } from './store/SiteStore';
import { navigate, usePath } from './lib/router';

// Private entry point (not linked from the public site)
const PITCH_HASH = '#propuesta';

// Keeps the CMS and the design board out of search results
const useNoIndex = (active: boolean) => {
  useEffect(() => {
    if (!active) return;
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, [active]);
};

const PublicSite: React.FC<{ path: string }> = ({ path }) => {
  const projects = usePublishedProjects();
  const { about } = useSite();
  const [pitchOpen, setPitchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const projectSlug = path.match(/^\/proyectos\/([^/]+)\/?$/)?.[1];
  const currentProject = projectSlug ? projects.find((p) => p.slug === projectSlug) : undefined;
  const isAbout = /^\/sobre-mi\/?$/.test(path);

  // Unknown project or path: go back to the home page
  useEffect(() => {
    if (path !== '/' && !currentProject && !isAbout) navigate('/');
  }, [path, currentProject, isAbout]);

  // Open the pitch dossier from its private hash
  useEffect(() => {
    const syncHash = () => setPitchOpen(window.location.hash === PITCH_HASH);
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  // Scroll progress drives the pinned hero curtain effect
  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight || 800;
      setScrollProgress(Math.min(Math.max(window.scrollY / vh, 0), 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <div className="relative min-h-screen font-sans bg-olive">
      <Header onOpenMenu={() => setIsMenuOpen(true)} />

      {currentProject || isAbout ? (
        <div className="bg-cream">
          <main>
            {currentProject ? <ProjectPage key={currentProject.id} project={currentProject} /> : <AboutPage about={about} />}
          </main>
          <ContactSection />
          <Footer />
        </div>
      ) : (
        <HomePage scrollProgress={scrollProgress} />
      )}

      {isMenuOpen && <SiteMenu onClose={closeMenu} />}

      {/* Client pitch dossier (private: /#propuesta) */}
      <ClientPitchModal
        isOpen={pitchOpen}
        onClose={() => {
          setPitchOpen(false);
          window.history.replaceState({}, '', window.location.pathname);
        }}
      />
    </div>
  );
};

const AppRoutes: React.FC = () => {
  const path = usePath();
  const isCms = path === '/admin' || path.startsWith('/admin/');
  const isBoard = path === '/vistas' || path === '/vistas/';
  useNoIndex(isCms || isBoard);

  if (isCms) return <CmsApp />;
  if (isBoard) return <DesignBoard />;
  return <PublicSite path={path} />;
};

export default function App() {
  return (
    <SiteProvider>
      <AppRoutes />
    </SiteProvider>
  );
}
