import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
  size?: number | string;
}

/**
 * LOGO-ANA WEB-03: The golden architectural quatrefoil flower emblem
 */
export const DeAndradeEmblem: React.FC<LogoProps> = ({
  className = '',
  color = '#D4C19C',
  size = 80,
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-500 ${className}`}
      aria-label="De Andrade Emblem"
    >
      {/* Outer Quatrefoil Contour */}
      <path
        d="M 60.5 60.5
           A 41 41 0 0 1 139.5 60.5
           A 41 41 0 0 1 139.5 139.5
           A 41 41 0 0 1 60.5 139.5
           A 41 41 0 0 1 60.5 60.5 Z"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cardinal Teardrops (North, South, East, West) */}
      {/* North */}
      <path
        d="M 100 86
           C 98.5 76 96 56 96 46
           C 96 38.5 98 33 100 33
           C 102 33 104 38.5 104 46
           C 104 56 101.5 76 100 86 Z"
        fill={color}
      />
      {/* South */}
      <path
        d="M 100 114
           C 98.5 124 96 144 96 154
           C 96 161.5 98 167 100 167
           C 102 167 104 161.5 104 154
           C 104 144 101.5 124 100 114 Z"
        fill={color}
      />
      {/* East */}
      <path
        d="M 114 100
           C 124 98.5 144 96 154 96
           C 161.5 96 167 98 167 100
           C 167 102 161.5 104 154 104
           C 144 104 124 101.5 114 100 Z"
        fill={color}
      />
      {/* West */}
      <path
        d="M 86 100
           C 76 98.5 56 96 46 96
           C 38.5 96 33 98 33 100
           C 33 102 38.5 104 46 104
           C 56 104 76 101.5 86 100 Z"
        fill={color}
      />

      {/* 4 Diagonal Almond Petals */}
      {/* North-East (45 deg) */}
      <ellipse
        cx="124"
        cy="76"
        rx="5"
        ry="10.5"
        transform="rotate(45 124 76)"
        fill={color}
      />
      {/* South-East (135 deg) */}
      <ellipse
        cx="124"
        cy="124"
        rx="5"
        ry="10.5"
        transform="rotate(135 124 124)"
        fill={color}
      />
      {/* South-West (225 deg) */}
      <ellipse
        cx="76"
        cy="124"
        rx="5"
        ry="10.5"
        transform="rotate(225 76 124)"
        fill={color}
      />
      {/* North-West (315 deg) */}
      <ellipse
        cx="76"
        cy="76"
        rx="5"
        ry="10.5"
        transform="rotate(315 76 76)"
        fill={color}
      />

      {/* Delicate 4-Point Radiant Center Sparkle */}
      <path
        d="M 100 93.5
           Q 100 100 106.5 100
           Q 100 100 100 106.5
           Q 100 100 93.5 100
           Q 100 100 100 93.5 Z"
        fill={color}
      />
      <circle cx="100" cy="100" r="1.5" fill={color} />
    </svg>
  );
};

/**
 * LOGO-ANA WEB-02: The signature wordmark "De Andrade" + "INTERIOR DESIGN"
 */
export const DeAndradeWordmark: React.FC<{
  color?: string;
  subtitleColor?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({
  color = '#D4C19C',
  subtitleColor = '#D4C19C',
  className = '',
  size = 'lg',
}) => {
  const getSizes = () => {
    switch (size) {
      case 'sm':
        return {
          title: 'text-2xl sm:text-3xl',
          sub: 'text-[9px] sm:text-[10px] tracking-[0.35em]',
          margin: 'mt-1',
        };
      case 'md':
        return {
          title: 'text-3xl sm:text-4xl md:text-5xl',
          sub: 'text-[10px] sm:text-xs tracking-[0.4em]',
          margin: 'mt-1.5',
        };
      case 'xl':
        return {
          title: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl',
          sub: 'text-xs sm:text-sm md:text-base tracking-[0.45em]',
          margin: 'mt-3 sm:mt-4',
        };
      case 'lg':
      default:
        return {
          title: 'text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]',
          sub: 'text-[11px] sm:text-xs md:text-sm tracking-[0.42em]',
          margin: 'mt-2.5 sm:mt-3',
        };
    }
  };

  const s = getSizes();

  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Calligraphy Brand Name: De Andrade */}
      <h1
        className={`${s.title} font-normal leading-[1.05] tracking-wide drop-shadow-[0_2px_15px_rgba(0,0,0,0.35)]`}
        style={{
          color,
          fontFamily: "'Alex Brush', 'Great Vibes', 'Pinyon Script', cursive",
        }}
      >
        De Andrade
      </h1>

      {/* Subtitle: INTERIOR DESIGN */}
      <div
        className={`${s.sub} ${s.margin} uppercase font-medium drop-shadow-sm font-sans`}
        style={{ color: subtitleColor }}
      >
        INTERIOR DESIGN
      </div>
    </div>
  );
};

/**
 * UNIFIED HERO COMPOSITION:
 * LOGO-ANA WEB-03 (Quatrefoil flower emblem) on top
 * LOGO-ANA WEB-02 (De Andrade / INTERIOR DESIGN) underneath
 */
export const DeAndradeHeroBrand: React.FC<{
  className?: string;
  color?: string;
  emblemSize?: number;
}> = ({
  className = '',
  color = '#D4C19C',
  emblemSize = 88,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* 1. TOP: LOGO-ANA WEB-03 (Quatrefoil emblem) */}
      <div className="mb-4 sm:mb-6 drop-shadow-[0_3px_20px_rgba(0,0,0,0.4)]">
        <DeAndradeEmblem size={emblemSize} color={color} />
      </div>

      {/* 2. BOTTOM: LOGO-ANA WEB-02 (De Andrade / INTERIOR DESIGN) */}
      <DeAndradeWordmark size="lg" color={color} subtitleColor={color} />
    </div>
  );
};
