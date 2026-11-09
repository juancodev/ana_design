import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useSite } from '../store/SiteStore';
import { seedContent } from '../data/seed';
import { fileToImage } from '../lib/images';
import { Tagline } from '../components/Tagline';
import { Footer } from '../components/Footer';
import { PageHeader } from './CmsApp';
import { Button, Card, Field, inputClass, ListEditor, ScaledPreview, UploadButton } from './ui';

export const SettingsView: React.FC = () => {
  const { settings, setSettings, resetContent } = useSite();

  const text = (key: 'studioName' | 'taglineEyebrow' | 'tagline' | 'contactEyebrow' | 'contactTitle' | 'contactNote' | 'email' | 'location' | 'instagram' | 'copyrightName') => ({
    value: settings[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSettings({ [key]: e.target.value }),
  });

  return (
    <div className="max-w-6xl">
      <PageHeader title="Contenido del sitio" description="Textos e imágenes generales de la web. Los cambios se ven al instante." />

      <div className="space-y-6">
        <Card title="Portada" description="Imagen de fondo del inicio y la franja del lema.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Field label="Imagen de fondo del inicio">
                <div className="flex items-center gap-4">
                  <img src={settings.heroImage} alt="" className="w-32 h-20 rounded-lg object-cover bg-olive/10" />
                  <div className="flex flex-col gap-2">
                    <UploadButton
                      size="sm"
                      label="Cambiar imagen"
                      onFiles={async ([file]) => setSettings({ heroImage: (await fileToImage(file)).src })}
                    />
                    {settings.heroImage !== seedContent.settings.heroImage && (
                      <Button size="sm" variant="ghost" onClick={() => setSettings({ heroImage: seedContent.settings.heroImage })}>
                        Usar la textura original
                      </Button>
                    )}
                  </div>
                </div>
              </Field>
              <Field label="Etiqueta superior del lema">
                <input {...text('taglineEyebrow')} className={inputClass} />
              </Field>
              <Field label="Lema" hint="Encierra palabras entre *asteriscos* para mostrarlas en negrita cursiva.">
                <textarea rows={2} {...text('tagline')} className={`${inputClass} resize-y`} />
              </Field>
            </div>
            <div>
              <span className="block text-xs font-medium mb-1.5">Vista previa</span>
              <ScaledPreview width={1280}>
                <Tagline settings={settings} />
              </ScaledPreview>
            </div>
          </div>
        </Card>

        <Card title="Formulario «Comisionar proyecto»" description="Textos y opciones del formulario de contacto.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Etiqueta superior">
              <input {...text('contactEyebrow')} className={inputClass} />
            </Field>
            <Field label="Título">
              <input {...text('contactTitle')} className={inputClass} />
            </Field>
            <Field label="Nota bajo el botón" className="sm:col-span-2">
              <input {...text('contactNote')} className={inputClass} />
            </Field>
            <Field label="Tipologías de diseño">
              <ListEditor items={settings.typologies} onChange={(typologies) => setSettings({ typologies })} placeholder="Nueva tipología" />
            </Field>
            <Field label="Rangos de superficie">
              <ListEditor items={settings.areas} onChange={(areas) => setSettings({ areas })} placeholder="Nuevo rango" />
            </Field>
          </div>
        </Card>

        <Card title="Contacto y redes" description="Se muestran en el pie de página y en el menú.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
              <Field label="Correo electrónico">
                <input type="email" {...text('email')} className={inputClass} />
              </Field>
              <Field label="Ubicación">
                <input {...text('location')} className={inputClass} />
              </Field>
              <Field label="Instagram" hint="Con @, por ejemplo @deandradesign_">
                <input {...text('instagram')} className={inputClass} />
              </Field>
              <Field label="Nombre del estudio">
                <input {...text('studioName')} className={inputClass} />
              </Field>
              <Field label="Nombre en el copyright" className="sm:col-span-2">
                <input {...text('copyrightName')} className={inputClass} />
              </Field>
            </div>
            <div>
              <span className="block text-xs font-medium mb-1.5">Vista previa del pie de página</span>
              <ScaledPreview width={1280}>
                <Footer />
              </ScaledPreview>
            </div>
          </div>
        </Card>

        <Card title="Restaurar" description="Vuelve a los proyectos, textos y mensajes con los que se entregó la web.">
          <Button
            variant="danger"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={() => {
              if (window.confirm('¿Restaurar todo el contenido original? Se perderán los cambios hechos en este navegador.')) resetContent();
            }}
          >
            Restaurar contenido original
          </Button>
        </Card>
      </div>
    </div>
  );
};
