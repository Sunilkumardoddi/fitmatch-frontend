'use client';

import React from 'react';
import Link from 'next/link';

export interface BrandLogoProps {
  variant?: 'full' | 'mark' | 'horizontal' | 'badge';
  theme?: 'dark' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  href?: string;
  className?: string;
}

/**
 * Authentic Minimalist Atelier Monogram & Brand Hallmark
 * Inspired by contemporary architectural fashion houses (COS, Acne Studios, Rare Rabbit, Snitch).
 * Uses pure high-contrast vector geometry: an architectural hallmark with intersecting tailor's tape ribbons.
 */
export const BrandMark: React.FC<{ sizePx?: number; theme?: 'dark' | 'light'; className?: string }> = ({
  sizePx = 36,
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const strokeColor = isDark ? '#FFFFFF' : '#111111';
  const fillColor = isDark ? '#111111' : '#FFFFFF';
  const accentColor = isDark ? '#D4AF37' : '#92400E';

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-[1.03] ${className}`}
      aria-label="FitMatch Atelier Hallmark"
    >
      {/* Outer Crisp Architectural Frame */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="14"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="4"
      />

      {/* Tailor's Tape Measuring Grid Ticks on Top Edge */}
      <line x1="28" y1="6" x2="28" y2="16" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="6" x2="50" y2="20" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="72" y1="6" x2="72" y2="16" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />

      {/* Minimalist Monogram: Intersecting Tape Strokes forming 'F' & 'M' */}
      {/* Primary Vertical Spine */}
      <path
        d="M32 30V76"
        stroke={strokeColor}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Top Crossbar of 'F' */}
      <path
        d="M32 34H68"
        stroke={strokeColor}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Mid Crossbar with Precision Tailor's Notch */}
      <path
        d="M32 52H56"
        stroke={strokeColor}
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Architectural Right Chevron for 'M' */}
      <path
        d="M52 52L68 76V34"
        stroke={strokeColor}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Precision Calibration Dot */}
      <circle cx="50" cy="52" r="3.5" fill={accentColor} />
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  showTagline = true,
  href = '/',
  className = '',
}) => {
  const markSizes = {
    xs: 24,
    sm: 30,
    md: 38,
    lg: 48,
    xl: 60,
  };

  const textSizes = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const isDark = theme === 'dark';

  const content = (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Minimalist Vector Hallmark */}
      <BrandMark sizePx={markSizes[size]} theme={theme} />

      {/* Typographic Wordmark */}
      {variant !== 'mark' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-2">
            <span
              className={`font-extrabold tracking-[0.2em] uppercase transition-colors ${textSizes[size]} ${
                isDark ? 'text-white' : 'text-neutral-900 group-hover:text-black'
              }`}
              style={{ letterSpacing: '0.18em' }}
            >
              FIT<span className="font-light tracking-[0.18em] opacity-90">MATCH</span>
            </span>

            {/* Subtle Atelier Tag */}
            <span
              className={`text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded border ${
                isDark
                  ? 'border-neutral-700 text-neutral-300 bg-neutral-800'
                  : 'border-neutral-200 text-neutral-600 bg-neutral-50'
              }`}
            >
              STUDIO
            </span>
          </div>

          {showTagline && (
            <p
              className={`text-[10px] tracking-[0.16em] uppercase font-medium mt-0.5 ${
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              Precision Apparel Fit Engine
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex focus:outline-none focus-visible:ring-1 focus-visible:ring-black">
        {content}
      </Link>
    );
  }

  return content;
};
