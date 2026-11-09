import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

const TYPOLOGIES = ['Residencial', 'Hotelero', 'Comercial', 'Otro'];
const AREAS = ['Menor a 150 m²', '150 m² — 350 m²', '350 m² — 700 m²', 'Más de 700 m²'];

const labelClass = 'block text-[11px] uppercase tracking-wider font-semibold mb-2';
const fieldClass =
  'w-full px-4 py-2.5 bg-paper border border-olive/15 rounded-md text-sm text-olive placeholder:text-[#AAAA99] focus:outline-none focus:border-olive';

// "Comisionar proyecto" inquiry form. Submission is local only until the backend phase.
export const ContactSection: React.FC = () => {
  const [typology, setTypology] = useState(TYPOLOGIES[0]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="consulta" className="scroll-mt-16 md:scroll-mt-20 bg-olive-light py-24 md:py-32 px-4 sm:px-8">
      <div className="text-center mb-10">
        <span className="block text-[11px] uppercase tracking-[0.3em] font-medium mb-2">
          Diálogo confidencial
        </span>
        <h2 className="font-sans text-4xl sm:text-5xl font-bold text-olive">Comisionar proyecto</h2>
      </div>

      <div className="max-w-[53rem] mx-auto bg-cream rounded-2xl border border-cream-light p-6 sm:p-12">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-12 h-12 mx-auto" />
            <h3 className="font-sans text-2xl font-semibold text-olive">Solicitud enviada</h3>
            <p className="text-sm max-w-md mx-auto">
              Hemos recibido los detalles de su proyecto. Nos pondremos en contacto en un plazo de 24 a 48 horas.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2 bg-olive text-cream text-xs uppercase tracking-wider rounded-md cursor-pointer"
            >
              Enviar otra consulta
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-6"
          >
            <div>
              <span className={labelClass}>Tipología de diseño</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TYPOLOGIES.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setTypology(type)}
                    aria-pressed={typology === type}
                    className={`py-2 text-xs rounded-md transition-colors cursor-pointer ${
                      typology === type ? 'bg-olive-muted text-cream-light' : 'hover:bg-olive-muted/20'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label>
                <span className={labelClass}>Nombre & apellidos *</span>
                <input type="text" required placeholder="p. ej. Marqués de Valero / Dra. Sofía Ramos" className={fieldClass} />
              </label>
              <label>
                <span className={labelClass}>Correo electrónico *</span>
                <input type="email" required placeholder="contacto@residencia.com" className={fieldClass} />
              </label>
              <label>
                <span className={labelClass}>Ubicación de la finca o propiedad</span>
                <input type="text" placeholder="p. ej. Ibiza, Costa Brava, Madrid Centro, Atenas" className={fieldClass} />
              </label>
              <label>
                <span className={labelClass}>Superficie aproximada</span>
                <select className={fieldClass}>
                  {AREAS.map((area) => <option key={area}>{area}</option>)}
                </select>
              </label>
            </div>

            <label className="block">
              <span className={labelClass}>Intención espacial & sensorial del proyecto</span>
              <textarea
                rows={4}
                placeholder="Describa la atmósfera que busca: ¿desea un refugio de introspección con piedra viva, una renovación que maximice la luz natural, o una estancia contemporánea con piezas a medida?"
                className={`${fieldClass} resize-none`}
              />
            </label>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-3.5 bg-olive-light hover:bg-olive-light/85 text-white text-xs font-semibold uppercase tracking-[0.3em] rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>Enviar solicitud de comisión confidencial</span>
                <ArrowUpRight className="w-4 h-4 text-olive" />
              </button>
              <p className="text-center text-xs mt-3">
                Estricta confidencialidad bajo acuerdo de discreción profesional.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
