import { LightTime } from '../types';

export interface LightTimeOption {
  id: LightTime;
  label: string;
  description: string;
}

// Buttons shown in the "Estudio de Luz" bar, in display order
export const LIGHT_TIME_OPTIONS: LightTimeOption[] = [
  { id: 'dawn', label: 'Mañana', description: 'Luz natural suave y cálida que entra en diagonal.' },
  { id: 'zenith', label: 'Tarde', description: 'Luz clara y uniforme que revela materiales y colores.' },
  { id: 'dusk', label: 'Noche', description: 'Iluminación artificial cálida y sombras profundas.' },
];

export interface LightGrade {
  // CSS filter applied to the render itself
  filter: string;
  // Warm sunlight wash (soft-light blend), 0–1
  warmth: number;
  // Cool night tint (multiply blend), 0–1
  night: number;
  // Darkened edges, 0–1
  vignette: number;
  // Warm interior glow that suggests lamps on at night (soft-light blend), 0–1
  lampGlow: number;
}

// Color grading used when a render has no real per-time variant (Option A).
export const LIGHT_GRADES: Record<LightTime, LightGrade> = {
  dawn: {
    filter: 'brightness(1.02) contrast(0.94) saturate(1.1) sepia(0.2) hue-rotate(-8deg)',
    warmth: 0.9,
    night: 0,
    vignette: 0.15,
    lampGlow: 0,
  },
  zenith: {
    filter: 'brightness(1.05) contrast(1.04) saturate(1.02) sepia(0) hue-rotate(0deg)',
    warmth: 0,
    night: 0,
    vignette: 0,
    lampGlow: 0,
  },
  dusk: {
    filter: 'brightness(0.8) contrast(1.18) saturate(0.95) sepia(0.08) hue-rotate(0deg)',
    warmth: 0,
    night: 0.6,
    vignette: 0.6,
    lampGlow: 0.55,
  },
};

// Shared timing so every layer moves together
export const LIGHT_TRANSITION = '1000ms cubic-bezier(0.4, 0, 0.2, 1)';
