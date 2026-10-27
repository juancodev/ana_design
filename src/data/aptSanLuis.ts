import { ProjectSpace } from '../types';
import { makeRender } from './renders';

const render = makeRender('/assets/images/apt-san-luis');

export const aptSanLuisSpaces: ProjectSpace[] = [
  {
    id: 'sala',
    name: 'Sala & Comedor',
    description:
      'Área social continua: sofá modular, comedor redondo bajo lámpara de anillos y revestimiento de madera con iluminación indirecta.',
    renders: [
      { ...render('sala-comedor'), alt: 'Sala y comedor del Apt. San Luis con lámpara de anillos', orientation: 'landscape' },
      { ...render('sala-altar'), alt: 'Sala del Apt. San Luis con mueble flotante y altar', orientation: 'landscape' },
    ],
  },
  {
    id: 'cocina',
    name: 'Cocina',
    description:
      'Cocina en L con encimera de piedra, frentes de madera oscura y luz natural tamizada por la persiana.',
    renders: [
      { ...render('cocina-ventana'), alt: 'Cocina del Apt. San Luis junto a la ventana', orientation: 'portrait' },
    ],
  },
  {
    id: 'dormitorio-principal',
    name: 'Dormitorio Principal',
    description:
      'Atmósfera cálida en tonos vino: cabecero ondulado, papel mural texturizado y luz de lectura puntual.',
    renders: [
      { ...render('dormitorio-principal-cama'), alt: 'Cama del dormitorio principal con cabecero ondulado', orientation: 'landscape' },
      { ...render('dormitorio-principal-comoda'), alt: 'Cómoda y butaca del dormitorio principal', orientation: 'landscape' },
    ],
  },
  {
    id: 'dormitorio-secundario',
    name: 'Dormitorio Secundario',
    description:
      'Habitación de dos camas con escritorio integrado y papel mural botánico en verde.',
    renders: [
      { ...render('dormitorio-secundario'), alt: 'Dormitorio secundario con dos camas y escritorio', orientation: 'landscape' },
    ],
  },
  {
    id: 'bano',
    name: 'Baño & Lavandería',
    description:
      'Revestimiento verde texturizado, grifería en cobre y zona de lavandería integrada en columna.',
    renders: [
      { ...render('bano-lavamanos'), alt: 'Baño con lavamanos de pie y toallero de cobre', orientation: 'landscape' },
      { ...render('bano-ducha'), alt: 'Ducha y lavadora-secadora en columna', orientation: 'landscape' },
      { ...render('bano-lavanderia'), alt: 'Zona de lavandería junto al lavamanos', orientation: 'landscape' },
    ],
  },
];
