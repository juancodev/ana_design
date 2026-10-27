import { RenderImage } from '../types';

// Each render is exported at two widths: 1920px (full view) and 800px (thumbnails).
export const makeRender = (dir: string) => (name: string): RenderImage => ({
  src: `${dir}/${name}-1920.webp`,
  thumb: `${dir}/${name}-800.webp`,
});
