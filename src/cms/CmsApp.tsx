import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, ExternalLink, FolderOpen, Inbox, LayoutDashboard, LogOut, PenLine, TriangleAlert, UserRound } from 'lucide-react';
import { DeAndradeEmblem } from '../components/DeAndradeLogo';
import { navigate, usePath } from '../lib/router';
import { useSite } from '../store/SiteStore';
import { LoginView } from './LoginView';
import { DashboardView } from './DashboardView';
import { ProjectsView } from './ProjectsView';
import { ProjectEditorView } from './ProjectEditorView';
import { InquiriesView } from './InquiriesView';
import { SettingsView } from './SettingsView';
import { AboutView } from './AboutView';

// Demo session kept for the browser tab until the backend adds real accounts
const SESSION_KEY = 'deandrade-cms-session';

const readSession = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
};

// Navigation inside the CMS. On /admin it moves the browser URL; embedded in the design board it
// only changes local state so the board page stays put.
const CmsNavContext = createContext<{ path: string; go: (path: string) => void; embedded: boolean }>({
  path: '/admin',
  go: navigate,
  embedded: false,
});
export const useCmsNav = () => useContext(CmsNavContext);

export const CmsLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }> = ({ to, onClick, ...props }) => {
  const { go } = useCmsNav();
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.button !== 0) return;
        e.preventDefault();
        go(to);
      }}
      {...props}
    />
  );
};

const NAV = [
  { to: '/admin', label: 'Panel', icon: LayoutDashboard, match: (p: string) => p === '/admin' },
  { to: '/admin/proyectos', label: 'Proyectos', icon: FolderOpen, match: (p: string) => p.startsWith('/admin/proyectos') },
  { to: '/admin/mensajes', label: 'Mensajes', icon: Inbox, match: (p: string) => p.startsWith('/admin/mensajes') },
  { to: '/admin/sobre-mi', label: 'Sobre mí', icon: UserRound, match: (p: string) => p.startsWith('/admin/sobre-mi') },
  { to: '/admin/contenido', label: 'Contenido del sitio', icon: PenLine, match: (p: string) => p.startsWith('/admin/contenido') },
];

interface CmsAppProps {
  // When set, the CMS renders this screen inside a fixed-height frame (design board)
  embeddedPath?: string;
  className?: string;
}

export const CmsApp: React.FC<CmsAppProps> = ({ embeddedPath, className = 'h-screen' }) => {
  const routerPath = usePath();
  const [localPath, setLocalPath] = useState(embeddedPath ?? '/admin');
  const [loggedIn, setLoggedIn] = useState(() => (embeddedPath ? embeddedPath !== '/admin/login' : readSession()));
  const { inquiries, saved } = useSite();

  const embedded = embeddedPath !== undefined;
  const path = (embedded ? localPath : routerPath).replace(/\/$/, '') || '/admin';
  const go = embedded ? setLocalPath : navigate;

  const login = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // Session only lasts while the page is open
    }
    setLoggedIn(true);
    if (path === '/admin/login') go('/admin');
  };
  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Nothing stored
    }
    setLoggedIn(false);
  };

  if (!loggedIn || path === '/admin/login') {
    return (
      <div className={className}>
        <LoginView onLogin={login} />
      </div>
    );
  }

  const newMessages = inquiries.filter((i) => i.status === 'nuevo').length;
  const projectMatch = path.match(/^\/admin\/proyectos\/([^/]+)$/);

  let screen: React.ReactNode;
  if (projectMatch) screen = <ProjectEditorView projectId={projectMatch[1]} />;
  else if (path === '/admin/proyectos') screen = <ProjectsView />;
  else if (path === '/admin/mensajes') screen = <InquiriesView />;
  else if (path === '/admin/contenido') screen = <SettingsView />;
  else if (path === '/admin/sobre-mi') screen = <AboutView />;
  else screen = <DashboardView />;

  return (
    <CmsNavContext.Provider value={{ path, go, embedded }}>
      <div className={`flex flex-col lg:flex-row bg-paper text-olive font-sans overflow-hidden ${className}`}>

        {/* Sidebar (top bar on small screens) */}
        <aside className="lg:w-64 shrink-0 bg-olive text-cream flex lg:flex-col">
          <div className="flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-6 lg:border-b border-cream/15">
            <DeAndradeEmblem size={30} color="#DBCAA2" />
            <div className="hidden sm:block leading-tight">
              <div className="font-script text-2xl">De Andrade</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-cream/60">Gestor de contenidos</div>
            </div>
          </div>

          <nav className="flex lg:flex-col gap-1 px-2 lg:px-3 lg:py-4 overflow-x-auto flex-1 items-center lg:items-stretch">
            {NAV.map(({ to, label, icon: Icon, match }) => (
              <CmsLink
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  match(path) ? 'bg-cream/15 text-cream' : 'text-cream/70 hover:text-cream hover:bg-cream/8'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{label}</span>
                {to === '/admin/mensajes' && newMessages > 0 && (
                  <span className="ml-auto min-w-5 h-5 px-1.5 rounded-full bg-ochre text-[11px] font-semibold text-white flex items-center justify-center">
                    {newMessages}
                  </span>
                )}
              </CmsLink>
            ))}
          </nav>

          <div className="hidden lg:block px-3 py-4 border-t border-cream/15 space-y-1">
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-cream/70 hover:text-cream hover:bg-cream/8">
              <ExternalLink className="w-4 h-4" />
              Ver sitio
            </a>
            <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-cream/70 hover:text-cream hover:bg-cream/8 cursor-pointer">
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
            <div className="flex items-center gap-3 px-3 pt-3">
              <div className="w-8 h-8 rounded-full bg-cream text-olive text-xs font-semibold flex items-center justify-center">AA</div>
              <div className="text-xs leading-tight">
                <div className="text-cream">Ana de Andrade</div>
                <div className="text-cream/55">Administradora</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center justify-end gap-3 px-4 sm:px-8 py-2.5 border-b border-olive/10 bg-white/60 text-xs">
            {saved ? (
              <span className="inline-flex items-center gap-1.5 text-olive/70">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Cambios aplicados y guardados en este navegador
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-terracotta">
                <TriangleAlert className="w-3.5 h-3.5" />
                Cambios aplicados, pero el navegador no tiene espacio para guardarlos
              </span>
            )}
          </div>
          <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8">{screen}</main>
        </div>

      </div>
    </CmsNavContext.Provider>
  );
};

// Page heading shared by every CMS screen
export const PageHeader: React.FC<{ title: string; description?: string; breadcrumb?: React.ReactNode; actions?: React.ReactNode }> = ({
  title,
  description,
  breadcrumb,
  actions,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
    <div>
      {breadcrumb && <div className="text-xs text-olive/60 mb-1">{breadcrumb}</div>}
      <h1 className="font-sans text-2xl font-semibold text-olive">{title}</h1>
      {description && <p className="text-sm text-olive/65 mt-1">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </div>
);
