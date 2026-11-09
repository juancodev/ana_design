import React from 'react';
import { ArrowDown, ArrowUp, ExternalLink, FolderOpen, Pencil, Plus, Trash2 } from 'lucide-react';
import { useSite } from '../store/SiteStore';
import { PageHeader, useCmsNav } from './CmsApp';
import { Badge, Button, Card, EmptyState, Toggle } from './ui';
import { createProject, move } from './projectActions';

export const ProjectsView: React.FC = () => {
  const { projects, setProjects, updateProject } = useSite();
  const { go } = useCmsNav();

  const addProject = () => {
    const project = createProject(projects);
    setProjects((list) => [...list, project]);
    go(`/admin/proyectos/${project.id}`);
  };

  const remove = (id: string, title: string) => {
    if (window.confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) {
      setProjects((list) => list.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Proyectos"
        description="El orden de esta lista es el orden en que aparecen en la portada. Los borradores no se ven en la web."
        actions={<Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={addProject}>Nuevo proyecto</Button>}
      />

      <Card>
        {projects.length === 0 ? (
          <EmptyState icon={<FolderOpen className="w-5 h-5" />} title="No hay proyectos">
            Cree el primero con el botón «Nuevo proyecto».
          </EmptyState>
        ) : (
          <ul className="divide-y divide-olive/10 -my-2">
            {projects.map((project, index) => {
              const cover = project.spaces[0]?.renders[0];
              const renderCount = project.spaces.reduce((n, s) => n + s.renders.length, 0);
              const title = `${project.kind} ${project.name}`;
              return (
                <li key={project.id} className="flex flex-col md:flex-row md:items-center gap-4 py-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex flex-col">
                      <button
                        onClick={() => setProjects((list) => move(list, index, -1))}
                        disabled={index === 0}
                        className="p-1 rounded hover:bg-olive/8 disabled:opacity-25 cursor-pointer disabled:cursor-default"
                        aria-label={`Subir ${title}`}
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setProjects((list) => move(list, index, 1))}
                        disabled={index === projects.length - 1}
                        className="p-1 rounded hover:bg-olive/8 disabled:opacity-25 cursor-pointer disabled:cursor-default"
                        aria-label={`Bajar ${title}`}
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="w-24 h-16 rounded-lg bg-olive/10 overflow-hidden shrink-0">
                      {cover && <img src={cover.thumb} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-base truncate">
                        {project.kind} <span className="font-script text-xl">{project.name}</span>
                      </div>
                      <div className="text-xs text-olive/60 truncate">{project.location}</div>
                      <div className="text-[11px] text-olive/50 mt-0.5">
                        {project.spaces.length} {project.spaces.length === 1 ? 'ambiente' : 'ambientes'} · {renderCount} renders
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 md:gap-4 pl-10 md:pl-0">
                    <Badge tone={project.published ? 'olive' : 'muted'}>{project.published ? 'Publicado' : 'Borrador'}</Badge>
                    <Toggle
                      checked={project.published}
                      onChange={(published) => updateProject(project.id, (p) => ({ ...p, published }))}
                      label="Visible"
                    />
                    <Button size="sm" icon={<Pencil className="w-3.5 h-3.5" />} onClick={() => go(`/admin/proyectos/${project.id}`)}>
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<ExternalLink className="w-3.5 h-3.5" />}
                      disabled={!project.published}
                      onClick={() => window.open(`/proyectos/${project.slug}`, '_blank')}
                    >
                      Ver
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(project.id, title)} aria-label={`Eliminar ${title}`}>
                      <Trash2 className="w-3.5 h-3.5 text-terracotta" />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
};
