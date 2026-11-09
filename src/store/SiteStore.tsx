import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Inquiry, PortfolioProject, SiteContent, SiteSettings } from '../types';
import { seedContent } from '../data/seed';

// Content lives in the browser (localStorage) until the backend phase. Every change applies to the
// site immediately and other open tabs pick it up too. Each part is stored only once it has been
// edited, so visitors who never touch the CMS always get the latest content shipped with the site.
const STORAGE_KEYS: Record<keyof SiteContent, string> = {
  settings: 'deandrade-settings-v1',
  projects: 'deandrade-projects-v1',
  inquiries: 'deandrade-inquiries-v1',
};
const PARTS = Object.keys(STORAGE_KEYS) as (keyof SiteContent)[];

const readPart = <K extends keyof SiteContent>(part: K): SiteContent[K] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[part]);
    if (raw) {
      const value = JSON.parse(raw);
      // Settings are merged so fields added to the seed later get their default
      return (part === 'settings' ? { ...seedContent.settings, ...value } : value) as SiteContent[K];
    }
  } catch {
    // Storage unavailable or corrupt: fall back to the seed
  }
  return seedContent[part];
};

const load = (): SiteContent => ({
  settings: readPart('settings'),
  projects: readPart('projects'),
  inquiries: readPart('inquiries'),
});

interface SiteStore extends SiteContent {
  // False when the browser refused to save (e.g. storage full); changes still apply in this tab
  saved: boolean;
  setSettings: (patch: Partial<SiteSettings>) => void;
  setProjects: (update: (projects: PortfolioProject[]) => PortfolioProject[]) => void;
  updateProject: (id: string, update: (project: PortfolioProject) => PortfolioProject) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  setInquiries: (update: (inquiries: Inquiry[]) => Inquiry[]) => void;
  resetContent: () => void;
}

const SiteStoreContext = createContext<SiteStore | null>(null);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(load);
  const [saved, setSaved] = useState(true);
  // Parts changed in this tab that still need writing to storage
  const dirty = useRef(new Set<keyof SiteContent>());

  const change = useCallback(<K extends keyof SiteContent>(part: K, update: (value: SiteContent[K]) => SiteContent[K]) => {
    dirty.current.add(part);
    setContent((c) => ({ ...c, [part]: update(c[part]) }));
  }, []);

  useEffect(() => {
    if (dirty.current.size === 0) return;
    try {
      dirty.current.forEach((part) => localStorage.setItem(STORAGE_KEYS[part], JSON.stringify(content[part])));
      dirty.current.clear();
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [content]);

  // Changes made in another tab (e.g. the CMS) show up here without reloading
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === null || PARTS.some((part) => STORAGE_KEYS[part] === e.key)) setContent(load());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setSettings = useCallback((patch: Partial<SiteSettings>) => change('settings', (s) => ({ ...s, ...patch })), [change]);
  const setProjects = useCallback(
    (update: (projects: PortfolioProject[]) => PortfolioProject[]) => change('projects', update),
    [change]
  );
  const updateProject = useCallback(
    (id: string, update: (project: PortfolioProject) => PortfolioProject) =>
      change('projects', (projects) => projects.map((p) => (p.id === id ? update(p) : p))),
    [change]
  );
  const setInquiries = useCallback((update: (inquiries: Inquiry[]) => Inquiry[]) => change('inquiries', update), [change]);
  const addInquiry = useCallback(
    (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) =>
      change('inquiries', (list) => [
        { ...inquiry, id: `mensaje-${Date.now()}`, createdAt: new Date().toISOString(), status: 'nuevo' },
        ...list,
      ]),
    [change]
  );
  const resetContent = useCallback(() => {
    try {
      PARTS.forEach((part) => localStorage.removeItem(STORAGE_KEYS[part]));
    } catch {
      // Nothing stored to remove
    }
    dirty.current.clear();
    setContent(seedContent);
    setSaved(true);
  }, []);

  const value = useMemo<SiteStore>(
    () => ({ ...content, saved, setSettings, setProjects, updateProject, addInquiry, setInquiries, resetContent }),
    [content, saved, setSettings, setProjects, updateProject, addInquiry, setInquiries, resetContent]
  );

  return <SiteStoreContext.Provider value={value}>{children}</SiteStoreContext.Provider>;
};

export const useSite = () => {
  const store = useContext(SiteStoreContext);
  if (!store) throw new Error('useSite must be used inside <SiteProvider>');
  return store;
};

// Projects visible on the public site, in CMS order
export const usePublishedProjects = () => useSite().projects.filter((p) => p.published);
