import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { StudioConfig, ProjectCategory } from '../types';

interface ProjectInquiryProps {
  studioConfig: StudioConfig;
  preselectedSubject?: string;
}

export const ProjectInquiry: React.FC<ProjectInquiryProps> = ({
  studioConfig,
  preselectedSubject = '',
}) => {
  const [typology, setTypology] = useState<ProjectCategory>('Residencial');
  const [areaRange, setAreaRange] = useState<string>('200 - 400 m²');
  const [timeline, setTimeline] = useState<string>('6 - 12 meses');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [message, setMessage] = useState<string>(
    preselectedSubject ? `Hola, me interesa consultar detalles sobre: ${preselectedSubject}` : ''
  );
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Sync if preselectedSubject updates
  React.useEffect(() => {
    if (preselectedSubject) {
      setMessage(`Hola, me interesa consultar detalles sobre: ${preselectedSubject}`);
    }
  }, [preselectedSubject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <section id="consulta" className="py-20 md:py-28 border-b border-[#E8E4DC] bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8A7149] font-medium block mb-2">
            Inspirado en la sencillez de Alexander &CO.
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#1A1917] font-light leading-tight">
            Iniciar un Diálogo Arquitectónico
          </h2>
          <p className="text-sm text-[#615C54] font-light mt-4 leading-relaxed">
            Aceptamos un número limitado de comisiones residenciales y de hostelería al año para garantizar una supervisión artesanal exhaustiva en cada obra.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-8 bg-[#FDFCFB] p-8 md:p-10 rounded-lg border border-[#DDD6C8] shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#E8E4DC] text-[#1A1917] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#8A7149]" />
                </div>
                <h3 className="text-2xl font-serif text-[#1A1917]">
                  Solicitud Recibida con Éxito
                </h3>
                <p className="text-sm text-[#615C54] max-w-md mx-auto leading-relaxed">
                  Gracias, {name}. Elena Vilar y el equipo del atelier revisarán el dossier de tu espacio y se pondrán en contacto en un plazo de 24 a 48 horas hábiles.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest text-[#1A1917] border border-[#DDD6C8] rounded hover:bg-[#F2EFE8] transition-colors cursor-pointer"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Step 1: Typology Selector (Button Tabs) */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#787268] font-medium mb-3">
                    01. Tipología del Espacio
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Residencial', 'Hospitality', 'Retail', 'Colección'] as ProjectCategory[]).map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setTypology(cat)}
                        className={`py-2.5 px-3 text-xs font-medium rounded transition-all text-center cursor-pointer ${
                          typology === cat
                            ? 'bg-[#1A1917] text-[#F8F7F4] shadow-xs'
                            : 'bg-[#F2EFE9] text-[#555047] hover:bg-[#E5DFD4]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Scale & Surface Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#787268] font-medium mb-2">
                      02. Superficie Estimada
                    </label>
                    <select
                      value={areaRange}
                      onChange={(e) => setAreaRange(e.target.value)}
                      className="w-full bg-[#F5F2EB] border border-[#D5CEC0] rounded p-2.5 text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                    >
                      <option value="Menos de 150 m²">Menos de 150 m²</option>
                      <option value="150 - 300 m²">150 - 300 m² (Apartamento / Ático)</option>
                      <option value="300 - 600 m²">300 - 600 m² (Villa unifamiliar / Local)</option>
                      <option value="Más de 600 m²">Más de 600 m² (Finca / Complejo)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#787268] font-medium mb-2">
                      03. Plazo Deseado
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full bg-[#F5F2EB] border border-[#D5CEC0] rounded p-2.5 text-xs text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                    >
                      <option value="Inmediato (1-3 meses)">Inmediato (1 a 3 meses)</option>
                      <option value="Medio plazo (3-6 meses)">Medio plazo (3 a 6 meses)</option>
                      <option value="Largo plazo (6-12 meses)">Planificación (6 a 12 meses)</option>
                    </select>
                  </div>
                </div>

                {/* Step 3: Contact Info */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#787268] font-medium mb-3">
                    04. Datos de Contacto
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Nombre completo *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#F5F2EB] border border-[#D5CEC0] rounded p-2.5 text-xs text-[#1A1917] placeholder-[#8A847B] focus:outline-none focus:border-[#1A1917]"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Correo electrónico *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F5F2EB] border border-[#D5CEC0] rounded p-2.5 text-xs text-[#1A1917] placeholder-[#8A847B] focus:outline-none focus:border-[#1A1917]"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Teléfono móvil"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#F5F2EB] border border-[#D5CEC0] rounded p-2.5 text-xs text-[#1A1917] placeholder-[#8A847B] focus:outline-none focus:border-[#1A1917]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Ciudad / Ubicación del proyecto"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-[#F5F2EB] border border-[#D5CEC0] rounded p-2.5 text-xs text-[#1A1917] placeholder-[#8A847B] focus:outline-none focus:border-[#1A1917]"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 4: Notes */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#787268] font-medium mb-2">
                    05. Visión del Proyecto & Comentarios
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos brevemente sobre el espacio, tus necesidades de estilo de vida o el concepto que deseas materializar..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#F5F2EB] border border-[#D5CEC0] rounded p-3 text-xs text-[#1A1917] placeholder-[#8A847B] focus:outline-none focus:border-[#1A1917] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-medium text-[#F8F7F4] bg-[#1A1917] hover:bg-[#322E28] rounded transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <span>Enviar Dossier de Consulta</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Studio Contact & Assurance */}
          <div className="lg:col-span-4 space-y-8 flex flex-col justify-between">
            <div className="bg-[#F2EFE8] p-6 rounded-lg border border-[#DDD6C8] space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#1A1917] font-semibold border-b border-[#DCD5C6] pb-2">
                Atención Directa
              </h4>

              <div className="space-y-4 text-xs text-[#4F4A42]">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#8A7149] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[#827C72] text-[11px]">Consultas Privadas</span>
                    <a href={`mailto:${studioConfig.email}`} className="font-medium hover:underline text-[#1A1917]">
                      {studioConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#8A7149] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[#827C72] text-[11px]">Teléfono Atelier</span>
                    <span className="font-medium text-[#1A1917]">{studioConfig.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#8A7149] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[#827C72] text-[11px]">Sedes del Estudio</span>
                    <span className="font-medium text-[#1A1917]">{studioConfig.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#EBE7DF] rounded-lg border border-[#D5CEC0]">
              <span className="text-[10px] uppercase tracking-widest text-[#8A7149] block font-semibold mb-1">
                Garantía de Atelier
              </span>
              <p className="text-xs text-[#524D45] leading-relaxed italic font-serif">
                &ldquo;Cada proyecto es tratado como una obra única. No subcontratamos la dirección de arte ni el diseño de detalle.&rdquo;
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
