import React from 'react';
import { Sparkles, Layers, Box, ArrowUpRight } from 'lucide-react';
import { BespokeObject } from '../types';

interface ObjectsCollectionProps {
  objects: BespokeObject[];
  onInquireObject: (objectName: string) => void;
}

export const ObjectsCollection: React.FC<ObjectsCollectionProps> = ({
  objects,
  onInquireObject,
}) => {
  return (
    <section id="objetos" className="py-20 md:py-28 border-b border-[#E8E4DC] bg-[#F4F2EC]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#8A7149] font-medium mb-2">
              <Box className="w-3.5 h-3.5" />
              <span>Inspirado en la estructura de Mas Creations</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1A1917] font-light">
              Mobiliario & Objetos de Colección
            </h2>
          </div>

          <p className="text-sm text-[#666057] max-w-md font-light leading-relaxed">
            Piezas de mobiliario escultural diseñadas por el atelier y producidas en series limitadas con artesanos de la piedra y la ebanistería tradicional.
          </p>
        </div>

        {/* Objects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {objects.map((obj) => (
            <div
              key={obj.id}
              className="bg-[#F9F8F5] border border-[#DDD7CD] rounded-lg overflow-hidden group shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Object Image Frame */}
                <div className="relative aspect-[4/3] bg-[#E8E4DB] overflow-hidden">
                  <img
                    src={obj.image}
                    alt={obj.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#F8F7F4]/90 backdrop-blur-xs px-3 py-1 rounded text-[11px] uppercase tracking-wider text-[#635D54] border border-[#DDD7CD]">
                    {obj.availability}
                  </div>
                </div>

                {/* Object Narrative & Details */}
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#8A7149] font-medium block">
                        {obj.category} · {obj.year}
                      </span>
                      <h3 className="text-2xl font-serif text-[#1A1917] font-normal mt-1">
                        {obj.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C564E] font-light leading-relaxed">
                    {obj.description}
                  </p>

                  <div className="pt-4 border-t border-[#E8E2D7] grid grid-cols-2 gap-4 text-xs text-[#524D45]">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8A847A] block">Dimensiones</span>
                      <span className="font-medium">{obj.dimensions}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8A847A] block">Edición</span>
                      <span className="font-medium">{obj.edition}</span>
                    </div>
                  </div>

                  <div className="text-xs text-[#524D45]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8A847A] block">Materiales</span>
                    <span className="font-light italic">{obj.materials}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 md:p-8 pt-0">
                <button
                  onClick={() => onInquireObject(obj.name)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs uppercase tracking-[0.16em] font-medium text-[#1A1917] bg-[#EFECE5] hover:bg-[#E5DFD4] border border-[#D5CEC0] rounded transition-colors cursor-pointer"
                >
                  <span>Solicitar Ficha de Adquisición</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
