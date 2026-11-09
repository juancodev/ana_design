import { PortfolioProject, ProjectSpace } from '../types';
import { slugify } from '../lib/images';

// Pure helpers for editing projects; each returns a new value for the store

export const uniqueSlug = (base: string, projects: PortfolioProject[], ownId?: string) => {
  const root = slugify(base) || 'proyecto';
  let slug = root;
  for (let n = 2; projects.some((p) => p.slug === slug && p.id !== ownId); n++) slug = `${root}-${n}`;
  return slug;
};

export const createSpace = (): ProjectSpace => ({
  id: `ambiente-${Date.now()}`,
  name: 'Nuevo ambiente',
  description: '',
  renders: [],
});

export const createProject = (projects: PortfolioProject[]): PortfolioProject => {
  const id = `proyecto-${Date.now()}`;
  return {
    id,
    slug: uniqueSlug('nuevo proyecto', projects),
    kind: 'Nuevo',
    name: 'Proyecto',
    location: 'Caracas-Venezuela',
    description: '',
    published: false,
    spaces: [createSpace()],
  };
};

// Moves the item at `index` one place up (-1) or down (+1)
export const move = <T,>(list: T[], index: number, direction: -1 | 1): T[] => {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const copy = [...list];
  [copy[index], copy[target]] = [copy[target], copy[index]];
  return copy;
};

export const updateSpace = (project: PortfolioProject, spaceId: string, update: (space: ProjectSpace) => ProjectSpace): PortfolioProject => ({
  ...project,
  spaces: project.spaces.map((s) => (s.id === spaceId ? update(s) : s)),
});
