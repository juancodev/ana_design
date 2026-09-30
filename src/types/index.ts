export type ProjectCategory = 'Residencial' | 'Hospitality' | 'Retail' | 'Colección';

export interface MaterialSwatch {
  name: string;
  type: string;
  origin: string;
  toneHex: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: number;
  location: string;
  areaM2: number;
  leadArchitect: string;
  status: 'Completado' | 'En Construcción' | 'Concepto';
  coverImage: string;
  secondaryImages: string[];
  description: string;
  concept: string;
  materials: MaterialSwatch[];
  featured: boolean;
  order: number;
}

export interface BespokeObject {
  id: string;
  name: string;
  category: string;
  dimensions: string;
  materials: string;
  edition: string;
  year: number;
  image: string;
  description: string;
  availability: 'Disponible bajo pedido' | 'Edición limitada' | 'Pieza única';
}

export interface StudioConfig {
  studioName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  philosophyStatement: string;
  location: string;
  email: string;
  phone: string;
  instagram: string;
  themeAtmosphere: 'limestone' | 'noir' | 'travertine' | 'olive';
  activeDesign?: 'choros' | 'hybrid';
  heroMonogram?: string;
  heroBackgroundImage?: string;
  customBackgroundUrl?: string;
}

export interface ClientInquiry {
  fullName: string;
  email: string;
  phone: string;
  typology: ProjectCategory;
  approxAreaM2: string;
  location: string;
  targetDate: string;
  estimatedBudget: string;
  projectVision: string;
}
