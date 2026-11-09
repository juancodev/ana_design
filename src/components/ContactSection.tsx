import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useSite } from '../store/SiteStore';

const labelClass = 'block text-[11px] uppercase tracking-wider font-semibold mb-2';
const fieldClass =
  'w-full px-4 py-2.5 bg-paper border rounded-md text-sm text-olive placeholder:text-[#AAAA99] focus:outline-none focus:border-olive';
const errorClass = 'block mt-1.5 text-xs text-terracotta';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactSectionProps {
  // Lets the design board show each state without filling the form
  initialState?: 'form' | 'error' | 'sent';
}

// "Comisionar proyecto" inquiry form. Each submission lands in the CMS inbox.
export const ContactSection: React.FC<ContactSectionProps> = ({ initialState = 'form' }) => {
  const { settings, addInquiry } = useSite();
  const [typology, setTypology] = useState(settings.typologies[0] ?? '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState(settings.areas[0] ?? '');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(initialState === 'sent');
  const [showErrors, setShowErrors] = useState(initialState === 'error');

  const errors = {
    name: name.trim() ? '' : 'Escriba su nombre y apellidos.',
    email: !email.trim()
      ? 'Escriba su correo electrónico.'
      : EMAIL_PATTERN.test(email) ? '' : 'Revise el correo: el formato no es válido.',
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasErrors) {
      setShowErrors(true);
      return;
    }
    addInquiry({ typology, name: name.trim(), email: email.trim(), location: location.trim(), area, message: message.trim() });
    setSubmitted(true);
  };

  const reset = () => {
    setName('');
    setEmail('');
    setLocation('');
    setMessage('');
    setShowErrors(false);
    setSubmitted(false);
  };

  const borderFor = (error: string) => (showErrors && error ? 'border-terracotta' : 'border-olive/15');

  return (
    <section id="consulta" className="scroll-mt-16 md:scroll-mt-20 bg-olive-light py-24 md:py-32 px-4 sm:px-8">
      <div className="text-center mb-10">
        <span className="block text-[11px] uppercase tracking-[0.3em] font-medium mb-2">
          {settings.contactEyebrow}
        </span>
        <h2 className="font-sans text-4xl sm:text-5xl font-bold text-olive">{settings.contactTitle}</h2>
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
              onClick={reset}
              className="mt-4 px-6 py-2 bg-olive text-cream text-xs uppercase tracking-wider rounded-md cursor-pointer"
            >
              Enviar otra consulta
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <span className={labelClass}>Tipología de diseño</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {settings.typologies.map((type) => (
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
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="p. ej. Marqués de Valero / Dra. Sofía Ramos"
                  aria-invalid={showErrors && !!errors.name}
                  className={`${fieldClass} ${borderFor(errors.name)}`}
                />
                {showErrors && errors.name && <span className={errorClass}>{errors.name}</span>}
              </label>
              <label>
                <span className={labelClass}>Correo electrónico *</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contacto@residencia.com"
                  aria-invalid={showErrors && !!errors.email}
                  className={`${fieldClass} ${borderFor(errors.email)}`}
                />
                {showErrors && errors.email && <span className={errorClass}>{errors.email}</span>}
              </label>
              <label>
                <span className={labelClass}>Ubicación de la finca o propiedad</span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="p. ej. Ibiza, Costa Brava, Madrid Centro, Atenas"
                  className={`${fieldClass} border-olive/15`}
                />
              </label>
              <label>
                <span className={labelClass}>Superficie aproximada</span>
                <select value={area} onChange={(e) => setArea(e.target.value)} className={`${fieldClass} border-olive/15`}>
                  {settings.areas.map((a) => <option key={a}>{a}</option>)}
                </select>
              </label>
            </div>

            <label className="block">
              <span className={labelClass}>Intención espacial & sensorial del proyecto</span>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describa la atmósfera que busca: ¿desea un refugio de introspección con piedra viva, una renovación que maximice la luz natural, o una estancia contemporánea con piezas a medida?"
                className={`${fieldClass} border-olive/15 resize-none`}
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
              <p className="text-center text-xs mt-3">{settings.contactNote}</p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
