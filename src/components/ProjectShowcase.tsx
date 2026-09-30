import React, { useState } from 'react';
import { LayoutGrid, List, ArrowUpRight, MapPin, Maximize2 } from 'lucide-react';
import { Project, ProjectCategory } from '../types';

interface ProjectShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [viewMode, setViewMode] = useState<'bento' | 'index'>('bento');

  const categories: ('Todos' | ProjectCategory)[] = [
    'Todos',
    'Residencial',
    'Hospitality',
    'Retail',
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'Todos') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="proyectos" className="py-20 md:py-28 border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header with Typographic Restraint */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-[#8A7149] font-medium block mb-2">
              Portfolio Seleccionado
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1A1917] font-light">
              Obras de Arquitectura & Espacio
            </h2>
          </div>

          <p className="text-sm text-[#666057] max-w-md font-light leading-relaxed">
            Una colección de intervenciones donde la estructura pura de Mas Creations se fusiona con la calidez matérica de Studio Choros y el orden riguroso de Alexander &CO.
          </p>
        </div>

        {/* Filter Controls & View Mode Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#E8E4DC] mb-12">
          {/* Functional interactive category tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFECE6] rounded-md border border-[#DFD9CD] overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium tracking-wide rounded transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A1917] text-[#F8F7F4] shadow-sm'
                    : 'text-[#666057] hover:text-[#1A1917]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View switcher: Bento (Mas Creations) vs Index (Alexander &CO.) */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#7A746B] mr-1 hidden sm:inline">Visualización:</span>
            <div className="flex items-center p-1 bg-[#EFECE6] rounded-md border border-[#DFD9CD]">
              <button
                onClick={() => setViewMode('bento')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  viewMode === 'bento'
                    ? 'bg-[#1A1917] text-[#F8F7F4] shadow-sm'
                    : 'text-[#666057] hover:text-[#1A1917]'
                }`}
                title="Vista Bento Editorial inspirada en Mas Creations"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Editorial Bento</span>
              </button>
              <button
                onClick={() => setViewMode('index')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  viewMode === 'index'
                    ? 'bg-[#1A1917] text-[#F8F7F4] shadow-sm'
                    : 'text-[#666057] hover:text-[#1A1917]'
                }`}
                title="Índice Técnico Minimalista inspirado en Alexander &CO."
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Índice Técnico</span>
              </button>
            </div>
          </div>
        </div>

        {/* View 1: Editorial Bento Grid (Mas Creations + Studio Choros) */}
        {viewMode === 'bento' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {filteredProjects.map((project, idx) => {
              // Asymmetric bento rhythm: alternating wide and compact frames
              const isLarge = idx === 0 || idx === 3;
              const colSpan = isLarge ? 'md:col-span-8' : 'md:col-span-4';
              const aspect = isLarge ? 'aspect-[16/10]' : 'aspect-[4/3]';

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`${colSpan} group cursor-pointer flex flex-col`}
                >
                  {/* Image container with subtle luxury zoom */}
                  <div className={`relative ${aspect} rounded-lg overflow-hidden bg-[#EAE6DE] border border-[#E0DACE] shadow-sm`}>
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient scrim for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Corner Expand Indicator */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-[#1A1917] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>

                    {/* Overlay info */}
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <div className="flex items-center gap-2 text-xs text-[#EAE5DC] font-light mb-1">
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{project.areaM2} m²</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-normal leading-snug">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Clean unboxed caption & materials indicator below */}
                  <div className="pt-3.5 flex items-start justify-between gap-4">
                    <p className="text-xs text-[#6B655B] line-clamp-2 leading-relaxed">
                      {project.subtitle}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0 pt-0.5" title="Paleta de materiales del proyecto">
                      {project.materials.map((mat) => (
                        <span
                          key={mat.name}
                          className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs"
                          style={{ backgroundColor: mat.toneHex }}
                          title={`${mat.name} (${mat.type})`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* View 2: Minimalist Architectural Index Table (Alexander &CO. style) */
          <div id="indice" className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DDD7CD] text-[11px] uppercase tracking-[0.2em] text-[#7A746B]">
                  <th className="py-4 font-medium">Obra / Proyecto</th>
                  <th className="py-4 font-medium">Tipología</th>
                  <th className="py-4 font-medium">Ubicación</th>
                  <th className="py-4 font-medium text-right">Superficie</th>
                  <th className="py-4 font-medium text-center">Año</th>
                  <th className="py-4 font-medium text-center">Estado</th>
                  <th className="py-4 font-medium text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE6DD]">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="hover:bg-[#F0EDE6] transition-colors cursor-pointer group"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-12 h-10 object-cover rounded border border-[#D9D3C7]"
                        />
                        <div>
                          <span className="font-serif text-lg text-[#1A1917] block group-hover:text-[#8A7149] transition-colors">
                            {project.title}
                          </span>
                          <span className="text-xs text-[#706B62] line-clamp-1">
                            {project.subtitle}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 text-xs text-[#524D45]">
                      {project.category}
                    </td>

                    <td className="py-4 text-xs text-[#524D45]">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#9A948A]" />
                        {project.location}
                      </span>
                    </td>

                    <td className="py-4 text-xs text-[#1A1917] text-right tabular-nums font-medium">
                      {project.areaM2} m²
                    </td>

                    <td className="py-4 text-xs text-[#524D45] text-center tabular-nums">
                      {project.year}
                    </td>

                    <td className="py-4 text-center">
                      <span className="text-[11px] uppercase tracking-wider text-[#6B655C]">
                        {project.status}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <span className="inline-flex items-center gap-1 text-xs text-[#1A1917] font-medium group-hover:underline underline-offset-4">
                        Explorar <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};
