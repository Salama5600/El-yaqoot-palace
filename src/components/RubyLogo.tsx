import React from 'react';

interface RubyLogoProps {
  className?: string;
  size?: number;
  variant?: 'burgundy' | 'gold' | 'monochrome';
}

export const RubyLogo: React.FC<RubyLogoProps> = ({
  className = '',
  size = 38,
  variant = 'burgundy',
}) => {
  // Bespoke Faceted Royal Ruby / Crystal Cut vector
  // Signature burgundy: #7A3036, deep ruby: #551D22, highlight ruby: #9A3E46, champagne gold accent: #C5A059
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-label="شعار قصر الياقوت"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_6px_rgba(122,48,54,0.25)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Burgundy Ruby Gradients */}
          <linearGradient id="rubyTop" x1="14" y1="6" x2="34" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9E3B43" />
            <stop offset="1" stopColor="#7A3036" />
          </linearGradient>

          <linearGradient id="rubyCenter" x1="24" y1="16" x2="24" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7A3036" />
            <stop offset="1" stopColor="#4A181D" />
          </linearGradient>

          <linearGradient id="rubyLeftFacet" x1="6" y1="16" x2="24" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#872F36" />
            <stop offset="1" stopColor="#3F1418" />
          </linearGradient>

          <linearGradient id="rubyRightFacet" x1="42" y1="16" x2="24" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#69252B" />
            <stop offset="1" stopColor="#381014" />
          </linearGradient>

          <linearGradient id="rubyCrownLeft" x1="6" y1="16" x2="15" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B3464F" />
            <stop offset="1" stopColor="#7A3036" />
          </linearGradient>

          <linearGradient id="rubyCrownRight" x1="42" y1="16" x2="33" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#872F36" />
            <stop offset="1" stopColor="#5E2025" />
          </linearGradient>
        </defs>

        {/* --- Gem Facets Geometry --- */}
        {/* Top Flat Crown (Table) */}
        <polygon
          points="15,7 33,7 28,16 20,16"
          fill="url(#rubyTop)"
          stroke="#C5A059"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Top Left Crown Facet */}
        <polygon
          points="6,16 15,7 20,16"
          fill="url(#rubyCrownLeft)"
          stroke="#C5A059"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Top Right Crown Facet */}
        <polygon
          points="33,7 42,16 28,16"
          fill="url(#rubyCrownRight)"
          stroke="#C5A059"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Lower Pavilion Center Diamond Facet */}
        <polygon
          points="20,16 28,16 24,42"
          fill="url(#rubyCenter)"
          stroke="#C5A059"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Lower Pavilion Left Facet */}
        <polygon
          points="6,16 20,16 24,42"
          fill="url(#rubyLeftFacet)"
          stroke="#C5A059"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Lower Pavilion Right Facet */}
        <polygon
          points="28,16 42,16 24,42"
          fill="url(#rubyRightFacet)"
          stroke="#C5A059"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Subtle Light Reflection Sheen on Top Corner */}
        <circle cx="16" cy="10" r="1.2" fill="#FDFBF7" opacity="0.75" />
      </svg>
    </div>
  );
};
