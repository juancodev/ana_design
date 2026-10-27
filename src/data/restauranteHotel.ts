import { ProjectSpace } from '../types';
import { makeRender } from './renders';

const render = makeRender('/assets/images/restaurante-hotel');

export const restauranteHotelSpaces: ProjectSpace[] = [
  // ── Restaurante ──
  {
    id: 'salon-ventanal',
    group: 'Restaurante',
    name: 'Salón Ventanal',
    description:
      'Salón abierto a la ciudad: mesas de madera, jardinera central y techo a rayas. Renders reales de mañana, tarde y noche.',
    renders: [
      {
        ...render('restaurante-salon-tarde'),
        alt: 'Salón del restaurante junto al ventanal',
        orientation: 'landscape',
        lightVariants: {
          dawn: render('restaurante-salon-manana'),
          zenith: render('restaurante-salon-tarde'),
          dusk: render('restaurante-salon-noche'),
        },
      },
    ],
  },
  {
    id: 'entrada-barra',
    group: 'Restaurante',
    name: 'Entrada & Barra',
    description:
      'Recibidor con barra curva revestida en madera, cava de vinos y estantería iluminada.',
    renders: [
      { ...render('restaurante-entrada'), alt: 'Entrada del restaurante con barra curva y cava de vinos', orientation: 'landscape' },
    ],
  },
  {
    id: 'mesas',
    group: 'Restaurante',
    name: 'Zona de Mesas',
    description:
      'Mesas de madera bajo techo a rayas, con paneles de madera y luz cálida colgante.',
    renders: [
      { ...render('restaurante-mesas-01'), alt: 'Zona de mesas del restaurante', orientation: 'landscape' },
      { ...render('restaurante-mesas-02'), alt: 'Zona de mesas con muro de azulejo geométrico', orientation: 'landscape' },
    ],
  },
  {
    id: 'comedores',
    group: 'Restaurante',
    name: 'Comedores',
    description:
      'Gran comedor presidido por un muro de azulejo geométrico en azul con iluminación rasante.',
    renders: [
      { ...render('restaurante-comedor-01'), alt: 'Comedor con muro de azulejo geométrico', orientation: 'landscape' },
      { ...render('restaurante-comedor-02'), alt: 'Vista lateral del comedor principal', orientation: 'landscape' },
    ],
  },
  {
    id: 'bar',
    group: 'Restaurante',
    name: 'Bar',
    description:
      'Barra de piedra retroiluminada, estantería de licores y lámparas de disco sobre suelo geométrico.',
    renders: [
      { ...render('restaurante-bar-01'), alt: 'Barra del bar con lámparas de disco', orientation: 'landscape' },
      { ...render('restaurante-bar-02'), alt: 'Detalle de la barra y estantería de licores', orientation: 'portrait' },
    ],
  },

  // ── Hotel ──
  {
    id: 'lobby',
    group: 'Hotel',
    name: 'Lobby & Recepción',
    description:
      'Muro tejido en azul y dorado con la marca Palazzo Ponti, butacas verdes y espejos de autor.',
    renders: [
      { ...render('hotel-lobby'), alt: 'Lobby del hotel Palazzo Ponti', orientation: 'landscape' },
      { ...render('hotel-entrada'), alt: 'Entrada del hotel con espejos y butacas', orientation: 'landscape' },
    ],
  },
  {
    id: 'sala-espera',
    group: 'Hotel',
    name: 'Sala de Espera',
    description:
      'Sala luminosa junto al ventanal con sofás claros y butacas en azul profundo.',
    renders: [
      { ...render('hotel-sala-espera'), alt: 'Sala de espera del hotel', orientation: 'landscape' },
    ],
  },
  {
    id: 'cafe-bar',
    group: 'Hotel',
    name: 'Café Bar',
    description:
      'Barra de café en azul petróleo con estantería abierta y mesas altas.',
    renders: [
      { ...render('hotel-cafe-bar'), alt: 'Café bar del hotel', orientation: 'landscape' },
    ],
  },
  {
    id: 'habitaciones',
    group: 'Hotel',
    name: 'Habitaciones',
    description:
      'Suites con cabecero tapizado en azul, paneles de madera y banco a los pies en terciopelo verde.',
    renders: [
      { ...render('hotel-habitacion-01'), alt: 'Habitación del hotel con paneles de madera', orientation: 'landscape' },
      { ...render('hotel-habitacion-02'), alt: 'Habitación del hotel junto al ventanal', orientation: 'landscape' },
    ],
  },
  {
    id: 'spa',
    group: 'Hotel',
    name: 'Spa',
    description:
      'Cabina de tratamiento con celosía de madera, muro azul noche y luz tenue.',
    renders: [
      { ...render('hotel-spa'), alt: 'Cabina de spa del hotel', orientation: 'landscape' },
    ],
  },
];
