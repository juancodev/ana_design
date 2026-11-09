export type LightTime = 'dawn' | 'zenith' | 'dusk';

export interface RenderImage {
  src: string;
  thumb: string;
}

export interface SpaceRender extends RenderImage {
  alt: string;
  orientation: 'landscape' | 'portrait';
  // Real renders per time of day (Option B). When absent, the render is color-graded instead.
  lightVariants?: Partial<Record<LightTime, RenderImage>>;
}

export interface ProjectSpace {
  id: string;
  name: string;
  // Optional zone used to group the tabs (e.g. "Restaurante", "Hotel")
  group?: string;
  description: string;
  renders: SpaceRender[];
}

export interface PortfolioProject {
  id: string;
  slug: string;
  // Title in two parts: "Residencia" (sans) + "San Luis" (script)
  kind: string;
  name: string;
  location: string;
  description: string;
  published: boolean;
  spaces: ProjectSpace[];
}

export interface SiteSettings {
  studioName: string;
  heroImage: string;
  taglineEyebrow: string;
  // Words wrapped in *asterisks* are shown in bold italics
  tagline: string;
  contactEyebrow: string;
  contactTitle: string;
  contactNote: string;
  typologies: string[];
  areas: string[];
  email: string;
  location: string;
  instagram: string;
  copyrightName: string;
}

export type InquiryStatus = 'nuevo' | 'leido' | 'atendido';

export interface Inquiry {
  id: string;
  createdAt: string;
  status: InquiryStatus;
  typology: string;
  name: string;
  email: string;
  location: string;
  area: string;
  message: string;
}

export interface SiteContent {
  settings: SiteSettings;
  projects: PortfolioProject[];
  inquiries: Inquiry[];
}
