import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { DeAndradeEmblem } from '../components/DeAndradeLogo';
import { useSite } from '../store/SiteStore';
import { Button, Field, inputClass } from './ui';

// Demo sign-in: any email and password open the CMS until the backend adds real accounts
export const LoginView: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const { settings } = useSite();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="h-full min-h-[600px] grid lg:grid-cols-2 bg-paper font-sans text-olive">
      <div className="relative hidden lg:block bg-olive overflow-hidden">
        <img src={settings.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-cream">
          <DeAndradeEmblem size={110} color="#DBCAA2" />
          <div className="font-script text-5xl mt-4">De Andrade</div>
          <div className="text-[11px] uppercase tracking-[0.35em] mt-2">Interior Design</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <form
          className="w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.trim() || !password) {
              setError('Escriba su correo y su contraseña.');
              return;
            }
            onLogin();
          }}
        >
          <div className="lg:hidden flex justify-center mb-6">
            <DeAndradeEmblem size={56} color="#5E6145" />
          </div>
          <h1 className="font-sans text-2xl font-semibold">Gestor de contenidos</h1>
          <p className="text-sm text-olive/65 mt-1 mb-8">Inicie sesión para editar la web de {settings.studioName}.</p>

          <div className="space-y-4">
            <Field label="Correo electrónico">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nombre@correo.com" className={inputClass} />
            </Field>
            <Field label="Contraseña">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
            </Field>
            {error && <p className="text-xs text-terracotta">{error}</p>}
            <Button type="submit" variant="primary" className="w-full" icon={<LogIn className="w-4 h-4" />}>
              Entrar
            </Button>
          </div>

          <p className="mt-6 text-[11px] text-olive/55 leading-relaxed">
            Versión de demostración: cualquier correo y contraseña dan acceso. Las cuentas reales llegarán con el servidor.
          </p>
        </form>
      </div>
    </div>
  );
};
