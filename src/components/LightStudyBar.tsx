import React from 'react';
import { Compass, Moon, Sun, Sunrise } from 'lucide-react';
import { LightTime } from '../types';
import { LIGHT_TIME_OPTIONS } from '../data/lightStudy';

interface LightStudyBarProps {
  lightTime: LightTime;
  onChange: (lightTime: LightTime) => void;
}

const ICONS: Record<LightTime, React.ReactNode> = {
  dawn: <Sunrise className="w-3.5 h-3.5 text-[#B87A3E]" />,
  zenith: <Sun className="w-3.5 h-3.5 text-[#D19B3E]" />,
  dusk: <Moon className="w-3.5 h-3.5 text-[#885A3D]" />,
};

export const LightStudyBar: React.FC<LightStudyBarProps> = ({ lightTime, onChange }) => {
  const active = LIGHT_TIME_OPTIONS.find((o) => o.id === lightTime);

  return (
    <div className="mb-8 p-3.5 bg-[#F3EFE7] border border-[#E4DFD5] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#544D42]">
        <Compass className="w-4 h-4 text-[#8A7149]" />
        <span className="font-medium">Estudio de Luz:</span>
        <span className="text-[#7C7569] font-normal normal-case tracking-normal hidden lg:inline">
          {active?.description}
        </span>
      </div>

      <div className="flex items-center bg-[#EAE5DA] p-1 rounded-lg border border-[#DCD6C9]">
        {LIGHT_TIME_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            aria-pressed={option.id === lightTime}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              option.id === lightTime
                ? 'bg-white text-[#2B2721] shadow-sm'
                : 'text-[#6C655A] hover:text-[#2B2721]'
            }`}
          >
            {ICONS[option.id]}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
