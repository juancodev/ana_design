import React, { useState } from 'react';
import { X, Sparkles, Check, Copy, ExternalLink, Layers, ArrowRight, ShieldCheck, Zap, Compass } from 'lucide-react';

interface ClientPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientPitchModal: React.FC<ClientPitchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const executiveSummary = `PROPUESTA ESTRATÉGICA UI/UX: HÍBRIDO EDITORIAL PARA ESTUDIO DE DISEÑO DE INTERIORES

1. ESTRUCTURA (Inspirada en Mas Creations):
- Jerarquía volumétrica: División estratégica entre Obras Arquitectónicas y Colección de Mobiliario/Objetos de Autor.
- Beneficio de negocio: Abre una segunda vía de ingresos de alto margen para el estudio (piezas coleccionables y mobiliario bajo encargo) además de los honorarios por proyecto.

2. DISEÑO & MATERIA (Inspirado en Studio Choros):
- Estética táctil y mediterránea: Uso de piedra natural (travertino, caliza, yeso a la cal) y tipografía serif editorial de gran carácter.
- Laboratorio de texturas interactivo: Permite al cliente final ver la procedencia y características de cada material, transmitiendo exclusividad y rigor constructivo.

3. SENCILLEZ & CONVERSIÓN (Inspirado en Alexander &CO.):
- Índice arquitectónico dual: El visitante puede alternar entre la vista bento visual y la tabla técnica de obras (m², año, ubicación).
- Proceso de consulta sin fricción: Filtra prospectos cualificados mediante un selector de tipología y superficie, acelerando el cierre de contratos VIP.

4. GESTOR DE CONTENIDOS INTEGRADO (CMS Studio):
- El equipo del cliente puede actualizar proyectos, fotos, memorias y mobiliario en tiempo real sin conocimientos técnicos ni costes recurrentes de mantenimiento.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(executiveSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#F8F7F4] rounded-lg shadow-2xl border border-[#DDD6C8] overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E3DCD0] bg-[#F2EFE8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8A7149]" />
            <h3 className="font-serif text-lg font-semibold text-[#1A1917]">
              Dossier de Presentación para tu Cliente
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#38332C] bg-[#EAE4D9] hover:bg-[#DDD6C8] rounded transition-colors cursor-pointer border border-[#D5CDBD]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado al Portapapeles' : 'Copiar Resumen'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#544E45] hover:text-[#1A1917] hover:bg-[#EAE4D9] rounded cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Main Hook Banner */}
          <div className="bg-[#EFECE5] p-6 rounded-lg border border-[#DDD5C6] space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8A7149] font-medium block">
              Estrategia UI/UX para el Nicho de Interiorismo de Lujo
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1917] font-light leading-snug">
              Un Híbrido Diseñado para Vender Proyectos de Alto Presupuesto
            </h2>
            <p className="text-xs sm:text-sm text-[#5C564E] font-light leading-relaxed pt-1">
              Las plantillas genéricas de internet tratan los proyectos de interiorismo como simples posts de blog con galerías cuadradas. Este desarrollo fusiona las mejores virtudes de los tres referentes internacionales más admirados de la industria para posicionar a tu cliente como un atelier de culto.
            </p>
          </div>

          {/* Breakdown of the 3 References */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#7A746B] font-semibold">
              Desglose de la Fórmula Híbrida
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Reference 1: Mas Creations */}
              <div className="p-5 bg-white rounded-lg border border-[#DDD6C8] flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-[#8A7149] font-semibold">
                      01. Estructura
                    </span>
                    <a
                      href="https://mas-creations.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8A847B] hover:text-[#1A1917]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <h5 className="font-serif text-lg font-medium text-[#1A1917] mb-2">
                    Mas Creations
                  </h5>
                  <p className="text-xs text-[#5E5950] leading-relaxed mb-3">
                    <strong>Aporte estructural:</strong> Se incorpora la división entre arquitectura espacial y colección de objetos/mobiliario de autor.
                  </p>
                  <p className="text-xs text-[#6B655C] leading-relaxed">
                    <strong>Ventaja para tu cliente:</strong> Permite facturar no solo por servicio de reforma, sino por piezas de mobiliario exclusivas y coleccionables diseñadas por su estudio.
                  </p>
                </div>
              </div>

              {/* Reference 2: Studio Choros */}
              <div className="p-5 bg-[#FAF8F3] rounded-lg border-2 border-[#8A7149]/40 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-[#8A7149] font-bold">
                      02. Diseño & Poética (Prevalente)
                    </span>
                    <a
                      href="https://www.studiochoros.co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8A847B] hover:text-[#1A1917]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <h5 className="font-serif text-lg font-medium text-[#1A1917] mb-2">
                    Studio Choros (Diseño Principal)
                  </h5>
                  <p className="text-xs text-[#5E5950] leading-relaxed mb-3">
                    <strong>Aporte de diseño:</strong> Atmósfera táctil, silencio compositivo, enmarcados con generoso passe-partout, monografías pausadas y estudio de luz solar dinámico.
                  </p>
                  <p className="text-xs text-[#6B655C] leading-relaxed">
                    <strong>Ventaja para tu cliente:</strong> Posiciona al cliente en el segmento de arquitectura de autor y ultra-lujo. No compite por precio; compite por valor escultórico y serenidad.
                  </p>
                </div>
              </div>

              {/* Reference 3: Alexander &CO. */}
              <div className="p-5 bg-white rounded-lg border border-[#DDD6C8] flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-[#8A7149] font-semibold">
                      03. Sencillez & UX
                    </span>
                    <a
                      href="https://alexanderand.co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8A847B] hover:text-[#1A1917]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <h5 className="font-serif text-lg font-medium text-[#1A1917] mb-2">
                    Alexander &CO.
                  </h5>
                  <p className="text-xs text-[#5E5950] leading-relaxed mb-3">
                    <strong>Aporte de sencillez:</strong> Cero saturación visual. Navegación fluida y acceso instantáneo al índice técnico de obras con datos duros (m², año, tipología).
                  </p>
                  <p className="text-xs text-[#6B655C] leading-relaxed">
                    <strong>Ventaja para tu cliente:</strong> El cliente VIP encuentra exactamente lo que busca en segundos sin rodeos, facilitando el contacto inmediato.
                  </p>
                </div>
              </div>

            </div>

            {/* Why Studio Choros Prevalence wins */}
            <div className="p-5 rounded-lg bg-[#F5EFE4] border border-[#DDD4C4] space-y-3">
              <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#8A7149]">
                <Sparkles className="w-4 h-4" />
                <span>¿Por qué prevalecer el diseño de Studio Choros es la mejor decisión para tu cliente?</span>
              </div>
              <ul className="text-xs text-[#5A5348] space-y-2 list-disc list-inside leading-relaxed font-light">
                <li>
                  <strong className="font-medium text-[#2A2621]">De "Reformas" a "Santuarios de Autor":</strong> Un diseño genérico hace que el cliente final pida presupuestos desglosados y compare tarifas. La poética visual de Studio Choros hace que el cliente desee <em>específicamente</em> la sensibilidad del arquitecto.
                </li>
                <li>
                  <strong className="font-medium text-[#2A2621]">Herramienta Interactiva de Venta (Luz Solar):</strong> El selector de luz solar (Alba, Cenit, Ocaso) permite al estudio demostrar en reuniones que ellos no solo decoran espacios, sino que modelan la luz natural y el clima interior.
                </li>
                <li>
                  <strong className="font-medium text-[#2A2621]">Flexibilidad Total en Vivo:</strong> Tu cliente puede alternar en cualquier momento entre la experiencia pura de Studio Choros y la variante híbrida mediante el conmutador superior o desde el propio Gestor CMS.
                </li>
              </ul>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="border border-[#DDD6C8] rounded-lg overflow-hidden">
            <div className="bg-[#EFECE5] px-5 py-3 border-b border-[#DDD6C8]">
              <h5 className="text-xs uppercase tracking-wider font-semibold text-[#1A1917]">
                Tabla Comparativa: Web Convencional vs. Solución Híbrida a Medida
              </h5>
            </div>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#DDD6C8] bg-[#F7F5F0] text-[#7A746B]">
                  <th className="py-2.5 px-4 font-medium">Característica</th>
                  <th className="py-2.5 px-4 font-medium text-red-800">Plantilla Común (WordPress / Wix)</th>
                  <th className="py-2.5 px-4 font-medium text-emerald-900 bg-emerald-50/50">Nuestra Solución Híbrida CMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE6DD]">
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1A1917]">Experiencia Visual</td>
                  <td className="py-3 px-4 text-[#666057]">Grilla genérica de fotos sin jerarquía</td>
                  <td className="py-3 px-4 text-[#1A1917] font-medium bg-emerald-50/30">Composición Bento + Índice arquitectónico técnico</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1A1917]">Exposición de Materiales</td>
                  <td className="py-3 px-4 text-[#666057]">Texto plano o inexistente</td>
                  <td className="py-3 px-4 text-[#1A1917] font-medium bg-emerald-50/30">Muestrario táctil con tonos, canteras y procedencias</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1A1917]">Línea de Mobiliario Propio</td>
                  <td className="py-3 px-4 text-[#666057]">No contemplada; requiere tienda e-commerce compleja</td>
                  <td className="py-3 px-4 text-[#1A1917] font-medium bg-emerald-50/30">Catálogo de piezas de autor con ficha de adquisición directa</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1A1917]">Gestión Diaria (CMS)</td>
                  <td className="py-3 px-4 text-[#666057]">Paneles lentos y confusos con riesgo de desmaquetar</td>
                  <td className="py-3 px-4 text-[#1A1917] font-medium bg-emerald-50/30">Gestor Studio CMS en tiempo real integrado en la propia web</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1A1917]">Cualificación de Clientes</td>
                  <td className="py-3 px-4 text-[#666057]">Formulario simple donde llegan peticiones de bajo valor</td>
                  <td className="py-3 px-4 text-[#1A1917] font-medium bg-emerald-50/30">Selector por tipología, metros cuadrados y plazos de obra</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Key Deliverables & Action Advice */}
          <div className="bg-[#FAF9F6] p-5 rounded-lg border border-[#DDD6C8] space-y-3">
            <h5 className="font-serif text-base text-[#1A1917] font-medium">
              Cómo presentárselo a tu cliente en la reunión:
            </h5>
            <ol className="space-y-2 text-xs text-[#575249] list-decimal list-inside leading-relaxed font-light">
              <li>
                <strong>Muéstrale la web en vivo:</strong> Navega por la página y enséñale cómo la paleta de caliza y la tipografía transmiten de inmediato un estudio de 50.000€+ por encargo.
              </li>
              <li>
                <strong>Abre el Gestor CMS:</strong> Haz clic en el botón superior &ldquo;Gestor CMS&rdquo; y cambia el nombre de un proyecto o añade una pieza de mobiliario delante de sus ojos para que compruebe la facilidad de uso.
              </li>
              <li>
                <strong>Explica la doble vía de negocio:</strong> Destaca que la sección de &ldquo;Objetos & Mobiliario de Colección&rdquo; (Mas Creations) les permitirá monetizar mesas, lámparas o alfombras creadas para clientes residenciales.
              </li>
              <li>
                <strong>Copia el resumen ejecutivo:</strong> Utiliza el botón superior &ldquo;Copiar Resumen&rdquo; para adjuntarlo como anexo en tu presupuesto formal de diseño y desarrollo web.
              </li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E3DCD0] bg-[#F2EFE8] flex items-center justify-between text-xs">
          <span className="text-[#6E685F]">
            Dossier listo para reunión comercial con el cliente
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1A1917] text-white rounded font-medium cursor-pointer"
          >
            Explorar la Web Híbrida
          </button>
        </div>

      </div>
    </div>
  );
};
