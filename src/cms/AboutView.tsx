import React from 'react';
import { ArrowDown, ArrowUp, ExternalLink, Plus, Trash2, X } from 'lucide-react';
import { AboutContent } from '../types';
import { useSite } from '../store/SiteStore';
import { fileToImage } from '../lib/images';
import { AboutSection, PortraitPlaceholder } from '../components/AboutSection';
import { PageHeader } from './CmsApp';
import { Button, Card, Field, inputClass, ScaledPreview, UploadButton } from './ui';
import { move } from './projectActions';

type TextKey = 'firstName' | 'lastName' | 'role' | 'scriptWord' | 'introLead' | 'introBody' | 'sideText' | 'buttonLabel' | 'story' | 'ctaTitle' | 'ctaText';

interface RepeaterProps<T> {
  items: T[];
  fields: { key: keyof T & string; label: string; multiline?: boolean }[];
  empty: T;
  addLabel: string;
  onChange: (items: T[]) => void;
}

// Editable list of small records (milestones, steps, tools) with add, reorder and delete
function Repeater<T extends Record<string, string>>({ items, fields, empty, addLabel, onChange }: RepeaterProps<T>) {
  const set = (index: number, key: keyof T, value: string) =>
    onChange(items.map((item, i) => (i === index ? { ...item, [key]: value } : item)));

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex gap-3 items-start rounded-lg border border-olive/15 p-3">
          <span className="text-xs text-olive/45 pt-8 w-5 shrink-0">{String(index + 1).padStart(2, '0')}</span>
          <div className={`flex-1 grid gap-3 ${fields.length > 2 ? 'sm:grid-cols-2' : fields.length === 2 ? 'sm:grid-cols-2' : ''}`}>
            {fields.map((field) => (
              <Field key={field.key} label={field.label} className={field.multiline && fields.length > 2 ? 'sm:col-span-2' : ''}>
                {field.multiline ? (
                  <textarea rows={2} value={item[field.key]} onChange={(e) => set(index, field.key, e.target.value)} className={`${inputClass} resize-y`} />
                ) : (
                  <input value={item[field.key]} onChange={(e) => set(index, field.key, e.target.value)} className={inputClass} />
                )}
              </Field>
            ))}
          </div>
          <div className="flex flex-col pt-6">
            <button onClick={() => onChange(move(items, index, -1))} disabled={index === 0} className="p-1 rounded hover:bg-olive/8 disabled:opacity-25 cursor-pointer" aria-label="Subir">
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onChange(move(items, index, 1))} disabled={index === items.length - 1} className="p-1 rounded hover:bg-olive/8 disabled:opacity-25 cursor-pointer" aria-label="Bajar">
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onChange(items.filter((_, i) => i !== index))} className="p-1 rounded hover:bg-terracotta/10 cursor-pointer" aria-label="Eliminar">
              <Trash2 className="w-3.5 h-3.5 text-terracotta" />
            </button>
          </div>
        </div>
      ))}
      <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => onChange([...items, { ...empty }])}>
        {addLabel}
      </Button>
    </div>
  );
}

