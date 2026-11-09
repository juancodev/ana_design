/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SiteMenu } from './components/SiteMenu';
import { ProjectFeature } from './components/ProjectFeature';
import { ProjectPage } from './components/ProjectPage';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CmsStudio } from './components/CmsStudio';
import { ClientPitchModal } from './components/ClientPitchModal';
import {
  initialStudioConfig,
  initialProjects,
  initialBespokeObjects,
} from './data/initialData';
import { findProject, portfolio } from './data/portfolio';
import { navigate, usePath } from './lib/router';
import { Project, BespokeObject, StudioConfig } from './types';

// Private entry points (not linked from the public site) until the backend adds real login
const CMS_HASH = '#admin';
const PITCH_HASH = '#propuesta';

export default function App() {
  const path = usePath();
  const [studioConfig, setStudioConfig] = useState<StudioConfig>(initialStudioConfig);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [objects, setObjects] = useState<BespokeObject[]>(initialBespokeObjects);
  const [cmsOpen, setCmsOpen] = useState<boolean>(false);
  const [pitchOpen, setPitchOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const projectSlug = path.match(/^\/proyectos\/([^/]+)\/?$/)?.[1];
  const currentProject = projectSlug ? findProject(projectSlug) : undefined;

  // Unknown project or path: go back to the home page
  useEffect(() => {
    if (path !== '/' && !currentProject) navigate('/');
  }, [path, currentProject]);

  // Open the CMS or the pitch dossier from their private hashes
  useEffect(() => {
    const syncHash = () => {
      setCmsOpen(window.location.hash === CMS_HASH);
      setPitchOpen(window.location.hash === PITCH_HASH);
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const clearHash = () => window.history.replaceState({}, '', window.location.pathname);

  // Monitor scroll progress for the pinned hero curtain effect
  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight || 800;
      setScrollProgress(Math.min(Math.max(window.scrollY / vh, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResetDefaults = () => {
    setStudioConfig(initialStudioConfig);
    setProjects(initialProjects);
    setObjects(initialBespokeObjects);
  };

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <div className="relative min-h-screen font-sans bg-olive">

      <Header onOpenMenu={() => setIsMenuOpen(true)} />

      {currentProject ? (
        <div className="bg-cream">
          <main>
            <ProjectPage key={currentProject.slug} project={currentProject} />
          </main>
          <ContactSection />
          <Footer studioConfig={studioConfig} />
        </div>
      ) : (
        <>
          {/* Pinned hero: the content below rises over it on scroll */}
          <Hero studioConfig={studioConfig} projects={projects} scrollProgress={scrollProgress} />

          <div id="homeContentWrapper" className="relative z-20 bg-cream shadow-[0_-30px_70px_rgba(0,0,0,0.5)]">
            {/* Studio tagline */}
            <section className="bg-terracotta text-cream py-24 sm:py-28 px-6 text-center">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cream"></span>
                <span>Ana de Andrade · Interior Design</span>
              </div>
              <p className="text-2xl sm:text-[32px] font-light leading-[1.3] max-w-xl mx-auto text-balance">
                Diseñar espacios que <strong className="font-semibold italic">abracen</strong> la vida y un{' '}
                <strong className="font-semibold italic">corazón</strong> en cada detalle
              </p>
            </section>

            <main className="pb-24 md:pb-64">
              {portfolio.map((project) => (
                <ProjectFeature key={project.slug} project={project} />
              ))}
            </main>

            <ContactSection />
            <Footer studioConfig={studioConfig} />
          </div>
        </>
      )}

      {isMenuOpen && <SiteMenu studioConfig={studioConfig} onClose={closeMenu} />}

      {/* Content manager (private: /#admin) */}
      <CmsStudio
        isOpen={cmsOpen}
        onClose={() => {
          setCmsOpen(false);
          clearHash();
        }}
        projects={projects}
        setProjects={setProjects}
        objects={objects}
        setObjects={setObjects}
        studioConfig={studioConfig}
        setStudioConfig={setStudioConfig}
        onResetDefaults={handleResetDefaults}
      />

      {/* Client pitch dossier (private: /#propuesta) */}
      <ClientPitchModal
        isOpen={pitchOpen}
        onClose={() => {
          setPitchOpen(false);
          clearHash();
        }}
      />

    </div>
  );
}
