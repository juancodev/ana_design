import React from 'react';
import { ArrowRight, ExternalLink, FolderOpen, Images, Inbox, Layers, PenLine, Plus } from 'lucide-react';
import { useSite } from '../store/SiteStore';
import { CmsLink, PageHeader, useCmsNav } from './CmsApp';
import { Badge, Button, Card, EmptyState, formatDate } from './ui';
import { createProject } from './projectActions';

export const DashboardView: React.FC = () => {
  const { projects, inquiries, setProjects } = useSite();
  const { go } = useCmsNav();

  const published = projects.filter((p) => p.published).length;
  const spaces = projects.reduce((n, p) => n + p.spaces.length, 0);
  const renders = projects.reduce((n, p) => n + p.spaces.reduce((m, s) => m + s.renders.length, 0), 0);
  const newMessages = inquiries.filter((i) => i.status === 'nuevo');

  const stats = [
    { label: 'Proyectos publicados', value: `${published} / ${projects.length}`, icon: FolderOpen },
    { label: 'Ambientes', value: spaces, icon: Layers },
    { label: 'Renders', value: renders, icon: Images },
    { label: 'Mensajes nuevos', value: newMessages.length, icon: Inbox },
  ];

  const addProject = () => {
    const project = createProject(projects);
    setProjects((list) => [...list, project]);
    go(`/admin/proyectos/${project.id}`);
  };

  return (
    <div className="max-w-6xl">
      <PageHeader
        title="Hola, Ana"
        description="Este es el resumen de tu web. Todo lo que cambies aquí se ve al instante en el sitio."
        actions={
          <>
            <Button icon={<ExternalLink className="w-4 h-4" />} onClick={() => window.open('/', '_blank')}>Ver sitio</Button>
            <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={addProject}>Nuevo proyecto</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl border border-olive/10 p-5">
            <Icon className="w-5 h-5 text-olive/50 mb-3" />
            <div className="text-2xl font-semibold">{value}</div>
            <div className="text-xs text-olive/60">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card
          title="Mensajes recientes"
          description="Solicitudes del formulario Comisionar proyecto"
          className="lg:col-span-3"
          actions={<CmsLink to="/admin/mensajes" className="text-xs font-medium inline-flex items-center gap-1 hover:underline">Ver todos <ArrowRight className="w-3.5 h-3.5" /></CmsLink>}
        >
          {inquiries.length === 0 ? (
            <EmptyState icon={<Inbox className="w-5 h-5" />} title="Aún no hay mensajes">
              Cuando alguien envíe el formulario de la web, aparecerá aquí.
            </EmptyState>
          ) : (
            <ul className="divide-y divide-olive/10 -my-2">
              {inquiries.slice(0, 4).map((inquiry) => (
                <li key={inquiry.id}>
                  <CmsLink to="/admin/mensajes" className="flex items-start gap-3 py-3 hover:bg-olive/3 rounded-lg px-2 -mx-2">
                    <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${inquiry.status === 'nuevo' ? 'bg-ochre' : 'bg-transparent'}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{inquiry.name}</span>
                        <Badge tone="muted">{inquiry.typology}</Badge>
                      </div>
                      <p className="text-xs text-olive/60 truncate">{inquiry.message || 'Sin mensaje'}</p>
                    </div>
                    <span className="text-[11px] text-olive/50 whitespace-nowrap">{formatDate(inquiry.createdAt)}</span>
                  </CmsLink>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card title="Proyectos" actions={<CmsLink to="/admin/proyectos" className="text-xs font-medium inline-flex items-center gap-1 hover:underline">Gestionar <ArrowRight className="w-3.5 h-3.5" /></CmsLink>}>
            <ul className="space-y-3">
              {projects.map((project) => {
                const cover = project.spaces[0]?.renders[0];
                return (
                  <li key={project.id}>
                    <CmsLink to={`/admin/proyectos/${project.id}`} className="flex items-center gap-3 group">
                      <div className="w-14 h-10 rounded-md bg-olive/10 overflow-hidden shrink-0">
                        {cover && <img src={cover.thumb} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm truncate group-hover:underline">
                          {project.kind} <span className="font-script text-base">{project.name}</span>
                        </div>
                        <div className="text-[11px] text-olive/55 truncate">{project.location}</div>
                      </div>
                      <Badge tone={project.published ? 'olive' : 'muted'}>{project.published ? 'Publicado' : 'Borrador'}</Badge>
                    </CmsLink>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card title="Accesos rápidos">
            <div className="grid gap-2">
              <Button className="justify-start" icon={<PenLine className="w-4 h-4" />} onClick={() => go('/admin/contenido')}>Editar el lema y la portada</Button>
              <Button className="justify-start" icon={<Inbox className="w-4 h-4" />} onClick={() => go('/admin/mensajes')}>Revisar mensajes</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
