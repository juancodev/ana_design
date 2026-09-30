import React, { useState } from 'react';
import { X, MapPin, Calendar, Maximize, UserCheck, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onConsultProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onConsultProject,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  const allImages = [project.coverImage, ...(project.secondaryImages || [])];
  const currentImage = allImages[activeImageIndex] || project.coverImage;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-5xl bg-[#F8F7F4] rounded-lg shadow-2xl border border-[#DCD5C9] overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#E5DFD4] flex items-center justify-between bg-[#F4F2EC]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A746B]">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.status}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#524D45] hover:text-[#1A1917] hover:bg-[#EAE5DC] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-10">
          
          {/* Main Gallery Display */}
          <div>
            <div className="aspect-[16/10] w-full rounded-md overflow-hidden bg-[#E2DED6] border border-[#D5CFC3] relative shadow-inner">
              <img
                src={currentImage}
                alt={`${project.title} - Vista ${activeImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>

            {/* Gallery Thumbnails (if multiple images) */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-20 h-14 rounded overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === i
                        ? 'border-[#1A1917] scale-102 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Title & Architectural Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1917] font-light leading-tight">
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base text-[#6E685F] mt-1 font-light">
                  {project.subtitle}
                </p>
              </div>

              <div className="border-t border-[#E8E2D7] pt-6">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#8A7149] font-medium mb-3">
                  Memoria Arquitectónica
                </h4>
                <p className="text-[#3A3630] leading-relaxed font-light text-sm sm:text-base">
                  {project.description}
                </p>
              </div>

              {project.concept && (
                <div className="bg-[#EFECE5] p-5 rounded-md border border-[#E0D9CC]">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#6A645B] font-medium mb-2">
                    Concepto & Espacio
                  </h4>
                  <p className="text-sm text-[#454039] italic font-serif leading-relaxed">
                    &ldquo;{project.concept}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Technical Specifications Column */}
            <div className="lg:col-span-4 bg-[#F2EFE8] p-6 rounded-md border border-[#E0D9CB] space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#1A1917] font-semibold border-b border-[#DCD5C6] pb-2">
                Ficha Técnica
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#756F66] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Ubicación:
                  </span>
                  <span className="text-[#1A1917] font-medium text-right">{project.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#756F66] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Año:
                  </span>
                  <span className="text-[#1A1917] font-medium tabular-nums">{project.year}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#756F66] flex items-center gap-1.5">
                    <Maximize className="w-3.5 h-3.5" /> Superficie:
                  </span>
                  <span className="text-[#1A1917] font-medium tabular-nums">{project.areaM2} m²</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#756F66] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" /> Dirección:
                  </span>
                  <span className="text-[#1A1917] font-medium text-right">{project.leadArchitect}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCD5C6]">
                <button
                  onClick={() => {
                    onClose();
                    onConsultProject(project.title);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs uppercase tracking-[0.16em] font-medium text-[#F8F7F4] bg-[#1A1917] hover:bg-[#322E28] rounded transition-colors cursor-pointer"
                >
                  <span>Consulta de Proyecto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Tactile Material Palette Breakdown (Studio Choros Inspiration) */}
          <div className="border-t border-[#E8E2D7] pt-8">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8A7149] font-medium block mb-1">
                Tacto, Textura & Procedencia
              </span>
              <h3 className="text-2xl font-serif text-[#1A1917] font-light">
                Paleta Matérica del Proyecto
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.materials.map((mat) => (
                <div
                  key={mat.name}
                  className="p-4 rounded-md bg-[#EFECE5] border border-[#DDD6C8] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <span
                        className="w-6 h-6 rounded-full border border-black/20 shrink-0 shadow-2xs"
                        style={{ backgroundColor: mat.toneHex }}
                      />
                      <div>
                        <h4 className="text-sm font-serif font-medium text-[#1A1917]">
                          {mat.name}
                        </h4>
                        <span className="text-[11px] text-[#787268] block">
                          {mat.type} · {mat.origin}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[#524D45] font-light leading-relaxed">
                      {mat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#E5DFD4] bg-[#F4F2EC] flex items-center justify-between text-xs text-[#706B62]">
          <span>Atelier Choros & Mas · Proyecto {project.id}</span>
          <button
            onClick={onClose}
            className="hover:text-[#1A1917] underline underline-offset-4 cursor-pointer"
          >
            Volver a la galería
          </button>
        </div>

      </div>
    </div>
  );
};
