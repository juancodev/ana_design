/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ProjectModal } from './components/ProjectModal';
import { ObjectsCollection } from './components/ObjectsCollection';
import { PhilosophyMaterials } from './components/PhilosophyMaterials';
import { ProjectInquiry } from './components/ProjectInquiry';
import { Footer } from './components/Footer';
import { CmsStudio } from './components/CmsStudio';
import { ClientPitchModal } from './components/ClientPitchModal';
import { ChorosExperience } from './components/ChorosExperience';
import {
  initialStudioConfig,
  initialProjects,
  initialBespokeObjects,
} from './data/initialData';
import { Project, BespokeObject, StudioConfig } from './types';

export default function App() {
  const [studioConfig, setStudioConfig] = useState<StudioConfig>(initialStudioConfig);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [objects, setObjects] = useState<BespokeObject[]>(initialBespokeObjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cmsOpen, setCmsOpen] = useState<boolean>(false);
  const [pitchOpen, setPitchOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [inquirySubject, setInquirySubject] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Monitor scroll progress for the Alexander & CO. curtain effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 800;
      // Normalizes scroll from 0 (at the very top) to 1 (when scrolled 1 full screen)
      const progress = Math.min(Math.max(scrollY / vh, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeDesign: 'choros' | 'hybrid' = studioConfig.activeDesign || 'choros';

  const handleToggleDesign = (design: 'choros' | 'hybrid') => {
    setStudioConfig((prev) => ({
      ...prev,
      activeDesign: design,
    }));
  };

  // Handle consultation preselection
  const handleConsultProject = (projectTitle: string) => {
    setInquirySubject(`Proyecto: ${projectTitle}`);
    const element = document.getElementById('consulta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireObject = (objectName: string) => {
    setInquirySubject(`Pieza de Colección: ${objectName}`);
    const element = document.getElementById('consulta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetDefaults = () => {
    setStudioConfig(initialStudioConfig);
    setProjects(initialProjects);
    setObjects(initialBespokeObjects);
  };

  const isOlive = studioConfig.themeAtmosphere === 'olive';

  // Content curtain background color matching Alexander & CO. limestone palette or Olive Mineral Texture
  const getContentBgColor = () => {
    switch (studioConfig.themeAtmosphere) {
      case 'olive':
        return '#4E5537';
      case 'travertine':
        return '#FAF7EE';
      case 'noir':
        return '#F4F4F3';
      case 'limestone':
      default:
        return '#DAD8D2';
    }
  };

  return (
    <div className="relative min-h-screen font-sans bg-[#141311]">
      
      {/* 1. UNIFIED FLOATING HEADER (Morphs contrast and reveals centered logo as you scroll) */}
      <Header
        studioConfig={studioConfig}
        onOpenCms={() => setCmsOpen(!cmsOpen)}
        onOpenPitch={() => setPitchOpen(true)}
        cmsOpen={cmsOpen}
        activeDesign={activeDesign}
        onToggleDesign={handleToggleDesign}
        scrollProgress={scrollProgress}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* 2. CINEMATIC PINNED ARCHITECTURAL HERO (Sticky behind content, exactly like Alexander & CO.) */}
      <Hero
        studioConfig={studioConfig}
        projects={projects}
        onSelectProject={setSelectedProject}
        onOpenCms={() => setCmsOpen(true)}
        onOpenPitch={() => setPitchOpen(true)}
        onToggleDesign={handleToggleDesign}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollProgress={scrollProgress}
      />

      {/* 3. ARCHITECTURAL CONTENT CURTAIN (Rises smoothly over the pinned Hero on scroll down) */}
      <div 
        id="homeContentWrapper" 
        className="relative z-20 shadow-[0_-30px_70px_rgba(0,0,0,0.5)] transition-colors duration-500 text-[#191919]"
        style={{
          backgroundColor: getContentBgColor(),
        }}
      >
        {/* Alexander & CO. Iconic Practice Statement Header */}
        <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28 px-6 sm:px-12 max-w-5xl mx-auto text-center border-b border-[#CBC4B6]/60">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#7C7465] font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#191919]"></span>
            <span>{studioConfig.studioName} · Architectural Practice</span>
          </div>

          <p className="text-2xl sm:text-4xl lg:text-[44px] font-serif font-light text-[#191919] leading-[1.2] tracking-tight text-balance max-w-4xl mx-auto mb-6">
            &ldquo;Somos un atelier integrado de arquitectura y diseño interior especializado en proyectos de escala humana y alta precisión matérica.&rdquo;
          </p>

          <p className="text-base sm:text-xl font-serif text-[#635D52] italic font-light max-w-2xl mx-auto">
            Creamos santuarios habitables y atemporales para clientes que valoran la serenidad y la belleza de la calma.
          </p>
        </section>

        {/* Dynamic Studio Experience based on Selected Architectural Design */}
        <main className="flex-1">
          {activeDesign === 'choros' ? (
            /* DESIGN VARIANT A: PREVALENCIA STUDIO CHOROS (Sensorial, Poético & Mediterráneo) */
            <ChorosExperience
              studioConfig={studioConfig}
              projects={projects}
              objects={objects}
              onSelectProject={setSelectedProject}
              onInquireObject={handleInquireObject}
              onConsultProject={handleConsultProject}
            />
          ) : (
            /* DESIGN VARIANT B: ATELIER HÍBRIDO (Estructura Mas Creations + Alexander &CO) */
            <>
              {/* Projects Showcase: Mas Creations Bento vs Alexander &CO. Index */}
              <ProjectShowcase
                projects={projects}
                onSelectProject={setSelectedProject}
              />

              {/* Bespoke Objects & Collectible Design (Mas Creations structure) */}
              <ObjectsCollection
                objects={objects}
                onInquireObject={handleInquireObject}
              />

              {/* Materiality, Light & Acoustics (Studio Choros design) */}
              <PhilosophyMaterials
                studioConfig={studioConfig}
              />

              {/* Project Inquiry & Space Estimator (Alexander &CO. simplicity) */}
              <ProjectInquiry
                studioConfig={studioConfig}
                preselectedSubject={inquirySubject}
              />
            </>
          )}
        </main>

        {/* Editorial Studio Footer */}
        <Footer
          studioConfig={studioConfig}
          onOpenPitch={() => setPitchOpen(true)}
          onOpenCms={() => setCmsOpen(true)}
        />
      </div>

      {/* Architectural Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsultProject={handleConsultProject}
      />

      {/* Integrated Live CMS Management Studio */}
      <CmsStudio
        isOpen={cmsOpen}
        onClose={() => setCmsOpen(false)}
        projects={projects}
        setProjects={setProjects}
        objects={objects}
        setObjects={setObjects}
        studioConfig={studioConfig}
        setStudioConfig={setStudioConfig}
        onResetDefaults={handleResetDefaults}
      />

      {/* Client Pitch & Strategic UI/UX Proposal Drawer */}
      <ClientPitchModal
        isOpen={pitchOpen}
        onClose={() => setPitchOpen(false)}
      />

    </div>
  );
}
