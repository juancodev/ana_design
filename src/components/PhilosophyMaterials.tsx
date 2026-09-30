import React, { useState } from 'react';
import { Sparkles, Sun, Feather, ShieldCheck } from 'lucide-react';
import { StudioConfig } from '../types';

interface PhilosophyMaterialsProps {
  studioConfig: StudioConfig;
}

export const PhilosophyMaterials: React.FC<PhilosophyMaterialsProps> = ({ studioConfig }) => {
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(0);

  const materials = [
    {
      name: 'Travertino Romano Navona',
      tag: 'Piedra de Cantera Porosa',
      origin: 'Tivoli, Italia',
      hex: '#D9CEBD',
      quote: 'Piedra sedimentaria con textura táctil inigualable. La dejamos con poro abierto natural para que respire la historia geológica de la tierra.',
      features: ['Acabado al agua no reflectante', 'Aporte térmico pasivo', 'Pátina centenaria']
    },
    {
      name: 'Yeso a la Cal Envejecida',
      tag: 'Mortero Mineral Continuo',
      origin: 'Valencia, España',
      hex: '#EDE8DF',
      quote: 'Aplicado con llana manual por maestros yeseros. Su superficie calcárea dispersa los rayos solares creando un degradado lumínico sedoso.',
      features: ['Transpirabilidad ecológica', 'Sin emisiones VOC', 'Microtextura orgánica']
    },
    {
      name: 'Roble Ahumado Francés',
      tag: 'Madera Noble Certificada',
      origin: 'Valle del Loira, Francia',
      hex: '#4A3E34',
      quote: 'Tratado con humo de leña natural para oscurecer el corazón de la fibra sin teñidos artificiales. Calidez y profundidad visual instantánea.',
      features: ['Tacto al aceite natural', 'Corte radial a medida', 'Madera de tala sostenible']
    },
    {
      name: 'Latón Bruñido a Mano',
      tag: 'Metal Noble de Autor',
      origin: 'Birmingham, Reino Unido',
      hex: '#A38E62',
      quote: 'Detalles que envejecen con el roce de las manos. Nunca aplicamos lacas sintéticas; permitimos que el metal narre el paso del tiempo.',
      features: ['Oxidación viva y orgánica', 'Mecanizado artesanal', 'Reflejo cálido']
    }
  ];

  const currentMat = materials[selectedMaterialIndex];

  return (
    <section id="filosofia" className="py-20 md:py-28 border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Subtitle & Statement */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8A7149] font-medium block mb-3">
            Inspirado en el diseño sensorial de Studio Choros
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#1A1917] font-light leading-tight">
            La belleza de lo imperfecto y la verdad de la materia
          </h2>
          <p className="text-base text-[#615C54] font-light mt-6 leading-relaxed">
            {studioConfig.philosophyStatement}
          </p>
        </div>

        {/* 3 Pillars of Choros Interior Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-[#E8E4DC]">
          <div className="p-6 bg-[#F4F2EC] rounded-lg border border-[#DDD6C8] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-[#E5DFD2] flex items-center justify-center text-[#1A1917] mb-4">
                <Sun className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-serif font-medium text-[#1A1917] mb-2">
                01. Escultura de la Luz
              </h3>
              <p className="text-xs text-[#5E5950] font-light leading-relaxed">
                Diseñamos los volúmenes en función de las horas doradas. Arcos profundos y vanos estratégicos modulan sombras suaves que transforman la estancia a lo largo del día.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#F4F2EC] rounded-lg border border-[#DDD6C8] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-[#E5DFD2] flex items-center justify-center text-[#1A1917] mb-4">
                <Feather className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-serif font-medium text-[#1A1917] mb-2">
                02. Silencio Acústico
              </h3>
              <p className="text-xs text-[#5E5950] font-light leading-relaxed">
                El verdadero lujo no se escucha: se siente. Empleamos cortinas de lino pesado, paneles acústicos empotrados y maderas densas para eliminar reverberaciones molestas.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#F4F2EC] rounded-lg border border-[#DDD6C8] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-[#E5DFD2] flex items-center justify-center text-[#1A1917] mb-4">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-serif font-medium text-[#1A1917] mb-2">
                03. Honestidad Constructiva
              </h3>
              <p className="text-xs text-[#5E5950] font-light leading-relaxed">
                Rechazamos las imitaciones y los laminados sintéticos. Si parece piedra, es piedra maciza tallada; si parece madera, es roble puro certificado.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Material Studio Lab */}
        <div className="pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8A7149] font-medium block mb-1">
                Laboratorio de Texturas
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1917] font-light">
                Materia Viva & Procedencia
              </h3>
            </div>
            <p className="text-xs text-[#6B655B] max-w-sm">
              Haz clic en cada muestra para examinar las propiedades táctiles empleadas en nuestros proyectos.
            </p>
          </div>

          {/* Material Swatch Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {materials.map((mat, idx) => (
              <button
                key={mat.name}
                onClick={() => setSelectedMaterialIndex(idx)}
                className={`p-4 rounded-md text-left transition-all border cursor-pointer ${
                  selectedMaterialIndex === idx
                    ? 'bg-[#EFECE5] border-[#1A1917] shadow-sm'
                    : 'bg-[#F9F8F5] border-[#DDD7CD] hover:border-[#BDB5A7]'
                }`}
              >
                <div
                  className="w-full h-12 rounded mb-3 border border-black/10"
                  style={{ backgroundColor: mat.hex }}
                />
                <span className="text-[11px] uppercase tracking-wider text-[#8A7149] font-medium block">
                  {mat.tag}
                </span>
                <span className="text-sm font-serif font-medium text-[#1A1917] block truncate">
                  {mat.name}
                </span>
              </button>
            ))}
          </div>

          {/* Selected Material Detail Card */}
          <div className="p-6 md:p-8 bg-[#F4F1EA] rounded-lg border border-[#DDD5C6] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-[#7A746B]">
                <span className="font-semibold text-[#1A1917]">{currentMat.name}</span>
                <span aria-hidden="true">·</span>
                <span>Origen: {currentMat.origin}</span>
              </div>
              <p className="text-base sm:text-lg font-serif italic text-[#302C27] leading-relaxed">
                &ldquo;{currentMat.quote}&rdquo;
              </p>
            </div>

            <div className="space-y-2 shrink-0 text-xs text-[#524D45]">
              <span className="text-[10px] uppercase tracking-widest text-[#8A7149] block font-semibold">
                Cualidades Técnicas
              </span>
              {currentMat.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A7149]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
