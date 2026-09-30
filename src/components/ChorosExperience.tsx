import React, { useState } from 'react';
import { 
  Compass, 
  Sun, 
  Moon, 
  Sunrise, 
  ArrowUpRight, 
  SlidersHorizontal, 
  Layers, 
  Sparkles, 
  Maximize2, 
  Eye, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';
import { Project, BespokeObject, StudioConfig, MaterialSwatch } from '../types';

interface ChorosExperienceProps {
  studioConfig: StudioConfig;
  projects: Project[];
  objects: BespokeObject[];
  onSelectProject: (project: Project) => void;
  onInquireObject: (objectName: string) => void;
  onConsultProject: (projectTitle: string) => void;
}

type SolarTime = 'dawn' | 'zenith' | 'dusk';

export const ChorosExperience: React.FC<ChorosExperienceProps> = ({
  studioConfig,
  projects,
  objects,
  onSelectProject,
  onInquireObject,
  onConsultProject,
}) => {
  const [solarTime, setSolarTime] = useState<SolarTime>('zenith');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSwatch | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [inquiryType, setInquiryType] = useState<string>('Residencia Privada');

  // Filter effect based on time of day
  const getSolarAtmosphereClass = () => {
    switch (solarTime) {
      case 'dawn':
        return 'solar-dawn-filter';
      case 'dusk':
        return 'solar-dusk-filter';
      case 'zenith':
      default:
        return 'solar-zenith-filter';
    }
  };

  const getSolarDescription = () => {
    switch (solarTime) {
      case 'dawn':
        return '08:15 — Luz rasante ambarina. Las sombras alargadas revelan el relieve del yeso a la cal.';
      case 'dusk':
        return '20:10 — Calidez crepuscular. La piedra de travertino absorbe los últimos rayos dorados.';
      case 'zenith':
      default:
        return '13:30 — Luz cenital pura mediterránea. Claridad absoluta y volúmenes monolíticos.';
    }
  };

  const featuredProject = projects[0];

  return (
    <div className={`transition-all duration-700 ${getSolarAtmosphereClass()}`}>
      
      {/* 1. CHOROS POETIC HERO (Passe-partout Matte Frame Layout) */}
      <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Architectural metadata header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E6E1D7] pb-6 mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#8C8477] font-medium mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#8A7149]"></span>
              <span>{studioConfig.studioName.toUpperCase()} · ATELIER</span>
              <span>·</span>
              <span>37°58′N 23°43′E</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#1F1D1A] font-normal leading-[1.08] tracking-tight">
              Santuarios de luz, <br />
              <span className="italic font-light text-[#736B5E]">materia y silencio.</span>
            </h1>
          </div>

          <div className="max-w-md text-sm leading-relaxed text-[#6E6659] space-y-3 font-light">
            <p>
              En la filosofía griega, <strong className="font-medium text-[#2C2822]">Choros (χῶρος)</strong> designa el espacio no como un contenedor vacío que debe rellenarse de cosas, sino como una presencia viva que acoge la luz y el reposo del ser humano.
            </p>
            <div className="flex items-center gap-4 pt-1 text-xs tracking-wider uppercase text-[#8A7149]">
              <span className="underline underline-offset-4 decoration-[#8A7149]/40">Arquitectura Sensorial</span>
              <span>·</span>
              <span>Piedra Viva & Cal</span>
            </div>
          </div>
        </div>

        {/* Studio Choros Solar Light & Shadow Interactive Bar */}
        <div className="mb-8 p-3.5 bg-[#F3EFE7] border border-[#E4DFD5] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#544D42]">
            <Compass className="w-4 h-4 text-[#8A7149]" />
            <span className="font-medium">Estudio de Luz Solar Mediterránea:</span>
            <span className="text-[#7C7569] font-normal hidden lg:inline">{getSolarDescription()}</span>
          </div>

          <div className="flex items-center bg-[#EAE5DA] p-1 rounded-lg border border-[#DCD6C9]">
            <button
              onClick={() => setSolarTime('dawn')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                solarTime === 'dawn'
                  ? 'bg-white text-[#2B2721] shadow-sm'
                  : 'text-[#6C655A] hover:text-[#2B2721]'
              }`}
            >
              <Sunrise className="w-3.5 h-3.5 text-[#B87A3E]" />
              <span>Alba (08:00)</span>
            </button>
            <button
              onClick={() => setSolarTime('zenith')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                solarTime === 'zenith'
                  ? 'bg-white text-[#2B2721] shadow-sm'
                  : 'text-[#6C655A] hover:text-[#2B2721]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-[#D19B3E]" />
              <span>Cenit (13:30)</span>
            </button>
            <button
              onClick={() => setSolarTime('dusk')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                solarTime === 'dusk'
                  ? 'bg-white text-[#2B2721] shadow-sm'
                  : 'text-[#6C655A] hover:text-[#2B2721]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-[#885A3D]" />
              <span>Ocaso (20:00)</span>
            </button>
          </div>
        </div>

        {/* Master Framed Diptych (The Studio Choros Passe-Partout Framing) */}
        <div className="bg-[#FAF8F5] p-3 sm:p-6 lg:p-8 rounded-2xl border border-[#E5E0D5] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Primary Spatial View (Hero Living Room) */}
            <div 
              onClick={() => onSelectProject(featuredProject)}
              className="lg:col-span-8 group relative aspect-4/3 sm:aspect-16/10 overflow-hidden rounded-xl bg-[#EBE7DF] cursor-pointer"
            >
              <img
                src={featuredProject.coverImage}
                alt={featuredProject.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              {/* Floating Monograph Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-[#EADFC9] mb-1">
                    Monografía Destacada · 01
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif">{featuredProject.title}</h2>
                  <p className="text-xs sm:text-sm text-[#D7CEBF] max-w-lg mt-1 font-light line-clamp-1">
                    {featuredProject.subtitle}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium border border-white/30 text-white shrink-0">
                  <span>Explorar Monografía</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Tactile Micro-Detail Diptych (Choros Niche Alcove) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div 
                onClick={() => onSelectProject(featuredProject)}
                className="group relative aspect-4/3 lg:aspect-square overflow-hidden rounded-xl bg-[#EBE7DF] cursor-pointer"
              >
                <img
                  src="/src/assets/images/choros_sculpted_niche_1790621805963.jpg"
                  alt="Nicho esculpido Studio Choros"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                <div className="absolute top-4 right-4 bg-[#1F1D1A]/80 backdrop-blur-md text-white text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded">
                  Detalle Táctil
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-[#F8F6F2]/95 backdrop-blur-sm p-3 rounded-lg border border-[#E8E2D7]">
                  <div className="text-[10px] uppercase tracking-widest text-[#8A7149]">Alveolo Esculpido</div>
                  <div className="text-xs font-serif text-[#2C2822]">Cal viva tradicional modelada a mano y cerámica pura</div>
                </div>
              </div>

              {/* Spatial Quote Box */}
              <div className="p-5 rounded-xl bg-[#EFECE5] border border-[#DFD9CD] flex flex-col justify-between">
                <p className="font-serif italic text-sm text-[#463F36] leading-relaxed">
                  «La belleza no reside en lo que se añade, sino en la serenidad que queda cuando se ha despojado todo lo innecesario.»
                </p>
                <div className="mt-4 pt-3 border-t border-[#D5CEC0] flex items-center justify-between text-[11px] text-[#787163] uppercase tracking-wider">
                  <span>Atelier Choros</span>
                  <span>Canteras de Caliza</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* 2. CHOROS PHILOSOPHICAL MANIFESTO (Los 3 Principios del Vacío) */}
      <section id="filosofia" className="py-20 bg-[#F4F1EA] border-y border-[#E4DFD5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8A7149] font-medium block mb-2">
              EL MANIFIESTO ESPACIAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1D1A] font-normal">
              Tres pilares de la arquitectura del sosiego
            </h2>
            <p className="text-sm text-[#6C655A] mt-3 font-light">
              Cómo diseñamos residencias y hoteles que desconectan de la prisa contemporánea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 01 */}
            <div className="bg-[#FAF8F5] p-8 rounded-xl border border-[#E5E0D5] flex flex-col justify-between relative overflow-hidden group hover:border-[#8A7149]/40 transition-colors">
              <span className="text-5xl font-serif text-[#DCD6C9] font-light block mb-6">01</span>
              <div>
                <h3 className="text-xl font-serif text-[#211E1A] mb-3">El Vacío como Presencia</h3>
                <p className="text-xs sm:text-sm text-[#6A6255] leading-relaxed font-light">
                  No concebimos las paredes como límites, sino como tamices que esculpen la luz. El espacio despejado permite que la respiración se calme y la mirada repose.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ECE7DD] text-[11px] tracking-wider uppercase text-[#8A7149]">
                χῶρος · El Recipiente del Ser
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="bg-[#FAF8F5] p-8 rounded-xl border border-[#E5E0D5] flex flex-col justify-between relative overflow-hidden group hover:border-[#8A7149]/40 transition-colors">
              <span className="text-5xl font-serif text-[#DCD6C9] font-light block mb-6">02</span>
              <div>
                <h3 className="text-xl font-serif text-[#211E1A] mb-3">Materialidad Imperecedera</h3>
                <p className="text-xs sm:text-sm text-[#6A6255] leading-relaxed font-light">
                  Travertino de cantera viva, cal aérea que purifica el aire de forma natural y maderas tratadas con aceites vegetales. Materiales que envejecen con dignidad centenaria.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ECE7DD] text-[11px] tracking-wider uppercase text-[#8A7149]">
                Pátina & Honestidad Mineral
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="bg-[#FAF8F5] p-8 rounded-xl border border-[#E5E0D5] flex flex-col justify-between relative overflow-hidden group hover:border-[#8A7149]/40 transition-colors">
              <span className="text-5xl font-serif text-[#DCD6C9] font-light block mb-6">03</span>
              <div>
                <h3 className="text-xl font-serif text-[#211E1A] mb-3">La Sombra como Santuario</h3>
                <p className="text-xs sm:text-sm text-[#6A6255] leading-relaxed font-light">
                  En el Mediterráneo, el lujo supremo es la penumbra fresca a mediodía. Diseñamos transiciones entre arcos profundos y celosías que calman la intensidad del sol.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ECE7DD] text-[11px] tracking-wider uppercase text-[#8A7149]">
                Termodinámica Pasiva & Intimidad
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CHOROS SANCTUARIES PORTFOLIO (Full Editorial Monograph Stories) */}
      <section id="proyectos" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E6E1D7] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8A7149] font-medium block mb-2">
              ARCHIVOS ARQUITECTÓNICOS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#1F1D1A]">
              Monografías de Obras Seleccionadas
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#7C7569]">
            {projects.length} Obras Documentadas · Edición 2024–2026
          </p>
        </div>

        <div className="space-y-28">
          {projects.map((project, idx) => (
            <article 
              key={project.id}
              className="bg-[#FAF8F5] border border-[#E5E0D5] rounded-2xl p-6 sm:p-10 transition-all hover:shadow-md"
            >
              {/* Project Monograph Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-[#EBE6DC]">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#8A7149] mb-3">
                    <span className="font-serif italic font-bold">0{idx + 1}</span>
                    <span>/</span>
                    <span>{project.category}</span>
                    <span>·</span>
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-serif text-[#1F1D1A] mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#686053] font-light leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-[#F2EEE6] rounded-lg border border-[#E2DDCF]">
                    <span className="block text-[10px] uppercase tracking-wider text-[#8A8275]">Superficie</span>
                    <span className="font-medium text-[#2A2621] mt-0.5 block">{project.areaM2} m²</span>
                  </div>
                  <div className="p-3 bg-[#F2EEE6] rounded-lg border border-[#E2DDCF]">
                    <span className="block text-[10px] uppercase tracking-wider text-[#8A8275]">Año</span>
                    <span className="font-medium text-[#2A2621] mt-0.5 block">{project.year}</span>
                  </div>
                  <div className="p-3 bg-[#F2EEE6] rounded-lg border border-[#E2DDCF] col-span-2 sm:col-span-1">
                    <span className="block text-[10px] uppercase tracking-wider text-[#8A8275]">Estado</span>
                    <span className="font-medium text-[#2A2621] mt-0.5 block">{project.status}</span>
                  </div>
                </div>
              </div>

              {/* Choros Project Gallery Diptych */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* Main Large Shot */}
                <div 
                  onClick={() => onSelectProject(project)}
                  className="lg:col-span-7 aspect-16/10 rounded-xl overflow-hidden bg-[#ECE8DF] group relative cursor-pointer"
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded bg-black/60 backdrop-blur-md text-white text-[11px] tracking-wider uppercase flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Perspectiva Espacial Principal</span>
                  </div>
                </div>

                {/* Secondary Detail Shots */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {project.secondaryImages && project.secondaryImages.length > 0 ? (
                    <div 
                      onClick={() => onSelectProject(project)}
                      className="aspect-16/10 rounded-xl overflow-hidden bg-[#ECE8DF] group relative cursor-pointer flex-1"
                    >
                      <img
                        src={project.secondaryImages[0]}
                        alt={`${project.title} detalle`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded bg-black/60 backdrop-blur-md text-white text-[11px] tracking-wider uppercase">
                        Materialidad & Luz
                      </div>
                    </div>
                  ) : null}

                  {/* Project Philosophy Extract */}
                  <div className="p-5 rounded-xl bg-[#F3EFE7] border border-[#E3DDD1] flex flex-col justify-between">
                    <p className="text-xs sm:text-sm text-[#544D42] font-light leading-relaxed italic">
                      «{project.concept}»
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] text-[#8A7149] uppercase tracking-wider font-medium">
                        Dirección: {project.leadArchitect}
                      </span>
                      <button
                        onClick={() => onConsultProject(project.title)}
                        className="text-xs text-[#2A2621] hover:text-[#8A7149] font-medium underline underline-offset-4 cursor-pointer"
                      >
                        Consultar proyecto similar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Minerals & Direct Monograph Trigger */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-[#ECE7DC] gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#8A8275] mr-2">
                    Paleta Mineral:
                  </span>
                  {project.materials.map((mat, mIdx) => (
                    <button
                      key={mIdx}
                      onClick={() => setSelectedMaterial(mat)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFECE5] border border-[#DFD9CD] text-xs text-[#4F483F] hover:border-[#8A7149] transition-colors cursor-pointer"
                    >
                      <span 
                        className="w-2.5 h-2.5 rounded-full border border-black/20" 
                        style={{ backgroundColor: mat.toneHex }}
                      />
                      <span>{mat.name}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1F1D1A] hover:bg-[#34302A] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium rounded-lg transition-all cursor-pointer shadow-xs"
                >
                  <span>Monografía Completa & Planos</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C4B28E]" />
                </button>
              </div>

            </article>
          ))}
        </div>
      </section>

      {/* 4. CHOROS MATIÈRE LABORATORY (El Archivo de Texturas de Cantera) */}
      <section id="materialidad" className="py-20 bg-[#EFECE5] border-y border-[#DFD9CD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8A7149] font-medium block mb-2">
              ARCHIVO DE LA MATERIA
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1F1D1A]">
              Laboratorio de Piedra Viva & Cal Aérea
            </h2>
            <p className="text-sm text-[#635C50] mt-2 font-light">
              Explora las materias primas con las que Studio Choros da forma a cada atmósfera.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Travertino Romano Navona',
                category: 'Piedra de Cantera Viva',
                origin: 'Tivoli, Italia',
                toneHex: '#D8CBB7',
                texture: 'Poro abierto cepillado con agua a presión',
                acoustic: 'Acústica templada, tacto sedoso y fresco en verano',
                quote: 'Conserva las burbujas de agua fósil de miles de años.',
              },
              {
                title: 'Yeso a la Cal Apagada',
                category: 'Revestimiento Continuo',
                origin: 'Valencia, España',
                toneHex: '#EAE5DB',
                texture: 'Aplicación artesanal con espátula de madera',
                acoustic: 'Transpirable y libre de compuestos sintéticos',
                quote: 'Capta y tamiza la luz solar creando sombras aterciopeladas.',
              },
              {
                title: 'Lino Salvaje Teñido al Té',
                category: 'Textil Orgánico de Telar',
                origin: 'Normandía, Francia',
                toneHex: '#C5BCAC',
                texture: 'Hilado irregular de 380 g/m²',
                acoustic: 'Amortiguación acústica suave y drapeado natural',
                quote: 'Filtra la brisa marina y mitiga los reflejos intensos.',
              },
              {
                title: 'Roble de Bosque Gestionado',
                category: 'Ebanistería Sólida',
                origin: 'Valle del Loira, Francia',
                toneHex: '#4E4338',
                texture: 'Acabado en aceite vegetal crudo sin barnices plásticos',
                acoustic: 'Cálido al tacto y aroma sutil a bosque húmedo',
                quote: 'Envejece oscureciéndose con el contacto de las manos.',
              }
            ].map((mat, idx) => (
              <div 
                key={idx}
                className="bg-[#FAF8F5] p-6 rounded-xl border border-[#DFD9CD] flex flex-col justify-between hover:border-[#8A7149] transition-all hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="w-7 h-7 rounded-full border border-black/20 shadow-xs"
                      style={{ backgroundColor: mat.toneHex }}
                    />
                    <span className="text-[10px] uppercase tracking-wider text-[#8A7149] font-medium">
                      {mat.origin}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif text-[#221F1B] mb-1">{mat.title}</h3>
                  <div className="text-[11px] uppercase tracking-wider text-[#887F72] mb-3">{mat.category}</div>
                  <p className="text-xs text-[#5D5548] leading-relaxed mb-4 font-light">
                    {mat.texture}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ECE7DC] text-xs text-[#7A7163] italic">
                  «{mat.quote}»
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CHOROS SCULPTURAL OBJECTS (Artefactos Esculturales) */}
      <section id="objetos" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E6E1D7] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8A7149] font-medium block mb-2">
              DISEÑO COLECCIONABLE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#1F1D1A]">
              Artefactos & Mobiliario de Autor
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#7C7569]">
            Piezas talladas a mano en cantera y taller artesanal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {objects.map((obj) => (
            <div 
              key={obj.id}
              className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E5E0D5] flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-16/10 rounded-xl overflow-hidden bg-[#ECE8DF] mb-6 relative">
                  <img
                    src={obj.image}
                    alt={obj.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-[#1F1D1A]/80 backdrop-blur-md text-white text-[10px] tracking-wider uppercase px-2.5 py-1 rounded">
                    {obj.availability}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#8A7149] uppercase tracking-wider mb-2">
                  <span>{obj.category}</span>
                  <span>{obj.year}</span>
                </div>
                <h3 className="text-2xl font-serif text-[#1F1D1A] mb-2">{obj.name}</h3>
                <p className="text-xs sm:text-sm text-[#665E51] font-light leading-relaxed mb-4">
                  {obj.description}
                </p>

                <div className="space-y-2 text-xs text-[#524B40] pt-4 border-t border-[#ECE7DD]">
                  <div className="flex justify-between">
                    <span className="text-[#888073]">Dimensiones:</span>
                    <span className="font-medium">{obj.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#888073]">Materia:</span>
                    <span className="font-medium">{obj.materials}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#888073]">Edición:</span>
                    <span className="font-medium">{obj.edition}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#ECE7DD]">
                <button
                  onClick={() => onInquireObject(obj.name)}
                  className="w-full py-2.5 rounded-lg bg-[#26231F] hover:bg-[#3B3630] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Solicitar Comisión de Pieza</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C4B28E]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CHOROS PRIVATE INQUIRY (Comisiones de Arquitectura e Interiorismo) */}
      <section id="consulta" className="py-24 bg-[#F4F1EA] border-t border-[#E4DFD5]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8A7149] font-medium block mb-2">
              DIÁLOGO ARQUITECTÓNICO CONFIDENCIAL
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#1F1D1A]">
              Comisionar un Proyecto con Studio Choros
            </h2>
            <p className="text-sm text-[#6C6559] mt-3 font-light max-w-xl mx-auto">
              Aceptamos un número limitado de obras al año para garantizar que cada santuario reciba la dedicación de nuestros directores de diseño.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-2xl border border-[#E5E0D5] shadow-xs">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#8A7149] mx-auto" />
                <h3 className="text-2xl font-serif text-[#1F1D1A]">Diálogo Iniciado con Éxito</h3>
                <p className="text-sm text-[#6E6659] max-w-md mx-auto font-light">
                  Hemos recibido los detalles de su encargo. Nuestro equipo de arquitectura se pondrá en contacto en un plazo de 24 horas para agendar una sesión privada preliminar.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-[#26231F] text-white text-xs uppercase tracking-wider rounded-md"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#787163] mb-2 font-medium">
                    1. Tipología de la Obra
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {['Residencia Privada', 'Hotel Boutique', 'Retail & Galería', 'Colección de Muebles'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setInquiryType(type)}
                        className={`py-2 px-3 text-xs rounded-lg border transition-all text-center cursor-pointer ${
                          inquiryType === type
                            ? 'bg-[#1F1D1A] text-white border-[#1F1D1A]'
                            : 'bg-[#F2EFE8] text-[#554E44] border-[#DCD6CA] hover:border-[#8A7149]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#787163] mb-1.5 font-medium">
                      Nombre & Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="p. ej. Marqués de Valero / Dra. Sofía Ramos"
                      className="w-full px-4 py-2.5 bg-[#F7F5EE] border border-[#DDD7CB] rounded-lg text-sm text-[#26231F] focus:outline-none focus:border-[#8A7149]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#787163] mb-1.5 font-medium">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contacto@residencia.com"
                      className="w-full px-4 py-2.5 bg-[#F7F5EE] border border-[#DDD7CB] rounded-lg text-sm text-[#26231F] focus:outline-none focus:border-[#8A7149]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#787163] mb-1.5 font-medium">
                      Ubicación de la Finca o Propiedad
                    </label>
                    <input
                      type="text"
                      placeholder="p. ej. Ibiza, Costa Brava, Madrid Centro, Atenas"
                      className="w-full px-4 py-2.5 bg-[#F7F5EE] border border-[#DDD7CB] rounded-lg text-sm text-[#26231F] focus:outline-none focus:border-[#8A7149]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#787163] mb-1.5 font-medium">
                      Superficie Aproximada
                    </label>
                    <select className="w-full px-4 py-2.5 bg-[#F7F5EE] border border-[#DDD7CB] rounded-lg text-sm text-[#26231F] focus:outline-none focus:border-[#8A7149]">
                      <option>Menor a 150 m²</option>
                      <option>150 m² — 350 m²</option>
                      <option>350 m² — 700 m²</option>
                      <option>Más de 700 m² / Finca Rústica</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#787163] mb-1.5 font-medium">
                    Intención Espacial & Sensorial del Proyecto
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describa la atmósfera que busca: ¿desea un refugio de introspección con piedra viva, una renovación que maximice la luz natural, o una estancia contemporánea con piezas a medida?"
                    className="w-full px-4 py-3 bg-[#F7F5EE] border border-[#DDD7CB] rounded-lg text-sm text-[#26231F] focus:outline-none focus:border-[#8A7149] resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1F1D1A] hover:bg-[#35302A] text-white text-xs uppercase tracking-[0.25em] font-medium rounded-lg transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Enviar Solicitud de Comisión Confidencial</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C4B28E]" />
                  </button>
                  <p className="text-[11px] text-center text-[#8C8477] mt-3">
                    Estricta confidencialidad bajo acuerdo de discreción profesional.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Floating Material Quick Inspection Drawer */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-[#DFD9CD] p-6 sm:p-8 rounded-2xl max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedMaterial(null)}
              className="absolute top-4 right-4 text-[#7C7569] hover:text-[#1F1D1A] text-sm uppercase tracking-wider cursor-pointer"
            >
              Cerrar ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span 
                className="w-8 h-8 rounded-full border border-black/20"
                style={{ backgroundColor: selectedMaterial.toneHex }}
              />
              <div>
                <h4 className="text-xl font-serif text-[#1F1D1A]">{selectedMaterial.name}</h4>
                <div className="text-[11px] uppercase tracking-wider text-[#8A7149]">{selectedMaterial.type}</div>
              </div>
            </div>
            <div className="space-y-3 text-xs text-[#5D5548] leading-relaxed">
              <p><strong>Procedencia:</strong> {selectedMaterial.origin}</p>
              <p><strong>Cualidad Táctil:</strong> {selectedMaterial.description}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#ECE7DC]">
              <button
                onClick={() => setSelectedMaterial(null)}
                className="w-full py-2 bg-[#1F1D1A] text-white text-xs uppercase tracking-wider rounded-lg"
              >
                Volver al Recorrido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
