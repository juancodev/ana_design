import { SiteContent } from '../types';
import { seedProjects } from './portfolio';

// Content the site starts with, and what "Restaurar contenido original" in the CMS goes back to
export const seedContent: SiteContent = {
  settings: {
    studioName: 'De Andrade',
    heroImage: '/assets/images/olive_mineral_texture_1790628051119.jpg',
    taglineEyebrow: 'Ana de Andrade · Interior Design',
    tagline: 'Diseñar espacios que *abracen* la vida y un *corazón* en cada detalle',
    contactEyebrow: 'Diálogo confidencial',
    contactTitle: 'Comisionar proyecto',
    contactNote: 'Estricta confidencialidad bajo acuerdo de discreción profesional.',
    typologies: ['Residencial', 'Hotelero', 'Comercial', 'Otro'],
    areas: ['Menor a 150 m²', '150 m² — 350 m²', '350 m² — 700 m²', 'Más de 700 m²'],
    email: 'deandradesign2@gmail.com',
    location: 'Caracas-Venezuela',
    instagram: '@deandradesign_',
    copyrightName: 'Ana De Andrade',
  },
  projects: seedProjects,
  // Sample messages so the inbox can be reviewed before real inquiries arrive
  inquiries: [
    {
      id: 'ejemplo-1',
      createdAt: '2026-11-05T14:20:00.000Z',
      status: 'nuevo',
      typology: 'Residencial',
      name: 'Mensaje de ejemplo · Laura Pérez',
      email: 'laura.ejemplo@correo.com',
      location: 'La Castellana, Caracas',
      area: '150 m² — 350 m²',
      message: 'Quisiera remodelar la sala y el comedor de mi apartamento con una paleta cálida y mucha luz natural.',
    },
    {
      id: 'ejemplo-2',
      createdAt: '2026-11-02T10:05:00.000Z',
      status: 'atendido',
      typology: 'Comercial',
      name: 'Mensaje de ejemplo · Café Ávila',
      email: 'cafe.ejemplo@correo.com',
      location: 'Altamira, Caracas',
      area: 'Menor a 150 m²',
      message: 'Buscamos un diseño para nuestra nueva cafetería: barra, zona de mesas y fachada.',
    },
  ],
};
