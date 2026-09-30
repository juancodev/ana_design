import { Project, BespokeObject, StudioConfig } from '../types';

export const initialStudioConfig: StudioConfig = {
  studioName: 'De Andrade',
  tagline: 'INTERIOR DESIGN',
  heroHeadline: 'Espacios habitables nacidos de la luz, la textura y el silencio.',
  heroSubheadline: 'Un diálogo armónico entre la pureza volumétrica de Mas Creations, la calma táctil de Studio Choros y la sobriedad arquitectónica de Alexander &CO.',
  philosophyStatement: 'Concebimos cada espacio como un santuario atemporal. Esculpimos volúmenes en yeso a la cal, seleccionamos bloques de travertino crudo y diseñamos piezas de mobiliario a medida para crear atmósferas que envejecen con dignidad y serenidad.',
  location: 'Madrid · Atenas · Barcelona',
  email: 'atelier@chorosandmas.studio',
  phone: '+34 912 840 920',
  instagram: '@choros.and.mas',
  themeAtmosphere: 'limestone',
  activeDesign: 'choros',
  heroMonogram: 'A&CO.',
  heroBackgroundImage: '/src/assets/images/olive_mineral_texture_1790628051119.jpg',
};

export const initialProjects: Project[] = [
  {
    id: 'rose-house',
    title: 'Rose House',
    subtitle: 'Residencia costera en hormigón arquitectónico, vidrio continuo y piscina infinita',
    category: 'Residencial',
    year: 2025,
    location: 'Mallorca, España',
    areaM2: 620,
    leadArchitect: 'Alexander & Associates',
    status: 'Completado',
    coverImage: '/src/assets/images/alexander_rose_villa_1790622119278.jpg',
    secondaryImages: [
      '/src/assets/images/hero_mediterranean_living_1790608992684.jpg',
      '/src/assets/images/choros_sanctuary_bedroom_1790621816533.jpg',
      '/src/assets/images/choros_sculpted_niche_1790621805963.jpg'
    ],
    description: 'Inspirada en el lenguaje arquitectónico de Alexander & CO., Rose House fusiona terrazas voladas en hormigón lavado, cerramientos continuos de vidrio y solados de piedra caliza que se extienden hasta la lámina de agua de la piscina.',
    concept: 'Volumetría horizontal y conexión biofílica. La residencia abre su núcleo social hacia el jardín de palmeras y la luz atardecida mediante vigas de madera vista y carpinterías invisibles integradas en el pavimento.',
    materials: [
      {
        name: 'Hormigón Visto Encofrado en Madera',
        type: 'Estructura & Fachada',
        origin: 'Cantera Local, Mallorca',
        toneHex: '#C8C4BC',
        description: 'Textura de tablilla fina de pino que humaniza el hormigón bajo la rasante solar.'
      },
      {
        name: 'Piedra Caliza Santanyí',
        type: 'Pavimento & Muros',
        origin: 'Santanyí, Baleares',
        toneHex: '#DDD5C4',
        description: 'Piedra dorada y porosa que no quema al tacto descalzo junto a la piscina.'
      },
      {
        name: 'Madera de Teca Recuperada',
        type: 'Pérgolas & Cubiertas',
        origin: 'Comercio Sostenible',
        toneHex: '#8C6747',
        description: 'Acabado natural resistente al salitre y a la intemperie marina.'
      }
    ],
    featured: true,
    order: 1,
  },
  {
    id: 'casa-solea',
    title: 'Casa Solea',
    subtitle: 'Residencia mediterránea esculpida en travertino y yeso natural',
    category: 'Residencial',
    year: 2025,
    location: 'Costa Brava, España',
    areaM2: 480,
    leadArchitect: 'Elena Vilar & Marcus Thorne',
    status: 'Completado',
    coverImage: '/src/assets/images/hero_mediterranean_living_1790608992684.jpg',
    secondaryImages: [
      '/src/assets/images/choros_sculpted_niche_1790621805963.jpg',
      '/src/assets/images/choros_sanctuary_bedroom_1790621816533.jpg',
      '/src/assets/images/bespoke_travertine_table_1790609047846.jpg'
    ],
    description: 'Una vivienda unifamiliar concebida como un refugio de contemplación. La luz natural inunda la doble altura a través de arcos esculturales, acariciando las superficies continuas de yeso a la cal y el suelo de piedra de travertino romano cepillado.',
    concept: 'Geometría serena y sombras suaves. Eliminamos cualquier artificio decorativo para que el volumen arquitectónico y la riqueza táctil de los materiales naturales hablen por sí mismos.',
    materials: [
      {
        name: 'Travertino Navona',
        type: 'Piedra Natural',
        origin: 'Tivoli, Italia',
        toneHex: '#D8CBB7',
        description: 'Bloques de poro abierto y acabado al agua con tacto sedoso y aterciopelado.'
      },
      {
        name: 'Yeso a la Cal Tradicional',
        type: 'Revestimiento Continuo',
        origin: 'Valencia, España',
        toneHex: '#EAE5DB',
        description: 'Aplicación manual con llana de madera que genera micro-texturas orgánicas bajo la luz solar.'
      },
      {
        name: 'Lino Lavado Crudo',
        type: 'Textil Orgánico',
        origin: 'Normandía, Francia',
        toneHex: '#C5BCAC',
        description: 'Cortinajes de caída densa que tamizan la brisa y amortiguan la acústica interior.'
      }
    ],
    featured: true,
    order: 1,
  },
  {
    id: 'penthouse-aletheia',
    title: 'Ático Aletheia',
    subtitle: 'Minimalismo templado con ebanistería en roble ahumado y mármol estriado',
    category: 'Residencial',
    year: 2024,
    location: 'Salamanca, Madrid',
    areaM2: 320,
    leadArchitect: 'Marcus Thorne',
    status: 'Completado',
    coverImage: '/src/assets/images/project_penthouse_wabisabi_1790609008496.jpg',
    secondaryImages: [
      '/src/assets/images/hero_mediterranean_living_1790608992684.jpg',
      '/src/assets/images/bespoke_travertine_table_1790609047846.jpg'
    ],
    description: 'Reconfiguración integral de un ático clásico para abrir una perspectiva panorámica de 360 grados. La isla monolítica de mármol acanalado estructura el eje social, secundada por paneles escamoteables de roble oscuro.',
    concept: 'Inspirado en la simplicidad compositiva de Alexander &CO: transiciones fluidas, armarios ocultos que absorben la tecnología y un equilibrio tonal sobrio y acogedor.',
    materials: [
      {
        name: 'Roble Ahumado Francés',
        type: 'Madera Maciza & Boiserie',
        origin: 'Valle del Loira, Francia',
        toneHex: '#42372E',
        description: 'Tableros cepillados a contraveta con acabado mate al aceite natural vegetal.'
      },
      {
        name: 'Mármol Fior di Bosco',
        type: 'Mármol Gris Cantera',
        origin: 'Toscana, Italia',
        toneHex: '#7C7672',
        description: 'Veteado blanco y ambarino con fresado estriado milimétrico hecho a mano.'
      },
      {
        name: 'Latón Bruñido',
        type: 'Herrajes & Detalles',
        origin: 'Birmingham, Reino Unido',
        toneHex: '#A89366',
        description: 'Tratamiento químico suave que adquiere una pátina noble con el uso continuado.'
      }
    ],
    featured: true,
    order: 2,
  },
  {
    id: 'bistrot-terracotta',
    title: 'Osteria Cúpula',
    subtitle: 'Hospitality sensorial bajo bóvedas de terracota y luminarias en latón fundido',
    category: 'Hospitality',
    year: 2025,
    location: 'Atenas, Grecia',
    areaM2: 540,
    leadArchitect: 'Elena Vilar',
    status: 'Completado',
    coverImage: '/src/assets/images/project_hospitality_arches_1790609020862.jpg',
    secondaryImages: [
      '/src/assets/images/project_retail_gallery_1790609033073.jpg',
      '/src/assets/images/hero_mediterranean_living_1790608992684.jpg'
    ],
    description: 'Un espacio gastronómico donde la arquitectura envuelve al comensal mediante bóvedas curvas de arcilla refractaria y una barra continua tallada en caliza viva. La acústica ha sido modelada meticulosamente con paneles de lana bajo la bóveda.',
    concept: 'Estructura rítmica y volumetría inspirada en Mas Creations: arcos secuenciales que conducen la mirada y crean nichos de intimidad en un local de alta capacidad.',
    materials: [
      {
        name: 'Terracota Cocida Artesanal',
        type: 'Cerámica Estructural',
        origin: 'Creta, Grecia',
        toneHex: '#A25942',
        description: 'Ladrillos cocidos en horno de leña con gradientes de tono tierra cálido.'
      },
      {
        name: 'Caliza de Rodas',
        type: 'Piedra de Cantera',
        origin: 'Rodas, Grecia',
        toneHex: '#C9BC9F',
        description: 'Encimera de barra de 8 cm de grosor tallada en una única pieza maciza.'
      },
      {
        name: 'Cuero Conac Envejecido',
        type: 'Tapicería Banquettes',
        origin: 'Florencia, Italia',
        toneHex: '#814D32',
        description: 'Piel curtida al vegetal con costuras de guarnicionero vistas.'
      }
    ],
    featured: true,
    order: 3,
  },
  {
    id: 'galeria-monolito',
    title: 'Galería & Concept Store Monolito',
    subtitle: 'Espacio de retail experiencial y diseño coleccionable con pedestales de travertino',
    category: 'Retail',
    year: 2024,
    location: 'Eixample, Barcelona',
    areaM2: 290,
    leadArchitect: 'Elena Vilar & Marcus Thorne',
    status: 'Completado',
    coverImage: '/src/assets/images/project_retail_gallery_1790609033073.jpg',
    secondaryImages: [
      '/src/assets/images/bespoke_travertine_table_1790609047846.jpg',
      '/src/assets/images/hero_mediterranean_living_1790608992684.jpg'
    ],
    description: 'Transformación de una antigua fundición en una galería de arte funcional y tienda conceptual. Los pedestales de travertino en bruto contrastan con el hormigón pulido y una iluminación museográfica regulable.',
    concept: 'Fusión de la sencillez expositiva con geometrías arquitectónicas rotundas. Cada pieza expuesta cuenta con su propio cono de sombra y luz teatral.',
    materials: [
      {
        name: 'Hormigón Continuo Encerado',
        type: 'Pavimento Técnico',
        origin: 'Barcelona, España',
        toneHex: '#8C8983',
        description: 'Superficie sin juntas con sellado hidrófugo de tacto sedoso mate.'
      },
      {
        name: 'Níquel Satinado',
        type: 'Perfiles de Iluminación',
        origin: 'Milán, Italia',
        toneHex: '#B2B0A9',
        description: 'Estructuras de suspensión minimalistas con cableado oculto de precisión.'
      }
    ],
    featured: false,
    order: 4,
  }
];

