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
  // Provisional texts: written to be replaced from the CMS with Ana's own words
  about: {
    firstName: 'Ana',
    lastName: 'de Andrade',
    role: 'Diseñadora de interiores',
    scriptWord: 'con corazón',
    introLead: '¡Hola! Soy Ana de Andrade. Diseño espacios que se sienten como un abrazo: cálidos, honestos y hechos a la medida de quien los vive.',
    introBody: 'Cada proyecto empieza escuchando. Me interesa entender cómo vives, qué te emociona y qué necesitas, para convertirlo en materiales, luz y color.',
    sideText: 'Trabajo en proyectos residenciales, de hospitalidad y comerciales, cuidando cada detalle desde el primer boceto hasta la obra terminada. Creo en el diseño con propósito y en los espacios que mejoran la vida diaria.',
    buttonLabel: 'Conóceme',
    photo: '',
    story: [
      'Mi camino en el diseño de interiores nació de la curiosidad por cómo los espacios cambian la manera en que nos sentimos.',
      'Hoy acompaño a cada cliente en todo el proceso: desde la primera conversación hasta la entrega, con renders que permiten ver el resultado antes de construirlo.',
      'Mi estilo combina materiales naturales, colores cálidos y una atención especial a la luz, porque creo que un buen espacio se nota en cómo te hace sentir.',
    ].join('\n\n'),
    pagePhotos: [],
    milestones: [
      { period: 'Formación', title: 'Estudios en diseño de interiores', description: 'Bases de espacio, materiales, iluminación y representación técnica.' },
      { period: 'Primeros proyectos', title: 'Residencias y apartamentos', description: 'Remodelaciones integrales centradas en la vida diaria de cada familia.' },
      { period: 'Crecimiento', title: 'Hospitalidad y comercio', description: 'Restaurantes, hoteles y tiendas con identidad propia.' },
      { period: 'Hoy', title: 'Estudio De Andrade', description: 'Proyectos a medida en Caracas, del concepto a la obra.' },
    ],
    process: [
      { title: 'Escuchar', description: 'Conversamos sobre tus necesidades, tu estilo y tu presupuesto.' },
      { title: 'Conceptualizar', description: 'Defino la propuesta de distribución, materiales y paleta de color.' },
      { title: 'Visualizar', description: 'Desarrollo planos y renders realistas para ver el resultado antes de construir.' },
      { title: 'Acompañar', description: 'Sigo la ejecución de la obra para que cada detalle quede como se diseñó.' },
    ],
    tools: [
      { name: 'AutoCAD', category: 'Planos técnicos' },
      { name: 'SketchUp', category: 'Modelado 3D' },
      { name: 'Revit', category: 'Modelado 3D' },
      { name: 'Lumion', category: 'Render' },
      { name: 'D5 Render', category: 'Render' },
      { name: 'Photoshop', category: 'Presentación' },
      { name: 'Canva', category: 'Presentación' },
    ],
    ctaTitle: '¿Diseñamos tu próximo espacio?',
    ctaText: 'Cuéntame sobre tu proyecto y te responderé en un plazo de 24 a 48 horas.',
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
