import React, { useEffect, useRef, useState } from 'react';
import { ImagePlus, Loader2, Plus, X } from 'lucide-react';

// Shared building blocks for the CMS screens (sober version of the brand palette)

export const inputClass =
  'w-full px-3.5 py-2.5 bg-white border border-olive/20 rounded-lg text-sm text-olive placeholder:text-olive/40 focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/10';

export const Card: React.FC<{ title?: string; description?: string; actions?: React.ReactNode; className?: string; children: React.ReactNode }> = ({
  title,
  description,
  actions,
  className = '',
  children,
}) => (
  <section className={`bg-white rounded-xl border border-olive/10 shadow-xs ${className}`}>
    {(title || actions) && (
      <header className="flex items-start justify-between gap-4 px-5 pt-5">
        <div>
          {title && <h2 className="font-sans text-base font-semibold text-olive">{title}</h2>}
          {description && <p className="text-xs text-olive/60 mt-0.5">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </header>
    )}
    <div className="p-5">{children}</div>
  </section>
);

export const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode; className?: string }> = ({ label, hint, children, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="block text-xs font-medium text-olive mb-1.5">{label}</span>
    {children}
    {hint && <span className="block text-[11px] text-olive/55 mt-1">{hint}</span>}
  </label>
);

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-olive text-cream hover:bg-olive/90',
  secondary: 'bg-white text-olive border border-olive/25 hover:border-olive/60',
  ghost: 'text-olive hover:bg-olive/8',
  danger: 'text-terracotta border border-terracotta/30 hover:bg-terracotta/8',
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; icon?: React.ReactNode; size?: 'sm' | 'md' }> = ({
  variant = 'secondary',
  icon,
  size = 'md',
  className = '',
  children,
  ...props
}) => (
  <button
    type="button"
    className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
      size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'
    } ${BUTTON_STYLES[variant]} ${className}`}
    {...props}
  >
    {icon}
    {children}
  </button>
);

export const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; label: string }> = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="inline-flex items-center gap-2.5 text-sm text-olive cursor-pointer"
  >
    <span className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-olive' : 'bg-olive/25'}`}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${checked ? 'left-[18px]' : 'left-0.5'}`} />
    </span>
    {label}
  </button>
);

export const Badge: React.FC<{ tone: 'olive' | 'muted' | 'terracotta' | 'ochre'; children: React.ReactNode }> = ({ tone, children }) => {
  const tones = {
    olive: 'bg-olive/10 text-olive',
    muted: 'bg-olive/5 text-olive/60',
    terracotta: 'bg-terracotta/10 text-terracotta',
    ochre: 'bg-ochre/12 text-ochre',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${tones[tone]}`}>{children}</span>;
};

export const EmptyState: React.FC<{ icon: React.ReactNode; title: string; children?: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex flex-col items-center justify-center text-center gap-2 py-10 px-4 text-olive/70">
    <div className="w-10 h-10 rounded-full bg-olive/8 flex items-center justify-center text-olive">{icon}</div>
    <p className="text-sm font-medium text-olive">{title}</p>
    {children && <div className="text-xs max-w-xs">{children}</div>}
  </div>
);

// File picker that hands the chosen files to `onFiles` and shows a spinner while they are processed
export const UploadButton: React.FC<{ label: string; multiple?: boolean; onFiles: (files: File[]) => Promise<void>; variant?: ButtonVariant; size?: 'sm' | 'md' }> = ({
  label,
  multiple = false,
  onFiles,
  variant = 'secondary',
  size = 'md',
}) => {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  return (
    <>
      <input
        ref={input}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={async (e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = '';
          if (!files.length) return;
          setBusy(true);
          try {
            await onFiles(files);
          } finally {
            setBusy(false);
          }
        }}
      />
      <Button
        variant={variant}
        size={size}
        disabled={busy}
        onClick={() => input.current?.click()}
        icon={busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
      >
        {busy ? 'Procesando…' : label}
      </Button>
    </>
  );
};

// Editable list of short texts shown as chips (typologies, area ranges…)
export const ListEditor: React.FC<{ items: string[]; onChange: (items: string[]) => void; placeholder: string }> = ({ items, onChange, placeholder }) => {
  const [draft, setDraft] = useState('');
  const add = () => {
    const value = draft.trim();
    if (!value || items.includes(value)) return;
    onChange([...items, value]);
    setDraft('');
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {items.map((item) => (
          <span key={item} className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-olive/8 text-sm text-olive">
            {item}
            <button
              type="button"
              onClick={() => onChange(items.filter((i) => i !== item))}
              className="p-0.5 rounded-full hover:bg-olive/15 cursor-pointer"
              aria-label={`Quitar ${item}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className={inputClass}
        />
        <Button onClick={add} icon={<Plus className="w-4 h-4" />} disabled={!draft.trim()}>
          Añadir
        </Button>
      </div>
    </div>
  );
};

// Renders children laid out at `width` px and scaled down to fit the available space,
// used for the live previews of public components
export const ScaledPreview: React.FC<{ width: number; children: React.ReactNode }> = ({ width, children }) => {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={box} className="overflow-hidden rounded-lg border border-olive/10 bg-cream">
      <div style={{ width, zoom: scale }}>{children}</div>
    </div>
  );
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('es-VE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
