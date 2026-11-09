import { PortfolioProject } from '../types';
import { aptSanLuisSpaces } from './aptSanLuis';
import { restauranteHotelSpaces } from './restauranteHotel';
import { makeRender } from './renders';

// TODO: the designer's proposal uses the same placeholder text for every project; replace with the real ones
const PLACEHOLDER_DESCRIPTION =
  'El proyecto busca unificar el lenguaje estético de un apartamento de 50 m², creando una armonía visual entre sus espacios. La remodelación parte de sus materiales y colores.';

const jugueteria = makeRender('/assets/images/jugueteria-loop');
const grandAltamira = makeRender('/assets/images/hotel-grand-altamira');

export const portfolio: PortfolioProject[] = [
  {
    slug: 'residencia-san-luis',
    kind: 'Residencia',
    name: 'San Luis',
    location: 'Chacao, Caracas-Venezuela',
    description: PLACEHOLDER_DESCRIPTION,
    spaces: aptSanLuisSpaces,
  },
  {
    slug: 'restaurante-hotel-palazzo-ponti',
    kind: 'Restaurante & Hotel',
    name: 'Palazzo Ponti',
    location: 'Las Mercedes, Caracas-Venezuela',
    description: PLACEHOLDER_DESCRIPTION,
    spaces: restauranteHotelSpaces,
  },
  {
    slug: 'jugueteria-loop-paper-toys',
    kind: 'Juguetería',
    name: 'Loop Paper Toys',
    location: 'Los Palos Grandes, Caracas-Venezuela',
    description: PLACEHOLDER_DESCRIPTION,
    spaces: [
      {
        id: 'tienda',
        name: 'Tienda',
        description: 'Muro de juguetes de madera bajo luz azul y mostrador circular alrededor de un árbol escultórico.',
        renders: [
          // Provisional: cropped from the designer's proposal until the original render arrives
          { ...jugueteria('tienda'), alt: 'Interior de la juguetería Loop Paper Toys', orientation: 'landscape' },
        ],
      },
    ],
  },
  {
    slug: 'hotel-grand-altamira',
    kind: 'Hotel',
    name: 'Grand Altamira',
    location: 'Altamira, Caracas-Venezuela',
    description: PLACEHOLDER_DESCRIPTION,
    spaces: [
      {
        id: 'fachada',
        name: 'Fachada',
        description: 'Volumen circular con cápsulas de madera y jardín central bajo luz de atardecer.',
        renders: [
          // Provisional: cropped from the designer's proposal until the original render arrives
          { ...grandAltamira('fachada'), alt: 'Fachada del Hotel Grand Altamira', orientation: 'landscape' },
        ],
      },
    ],
  },
];

export const findProject = (slug: string) => portfolio.find((p) => p.slug === slug);
