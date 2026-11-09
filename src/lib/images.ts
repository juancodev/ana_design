import { SpaceRender } from '../types';

// Uploaded images are resized and stored as data URLs so they fit in browser storage.
// The backend phase will replace this with real uploads.

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`No se pudo leer la imagen ${file.name}`));
    };
    img.src = url;
  });

const resize = (img: HTMLImageElement, maxSide: number, quality: number) => {
  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/webp', quality);
};

export const fileToImage = async (file: File) => {
  const img = await loadImage(file);
  return {
    src: resize(img, 1600, 0.75),
    thumb: resize(img, 480, 0.7),
    orientation: (img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape') as SpaceRender['orientation'],
  };
};

export const fileToRender = async (file: File): Promise<SpaceRender> => {
  const { src, thumb, orientation } = await fileToImage(file);
  return { src, thumb, orientation, alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ') };
};

export const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
