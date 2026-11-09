import React from 'react';
import { Compass, Moon, Sun, Sunrise } from 'lucide-react';
import { LightTime } from '../types';
import { LIGHT_TIME_OPTIONS } from '../data/lightStudy';

interface LightStudyBarProps {
  lightTime: LightTime;
  onChange: (lightTime: LightTime) => void;
  className?: string;
}

const ICONS: Record<LightTime, React.ReactNode> = {
  dawn: <Sunrise className="w-3.5 h-3.5" />,
  zenith: <Sun className="w-3.5 h-3.5" />,
  dusk: <Moon className="w-3.5 h-3.5" />,
};

export const LightStudyBar: React.FC<LightStudyBarProps> = ({ lightTime, onChange, className = '' }) => (
  <div className={`px-3.5 py-5 bg-olive-light rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-olive ${className}`}>
    <div className="flex items-center gap-3 text-xs tracking-wider uppercase">
      <Compass className="w-4 h-4" />
      <span className="font-medium">Estudio de Luz:</span>
    </div>

    <div className="flex items-center gap-2">
      {LIGHT_TIME_OPTIONS.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          aria-pressed={option.id === lightTime}
          title={option.description}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-all cursor-pointer ${
            option.id === lightTime
              ? 'bg-cream shadow-sm'
              : 'hover:bg-cream/40'
          }`}
        >
          {ICONS[option.id]}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  </div>
);
