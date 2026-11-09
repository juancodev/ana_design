import React, { useEffect, useState } from 'react';
import { CheckCheck, Inbox, Mail, RotateCcw, Trash2 } from 'lucide-react';
import { InquiryStatus } from '../types';
import { useSite } from '../store/SiteStore';
import { PageHeader, useCmsNav } from './CmsApp';
import { Badge, Button, Card, EmptyState, formatDate } from './ui';

const FILTERS: { id: 'todos' | InquiryStatus; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'nuevo', label: 'Nuevos' },
  { id: 'leido', label: 'Leídos' },
  { id: 'atendido', label: 'Atendidos' },
];

const STATUS_BADGE: Record<InquiryStatus, { tone: 'ochre' | 'muted' | 'olive'; label: string }> = {
  nuevo: { tone: 'ochre', label: 'Nuevo' },
  leido: { tone: 'muted', label: 'Leído' },
  atendido: { tone: 'olive', label: 'Atendido' },
};

export const InquiriesView: React.FC = () => {
  const { inquiries, setInquiries } = useSite();
  const { embedded } = useCmsNav();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('todos');
  const [selectedId, setSelectedId] = useState<string | undefined>(inquiries[0]?.id);

  const visible = inquiries.filter((i) => filter === 'todos' || i.status === filter);
  const selected = inquiries.find((i) => i.id === selectedId);

  const setStatus = (id: string, status: InquiryStatus) =>
    setInquiries((list) => list.map((i) => (i.id === id ? { ...i, status } : i)));

  // Opening a new message marks it as read (not on the design board, which only displays it)
  useEffect(() => {
    if (!embedded && selected?.status === 'nuevo') setStatus(selected.id, 'leido');
  }, [selected?.id]);

  const remove = (id: string) => {
    if (!window.confirm('¿Eliminar este mensaje?')) return;
    setInquiries((list) => list.filter((i) => i.id !== id));
    setSelectedId(undefined);
  };

  return (
    <div className="max-w-6xl">
      <PageHeader title="Mensajes" description="Solicitudes recibidas desde el formulario «Comisionar proyecto»." />

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map(({ id, label }) => {
          const count = id === 'todos' ? inquiries.length : inquiries.filter((i) => i.status === id).length;
          return (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                filter === id ? 'bg-olive text-cream' : 'bg-white border border-olive/15 hover:border-olive/40'
              }`}
            >
              {label} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <Card className="lg:col-span-2">
          {visible.length === 0 ? (
            <EmptyState icon={<Inbox className="w-5 h-5" />} title="No hay mensajes aquí">
              Los envíos del formulario de la web aparecerán en esta bandeja.
            </EmptyState>
          ) : (
            <ul className="-m-2 space-y-1">
              {visible.map((inquiry) => (
                <li key={inquiry.id}>
                  <button
                    onClick={() => setSelectedId(inquiry.id)}
                    className={`w-full text-left flex gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      inquiry.id === selectedId ? 'bg-olive/8' : 'hover:bg-olive/4'
                    }`}
                  >
                    <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${inquiry.status === 'nuevo' ? 'bg-ochre' : 'bg-transparent'}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm truncate ${inquiry.status === 'nuevo' ? 'font-semibold' : ''}`}>{inquiry.name}</span>
                        <span className="text-[11px] text-olive/50 whitespace-nowrap">{formatDate(inquiry.createdAt)}</span>
                      </div>
                      <div className="text-xs text-olive/60 truncate">{inquiry.typology} · {inquiry.message || 'Sin mensaje'}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="lg:col-span-3">
          {!selected ? (
            <EmptyState icon={<Mail className="w-5 h-5" />} title="Seleccione un mensaje">
              Elija un mensaje de la lista para ver sus detalles.
            </EmptyState>
          ) : (
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <div>
                  <h2 className="font-sans text-xl font-semibold">{selected.name}</h2>
                  <p className="text-xs text-olive/60">{formatDate(selected.createdAt)}</p>
                </div>
                <Badge tone={STATUS_BADGE[selected.status].tone}>{STATUS_BADGE[selected.status].label}</Badge>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-5">
                {[
                  ['Correo', selected.email],
                  ['Tipología', selected.typology],
                  ['Ubicación', selected.location || '—'],
                  ['Superficie', selected.area || '—'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[11px] uppercase tracking-wider text-olive/55 mb-0.5">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mb-6">
                <div className="text-[11px] uppercase tracking-wider text-olive/55 mb-1">Intención del proyecto</div>
                <p className="text-sm leading-relaxed whitespace-pre-line bg-paper rounded-lg p-4">{selected.message || 'El cliente no escribió un mensaje.'}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="primary"
                  icon={<Mail className="w-4 h-4" />}
                  onClick={() => window.open(`mailto:${selected.email}?subject=${encodeURIComponent('Su proyecto con De Andrade')}`)}
                >
                  Responder por correo
                </Button>
                {selected.status === 'atendido' ? (
                  <Button icon={<RotateCcw className="w-4 h-4" />} onClick={() => setStatus(selected.id, 'leido')}>Marcar como pendiente</Button>
                ) : (
                  <Button icon={<CheckCheck className="w-4 h-4" />} onClick={() => setStatus(selected.id, 'atendido')}>Marcar como atendido</Button>
                )}
                <Button variant="danger" icon={<Trash2 className="w-4 h-4" />} onClick={() => remove(selected.id)}>Eliminar</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
