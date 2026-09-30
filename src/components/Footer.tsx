import React from 'react';
import { StudioConfig } from '../types';

interface FooterProps {
  studioConfig: StudioConfig;
  onOpenPitch: () => void;
  onOpenCms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  studioConfig,
  onOpenPitch,
  onOpenCms,
}) => {
  return (
    <footer className="bg-[#1A1917] text-[#EDEAE3] py-16 border-t border-[#2E2A25]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2E2A25]">
          
          {/* Brand & Wordmark */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-2xl font-serif tracking-[0.25em] text-[#FAF8F5] uppercase block">
              {studioConfig.studioName}
            </span>
            <p className="text-xs text-[#9E988D] max-w-sm leading-relaxed font-light">
              {studioConfig.tagline}. Un estudio híbrido que unifica la volumetría de Mas Creations, el diseño táctil de Studio Choros y la sencillez funcional de Alexander &CO.
            </p>
            <div className="pt-2 text-xs text-[#C5BEB1]">
              <span>{studioConfig.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-[#8A7149] font-medium">
              Navegación
            </h5>
            <ul className="space-y-2 text-xs text-[#B5AEA1]">
              <li>
                <a href="#proyectos" className="hover:text-white transition-colors">
                  Obras de Arquitectura
                </a>
              </li>
              <li>
                <a href="#objetos" className="hover:text-white transition-colors">
                  Objetos & Mobiliario
                </a>
              </li>
              <li>
                <a href="#filosofia" className="hover:text-white transition-colors">
                  Laboratorio Matérico
                </a>
              </li>
              <li>
                <a href="#indice" className="hover:text-white transition-colors">
                  Índice Técnico
                </a>
              </li>
              <li>
                <a href="#consulta" className="hover:text-white transition-colors">
                  Contacto Directo
                </a>
              </li>
            </ul>
          </div>

          {/* Special Actions */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-[#8A7149] font-medium">
              Herramientas del Proyecto
            </h5>
            <p className="text-xs text-[#8E887E] leading-relaxed">
              Explora la auditoría de ventajas para tu cliente o entra en el panel interactivo del gestor de contenidos para modificar las obras en vivo.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={onOpenPitch}
                className="px-4 py-2.5 text-xs text-[#EDEAE3] bg-[#2E2A25] hover:bg-[#3D3832] rounded transition-colors text-center cursor-pointer border border-[#423C35]"
              >
                Auditoría UI/UX
              </button>
              <button
                onClick={onOpenCms}
                className="px-4 py-2.5 text-xs text-[#1A1917] bg-[#E8E4DC] hover:bg-white rounded transition-colors text-center font-medium cursor-pointer"
              >
                Acceder al Gestor CMS
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#706B62] gap-4">
          <p>
            © {new Date().getFullYear()} {studioConfig.studioName} Atelier. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase">
            <span>Privacidad</span>
            <span aria-hidden="true">·</span>
            <span>Términos Legales</span>
            <span aria-hidden="true">·</span>
            <span>Instagram: {studioConfig.instagram}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
