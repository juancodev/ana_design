import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { BespokeObject, StudioConfig, MaterialSwatch, LightTime } from '../types';
import { SpaceGallery } from './SpaceGallery';
import { LightStudyBar } from './LightStudyBar';
import { aptSanLuisSpaces } from '../data/aptSanLuis';
import { restauranteHotelSpaces } from '../data/restauranteHotel';

interface ChorosExperienceProps {
  studioConfig: StudioConfig;
  objects: BespokeObject[];
  onInquireObject: (objectName: string) => void;
}

export const ChorosExperience: React.FC<ChorosExperienceProps> = ({
  studioConfig,
  objects,
  onInquireObject,
}) => {
  // Each project keeps its own light selection
  const [aptLight, setAptLight] = useState<LightTime>('zenith');
  const [restaurantLight, setRestaurantLight] = useState<LightTime>('zenith');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSwatch | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [inquiryType, setInquiryType] = useState<string>('Residencia Privada');

  return (
    <div className="bg-[#F8F6F2]">
      
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
              Apt. San Luis
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

        {/* Light study: switches the renders between morning, afternoon and night */}
        <LightStudyBar lightTime={aptLight} onChange={setAptLight} />

        {/* Apt. San Luis render gallery, organized by space */}
        <SpaceGallery projectName="Apt. San Luis" spaces={aptSanLuisSpaces} lightTime={aptLight} />

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

      {/* 3. RESTAURANTE & HOTEL (second project, same structure as Apt. San Luis) */}
      <section id="proyectos" className="relative py-20 md:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="border-b border-[#E6E1D7] pb-6 mb-10">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#8C8477] font-medium mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#8A7149]"></span>
            <span>Proyecto 02 · Hospitality</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#1F1D1A] font-normal leading-[1.08] tracking-tight">
            Restaurante & Hotel
          </h2>
        </div>

        <LightStudyBar lightTime={restaurantLight} onChange={setRestaurantLight} />

        <SpaceGallery projectName="Restaurante & Hotel" spaces={restauranteHotelSpaces} lightTime={restaurantLight} />
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