export const initialBespokeObjects: BespokeObject[] = [
  {
    id: 'mesa-monolito-01',
    name: 'Mesa de Centro Monolito No. 04',
    category: 'Mobiliario de Autor',
    dimensions: '140 × 90 × 36 cm',
    materials: 'Travertino Romano macizo tallado en bloque',
    edition: 'Edición limitada de 12 ejemplares numerados',
    year: 2025,
    image: '/src/assets/images/bespoke_travertine_table_1790609047846.jpg',
    description: 'Una pieza escultórica concebida como el centro de gravedad del salón. Cada mesa se esculpe en una sola pieza de cantera, conservando las cavidades e impurezas geológicas originales.',
    availability: 'Edición limitada',
  },
  {
    id: 'sillon-curvo-choros',
    name: 'Daybed Curvo Solea',
    category: 'Asientos Esculturales',
    dimensions: '220 × 85 × 68 cm',
    materials: 'Estructura en madera de castaño, espuma de alta resiliencia y bouclé de lana virgen',
    edition: 'Hecho a mano bajo encargo en taller artesanal',
    year: 2024,
    image: '/src/assets/images/hero_mediterranean_living_1790608992684.jpg',
    description: 'Silueta orgánica inspirada en las dunas costeras mediterráneas. Su radio de curvatura permite sentarse en múltiples posiciones de relajación.',
    availability: 'Disponible bajo pedido',
  }
];