export const AboutView: React.FC = () => {
  const { about, setAbout } = useSite();

  const text = (key: TextKey) => ({
    value: about[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setAbout({ [key]: e.target.value } as Partial<AboutContent>),
  });

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Sobre mí"
        description="Tu presentación en la portada y la página «Sobre mí». Los cambios se ven al instante."
        actions={<Button icon={<ExternalLink className="w-4 h-4" />} onClick={() => window.open('/sobre-mi', '_blank')}>Ver la página</Button>}
      />

      <div className="space-y-6">
        <Card title="Presentación en la portada" description="Sección entre el último proyecto y el formulario.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Field label="Foto" hint="Ideal: PNG vertical sin fondo, para que la figura se recorte sobre las formas de color.">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-24 rounded-lg bg-olive/10 flex items-end justify-center overflow-hidden">
                    {about.photo ? (
                      <img src={about.photo} alt="" className="w-full h-full object-contain object-bottom" />
                    ) : (
                      <PortraitPlaceholder className="w-16 text-olive-light" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadButton size="sm" label={about.photo ? 'Cambiar foto' : 'Subir foto'} onFiles={async ([file]) => setAbout({ photo: (await fileToImage(file)).src })} />
                    {about.photo && (
                      <Button size="sm" variant="ghost" onClick={() => setAbout({ photo: '' })}>Quitar foto</Button>
                    )}
                  </div>
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nombre"><input {...text('firstName')} className={inputClass} /></Field>
                <Field label="Apellido"><input {...text('lastName')} className={inputClass} /></Field>
                <Field label="Profesión"><input {...text('role')} className={inputClass} /></Field>
                <Field label="Palabra caligráfica"><input {...text('scriptWord')} className={inputClass} /></Field>
              </div>
              <Field label="Saludo (en negrita)"><textarea rows={2} {...text('introLead')} className={`${inputClass} resize-y`} /></Field>
              <Field label="Texto de presentación"><textarea rows={3} {...text('introBody')} className={`${inputClass} resize-y`} /></Field>
              <Field label="Texto de la derecha"><textarea rows={3} {...text('sideText')} className={`${inputClass} resize-y`} /></Field>
              <Field label="Texto del botón" hint="Lleva a la página «Sobre mí»."><input {...text('buttonLabel')} className={inputClass} /></Field>
            </div>
            <div className="lg:sticky lg:top-0 self-start">
              <span className="block text-xs font-medium mb-1.5">Vista previa</span>
              <ScaledPreview width={1280}>
                <AboutSection about={about} />
              </ScaledPreview>
            </div>
          </div>
        </Card>

        <Card title="Página «Sobre mí»" description="Tu historia y fotos adicionales.">
          <div className="space-y-4">
            <Field label="Tu historia" hint="Deja una línea en blanco entre párrafos.">
              <textarea rows={8} {...text('story')} className={`${inputClass} resize-y`} />
            </Field>
            <Field label="Fotos adicionales (hasta 2)">
              <div className="flex flex-wrap items-center gap-3">
                {about.pagePhotos.map((src, i) => (
                  <div key={i} className="relative w-32 h-24 rounded-lg overflow-hidden">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setAbout({ pagePhotos: about.pagePhotos.filter((_, j) => j !== i) })}
                      className="absolute top-1 right-1 p-0.5 rounded bg-white/90 cursor-pointer"
                      aria-label="Quitar foto"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {about.pagePhotos.length < 2 && (
                  <UploadButton
                    size="sm"
                    label="Añadir foto"
                    onFiles={async ([file]) => setAbout({ pagePhotos: [...about.pagePhotos, (await fileToImage(file)).src].slice(0, 2) })}
                  />
                )}
              </div>
            </Field>
          </div>
        </Card>

        <Card title="Trayectoria" description="Etapas de tu camino profesional.">
          <Repeater
            items={about.milestones}
            fields={[
              { key: 'period', label: 'Etapa o año' },
              { key: 'title', label: 'Título' },
              { key: 'description', label: 'Descripción', multiline: true },
            ]}
            empty={{ period: '', title: '', description: '' }}
            addLabel="Añadir etapa"
            onChange={(milestones) => setAbout({ milestones })}
          />
        </Card>

        <Card title="Cómo trabajo" description="Pasos de tu proceso con cada cliente.">
          <Repeater
            items={about.process}
            fields={[
              { key: 'title', label: 'Paso' },
              { key: 'description', label: 'Descripción' },
            ]}
            empty={{ title: '', description: '' }}
            addLabel="Añadir paso"
            onChange={(process) => setAbout({ process })}
          />
        </Card>

        <Card title="Herramientas y programas" description="Se agrupan por categoría en la página.">
          <Repeater
            items={about.tools}
            fields={[
              { key: 'name', label: 'Programa o herramienta' },
              { key: 'category', label: 'Categoría' },
            ]}
            empty={{ name: '', category: '' }}
            addLabel="Añadir herramienta"
            onChange={(tools) => setAbout({ tools })}
          />
        </Card>

        <Card title="Cierre de la página" description="Invitación final antes del formulario.">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Título"><input {...text('ctaTitle')} className={inputClass} /></Field>
            <Field label="Texto"><input {...text('ctaText')} className={inputClass} /></Field>
          </div>
        </Card>
      </div>
    </div>
  );
};
