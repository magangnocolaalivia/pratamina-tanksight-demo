import React from 'react';

export type ParodyBrandName = 
  | 'PRATAMINA PATRA NIAGA' 
  | 'PERMATINA PATRA NIAGA' 
  | 'PERTAMANI PATRA NIAGA' 
  | 'PERTAMINI PATRA NIAGA'
  | 'PRATAMINA MITRA NIAGA';

interface ParodyLogoProps {
  variant?: 'full' | 'icon-only' | 'stacked';
  theme?: 'dark' | 'light';
  brandName?: ParodyBrandName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ParodyLogo: React.FC<ParodyLogoProps> = ({
  variant = 'full',
  theme = 'dark',
  brandName = 'PRATAMINA PATRA NIAGA',
  size = 'md',
  className = '',
}) => {
  // Split brandName into primary and secondary
  const parts = brandName.split(' ');
  const mainText = parts[0]; // e.g. PRATAMINA or PERMATINA
  const subText = parts.slice(1).join(' '); // e.g. PATRA NIAGA or MITRA NIAGA

  // Sizing styles
  const sizeMap = {
    sm: { iconWidth: 32, iconHeight: 28, textMain: 'text-sm', textSub: 'text-[9px]', tracking: 'tracking-[0.18em]' },
    md: { iconWidth: 48, iconHeight: 42, textMain: 'text-xl', textSub: 'text-[11px]', tracking: 'tracking-[0.22em]' },
    lg: { iconWidth: 72, iconHeight: 62, textMain: 'text-3xl', textSub: 'text-sm', tracking: 'tracking-[0.24em]' },
    xl: { iconWidth: 110, iconHeight: 96, textMain: 'text-5xl', textSub: 'text-xl', tracking: 'tracking-[0.28em]' },
  };

  const { iconWidth, iconHeight, textMain, textSub, tracking } = sizeMap[size];

  // Distinct parodied icon geometry:
  // The iconic 3-element composition is modified:
  // - The shapes feature distinct geometric cuts, modernized curved vertices with reverse aerodynamic angles.
  // - Blue component on the left has dual-radii chamfers.
  // - Red top-right wing has a dynamic forward propulsion notch.
  // - Green bottom-right wing forms an inverted chevron base.
  // This produces a legally distinct graphic mark that evokes the signature aesthetic while remaining legally safe for proposal mocks.
  const iconSvg = (
    <svg
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
      role="img"
      aria-label="Logo Parodi Pratamina Patra Niaga"
    >
      <defs>
        {/* Subtle highlights for high-end corporate mockup sheen */}
        <linearGradient id="parodyBlueGrad" x1="0" y1="40" x2="80" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2557B4" />
          <stop offset="1" stopColor="#1B428C" />
        </linearGradient>
        <linearGradient id="parodyRedGrad" x1="60" y1="0" x2="160" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5222D" />
          <stop offset="1" stopColor="#D3141F" />
        </linearGradient>
        <linearGradient id="parodyGreenGrad" x1="70" y1="70" x2="160" y2="130" gradientUnits="userSpaceOnUse">
          <stop stopColor="#96C926" />
          <stop offset="1" stopColor="#7DAE1B" />
        </linearGradient>
      </defs>

      {/* 1. BLUE ELEMENT: Left pillar with distinctive curved angled wing and inner relief */}
      <path
        d="M48 20 C54 20 60 25 60 32 L36 122 C34 130 26 136 18 136 C10 136 4 130 6 122 L30 32 C32 25 40 20 48 20 Z"
        fill="url(#parodyBlueGrad)"
      />

      {/* 2. RED ELEMENT: Top right dynamic aerodynamic chevron with unique front rounded cut */}
      <path
        d="M74 4 C80 4 86 8 91 14 L142 56 C147 61 145 69 138 71 L92 73 C84 73 78 68 76 60 L68 20 C66 11 70 4 74 4 Z"
        fill="url(#parodyRedGrad)"
      />

      {/* 3. LIME GREEN ELEMENT: Bottom right wing with curved lower hook */}
      <path
        d="M86 85 C92 85 99 89 103 94 L138 126 C144 131 141 138 133 138 L92 138 C83 138 76 132 73 124 L68 96 C67 89 74 85 86 85 Z"
        fill="url(#parodyGreenGrad)"
      />

      {/* Distinctive accent dot in the intersection to signify IoT intelligence and legal departure */}
      <circle cx="68" cy="78" r="4.5" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{iconSvg}</div>;
  }

  const isDark = theme === 'dark';

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {iconSvg}
      <div className="flex flex-col justify-center leading-none">
        {/* Main Parody Brand Text */}
        <span
          className={`font-black uppercase tracking-tight italic ${textMain} ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          {mainText}
        </span>

        {/* Sub Brand Text (e.g. PATRA NIAGA) in signature red */}
        <span
          className={`font-bold uppercase text-[#ED1C24] ${textSub} ${tracking} mt-1`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          {subText}
        </span>
      </div>
    </div>
  );
};
