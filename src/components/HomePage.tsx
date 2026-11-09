import React from 'react';
import { useSite, usePublishedProjects } from '../store/SiteStore';
import { Hero } from './Hero';
import { Tagline } from './Tagline';
import { ProjectFeature } from './ProjectFeature';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

interface HomePageProps {
  scrollProgress: number;
  pinnedHero?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ scrollProgress, pinnedHero = true }) => {
  const { settings } = useSite();
  const projects = usePublishedProjects();

  return (
    <>
      <Hero image={settings.heroImage} scrollProgress={scrollProgress} pinned={pinnedHero} />

      {/* Content curtain that rises over the pinned hero */}
      <div id="homeContentWrapper" className="relative z-20 bg-cream shadow-[0_-30px_70px_rgba(0,0,0,0.5)]">
        <Tagline settings={settings} />

        <main className="pb-24 md:pb-64">
          {projects.map((project) => (
            <ProjectFeature key={project.id} project={project} />
          ))}
        </main>

        <ContactSection />
        <Footer />
      </div>
    </>
  );
};
