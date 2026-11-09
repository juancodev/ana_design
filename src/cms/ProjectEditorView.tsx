import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChevronDown, ExternalLink, FolderOpen, ImageOff, Loader2, Plus, Trash2, X } from 'lucide-react';
import { LightTime, PortfolioProject, ProjectSpace, SpaceRender } from '../types';
import { useSite } from '../store/SiteStore';
import { fileToImage, fileToRender } from '../lib/images';
import { LIGHT_TIME_OPTIONS } from '../data/lightStudy';
import { ProjectFeature } from '../components/ProjectFeature';
import { CmsLink, PageHeader, useCmsNav } from './CmsApp';
import { Badge, Button, Card, EmptyState, Field, inputClass, ScaledPreview, Toggle, UploadButton } from './ui';
import { createSpace, move, uniqueSlug, updateSpace } from './projectActions';

export const ProjectEditorView: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { projects, updateProject, setProjects } = useSite();
  const { go } = useCmsNav();
  const project = projects.find((p) => p.id === projectId);
  // The web address follows the title until it is edited by hand
  const [slugTouched, setSlugTouched] = useState(
    () => !!project && project.slug !== uniqueSlug(`${project.kind} ${project.name}`, projects, project.id)
  );

  if (!project) {
    return (
      <Card>
        <EmptyState icon={<FolderOpen className="w-5 h-5" />} title="Este proyecto ya no existe">
          <CmsLink to="/admin/proyectos" className="underline">Volver a la lista de proyectos</CmsLink>
        </EmptyState>
      </Card>
    );
  }

  const update = (patch: Partial<PortfolioProject>) =>
    updateProject(project.id, (p) => {
      const next = { ...p, ...patch };
      if (!slugTouched && (patch.kind !== undefined || patch.name !== undefined)) {
        next.slug = uniqueSlug(`${next.kind} ${next.name}`, projects, p.id);
      }
      return next;
    });
  const changeSpace = (spaceId: string, fn: (space: ProjectSpace) => ProjectSpace) =>
    updateProject(project.id, (p) => updateSpace(p, spaceId, fn));
  const title = `${project.kind} ${project.name}`;

  const remove = () => {
    if (window.confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) {
      setProjects((list) => list.filter((p) => p.id !== project.id));
      go('/admin/proyectos');
    }
  };

  return (
    <div className="max-w-7xl">
      <PageHeader
        breadcrumb={<CmsLink to="/admin/proyectos" className="inline-flex items-center gap-1 hover:underline"><ArrowLeft className="w-3 h-3" /> Proyectos</CmsLink>}
        title={title}
        description="Los cambios se aplican en la web mientras escribes."
        actions={
          <>
            <Toggle checked={project.published} onChange={(published) => update({ published })} label={project.published ? 'Publicado' : 'Borrador'} />
            <Button
              icon={<ExternalLink className="w-4 h-4" />}
              disabled={!project.published}
              onClick={() => window.open(`/proyectos/${project.slug}`, '_blank')}
            >
              Ver en la web
            </Button>
            <Button variant="danger" icon={<Trash2 className="w-4 h-4" />} onClick={remove}>Eliminar</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7 space-y-6">
          <Card title="Información del proyecto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Tipo de proyecto" hint="Se muestra en letra normal. Ej.: Residencia, Hotel.">
                <input value={project.kind} onChange={(e) => update({ kind: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Nombre" hint="Se muestra en letra caligráfica. Ej.: San Luis.">
                <input value={project.name} onChange={(e) => update({ name: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Ubicación">
                <input value={project.location} onChange={(e) => update({ location: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Dirección web" hint={slugTouched ? 'Editada a mano.' : 'Se genera a partir del título.'}>
                <div className="flex items-center rounded-lg border border-olive/20 bg-white focus-within:border-olive overflow-hidden">
                  <span className="pl-3 text-sm text-olive/45 whitespace-nowrap">/proyectos/</span>
                  <input
                    value={project.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      // Light clean-up while typing; the full normalization runs on blur
                      const typed = e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
                      updateProject(project.id, (p) => ({ ...p, slug: typed }));
                    }}
                    onBlur={() => updateProject(project.id, (p) => ({ ...p, slug: uniqueSlug(p.slug, projects, p.id) }))}
                    className="flex-1 min-w-0 px-1 py-2.5 text-sm bg-transparent focus:outline-none"
                  />
                </div>
              </Field>
              <Field label="Descripción" className="sm:col-span-2" hint="Aparece a la derecha de la barra Estudio de Luz.">
                <textarea rows={3} value={project.description} onChange={(e) => update({ description: e.target.value })} className={`${inputClass} resize-y`} />
              </Field>
            </div>
          </Card>

          <Card
            title="Ambientes y renders"
            description="Cada ambiente es una pestaña en la página del proyecto. El primer render del primer ambiente es la portada."
            actions={
              <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => updateProject(project.id, (p) => ({ ...p, spaces: [...p.spaces, createSpace()] }))}>
                Añadir ambiente
              </Button>
            }
          >
            {project.spaces.length === 0 ? (
              <EmptyState icon={<ImageOff className="w-5 h-5" />} title="Sin ambientes">Añada un ambiente para subir renders.</EmptyState>
            ) : (
              <div className="space-y-4">
                {project.spaces.map((space, index) => (
                  <SpaceEditor
                    key={space.id}
                    space={space}
                    index={index}
                    total={project.spaces.length}
                    defaultOpen={index === 0}
                    onChange={(fn) => changeSpace(space.id, fn)}
                    onMove={(direction) => updateProject(project.id, (p) => ({ ...p, spaces: move(p.spaces, index, direction) }))}
                    onDelete={() => {
                      if (window.confirm(`¿Eliminar el ambiente "${space.name}" y sus renders?`)) {
                        updateProject(project.id, (p) => ({ ...p, spaces: p.spaces.filter((s) => s.id !== space.id) }));
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="xl:col-span-5 xl:sticky xl:top-0">
          <Card title="Vista previa en la portada" description="Así se ve este proyecto en la web. Prueba los botones de luz.">
            <ScaledPreview width={1280}>
              <ProjectFeature key={project.id} project={project} />
            </ScaledPreview>
            {!project.published && (
              <p className="mt-3 text-xs text-olive/60">
                <Badge tone="muted">Borrador</Badge> No se muestra en la web hasta que lo publiques.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

interface SpaceEditorProps {
  space: ProjectSpace;
  index: number;
  total: number;
  defaultOpen: boolean;
  onChange: (fn: (space: ProjectSpace) => ProjectSpace) => void;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
}

const SpaceEditor: React.FC<SpaceEditorProps> = ({ space, index, total, defaultOpen, onChange, onMove, onDelete }) => {
  const [open, setOpen] = useState(defaultOpen);
  const setRenders = (fn: (renders: SpaceRender[]) => SpaceRender[]) => onChange((s) => ({ ...s, renders: fn(s.renders) }));

  return (
    <div className="rounded-xl border border-olive/15 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-olive/4">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer" aria-expanded={open}>
          <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? '' : '-rotate-90'}`} />
          <span className="text-xs text-olive/50">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-sm font-medium truncate">{space.name || 'Sin nombre'}</span>
          {space.group && <Badge tone="muted">{space.group}</Badge>}
          <span className="text-[11px] text-olive/50 ml-auto">{space.renders.length} renders</span>
        </button>
        <div className="flex items-center">
          <button onClick={() => onMove(-1)} disabled={index === 0} className="p-1.5 rounded hover:bg-olive/8 disabled:opacity-25 cursor-pointer" aria-label="Subir ambiente">
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => onMove(1)} disabled={index === total - 1} className="p-1.5 rounded hover:bg-olive/8 disabled:opacity-25 cursor-pointer" aria-label="Bajar ambiente">
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded hover:bg-terracotta/10 cursor-pointer" aria-label="Eliminar ambiente">
            <Trash2 className="w-3.5 h-3.5 text-terracotta" />
          </button>
        </div>
      </div>

      {open && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nombre del ambiente">
              <input value={space.name} onChange={(e) => onChange((s) => ({ ...s, name: e.target.value }))} className={inputClass} />
            </Field>
            <Field label="Zona (opcional)" hint="Agrupa las pestañas. Ej.: Restaurante, Hotel.">
              <input
                value={space.group ?? ''}
                onChange={(e) => onChange((s) => ({ ...s, group: e.target.value || undefined }))}
                className={inputClass}
              />
            </Field>
            <Field label="Descripción" className="sm:col-span-2">
              <textarea rows={2} value={space.description} onChange={(e) => onChange((s) => ({ ...s, description: e.target.value }))} className={`${inputClass} resize-y`} />
            </Field>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium">Renders</span>
              <UploadButton
                size="sm"
                multiple
                label="Subir renders"
                onFiles={async (files) => {
                  const renders = await Promise.all(files.map(fileToRender));
                  setRenders((list) => [...list, ...renders]);
                }}
              />
            </div>
            {space.renders.length === 0 ? (
              <div className="rounded-lg border border-dashed border-olive/25 py-8 text-center text-xs text-olive/60">
                Aún no hay renders en este ambiente.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {space.renders.map((render, i) => (
                  <RenderCard
                    key={`${i}-${render.src.slice(-24)}`}
                    render={render}
                    index={i}
                    total={space.renders.length}
                    onChange={(patch) => setRenders((list) => list.map((r, j) => (j === i ? { ...r, ...patch } : r)))}
                    onMove={(direction) => setRenders((list) => move(list, i, direction))}
                    onDelete={() => setRenders((list) => list.filter((_, j) => j !== i))}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface RenderCardProps {
  render: SpaceRender;
  index: number;
  total: number;
  onChange: (patch: Partial<SpaceRender>) => void;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
}

const RenderCard: React.FC<RenderCardProps> = ({ render, index, total, onChange, onMove, onDelete }) => {
  const setVariant = (time: LightTime, image: { src: string; thumb: string } | undefined) => {
    const variants = { ...render.lightVariants, [time]: image };
    if (!image) delete variants[time];
    onChange({ lightVariants: Object.keys(variants).length ? variants : undefined });
  };

  return (
    <div className="rounded-lg border border-olive/15 overflow-hidden bg-white">
      <div className="relative aspect-16/10 bg-olive/10">
        <img src={render.thumb} alt={render.alt} className={`w-full h-full ${render.orientation === 'portrait' ? 'object-contain' : 'object-cover'}`} />
        {index === 0 && <span className="absolute top-2 left-2"><Badge tone="olive">Principal</Badge></span>}
        <div className="absolute top-2 right-2 flex gap-1">
          <button onClick={() => onMove(-1)} disabled={index === 0} className="p-1 rounded bg-white/90 disabled:opacity-40 cursor-pointer" aria-label="Mover antes">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => onMove(1)} disabled={index === total - 1} className="p-1 rounded bg-white/90 disabled:opacity-40 cursor-pointer" aria-label="Mover después">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDelete} className="p-1 rounded bg-white/90 cursor-pointer" aria-label="Eliminar render">
            <Trash2 className="w-3.5 h-3.5 text-terracotta" />
          </button>
        </div>
      </div>
      <div className="p-3 space-y-3">
        <Field label="Texto alternativo" hint="Describe la imagen para buscadores y lectores de pantalla.">
          <input value={render.alt} onChange={(e) => onChange({ alt: e.target.value })} className={`${inputClass} py-2 text-xs`} />
        </Field>
        <div>
          <span className="block text-xs font-medium mb-1.5">Luz real (opcional)</span>
          <div className="grid grid-cols-3 gap-2">
            {LIGHT_TIME_OPTIONS.map((option) => (
              <VariantSlot
                key={option.id}
                label={option.label}
                image={render.lightVariants?.[option.id]}
                onSet={(image) => setVariant(option.id, image)}
              />
            ))}
          </div>
          <span className="block text-[11px] text-olive/55 mt-1.5">
            Sube el mismo encuadre en las tres horas. Sin ellas, la web simula la luz con filtros.
          </span>
        </div>
      </div>
    </div>
  );
};

const VariantSlot: React.FC<{ label: string; image?: { src: string; thumb: string }; onSet: (image: { src: string; thumb: string } | undefined) => void }> = ({
  label,
  image,
  onSet,
}) => {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  return (
    <div className="text-center">
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = '';
          if (!file) return;
          setBusy(true);
          try {
            const { src, thumb } = await fileToImage(file);
            onSet({ src, thumb });
          } finally {
            setBusy(false);
          }
        }}
      />
      {image ? (
        <div className="relative aspect-4/3 rounded-md overflow-hidden">
          <img src={image.thumb} alt="" className="w-full h-full object-cover" />
          <button onClick={() => onSet(undefined)} className="absolute top-1 right-1 p-0.5 rounded bg-white/90 cursor-pointer" aria-label={`Quitar render de ${label}`}>
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => input.current?.click()}
          className="w-full aspect-4/3 rounded-md border border-dashed border-olive/30 hover:border-olive flex items-center justify-center text-olive/60 cursor-pointer"
          aria-label={`Subir render de ${label}`}
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        </button>
      )}
      <span className="block text-[11px] mt-1">{label}</span>
    </div>
  );
};
