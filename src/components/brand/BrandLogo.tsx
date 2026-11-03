'use client';

import React from 'react';
import Link from 'next/link';

export interface BrandLogoProps {
  variant?: 'full' | 'mark' | 'horizontal' | 'badge';
  theme?: 'dark' | 'light' | 'gold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  href?: string;
  className?: string;
}

/**
 * FitMatch Luxury Haute-Couture Vector Insignia & Brand Mark
 * Combines an architectural tailoring tape loop, precision millimeter calibration ticks,
 * and an intertwining geometric 'F' & 'M' monogram in 24K champagne gold and obsidian noir.
 */
export const BrandMark: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 40,
  className = '',
}) => {
  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 transition-transform duration-300 ${className}`}
      aria-label="FitMatch Atelier Insignia"
    >
      <defs>
        {/* 24K Champagne Gold Primary Gradient */}
        <linearGradient id="fm-gold-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF6DE" />
          <stop offset="25%" stopColor="#E9CA7D" />
          <stop offset="65%" stopColor="#C99E3D" />
          <stop offset="100%" stopColor="#8C6515" />
        </linearGradient>

        {/* Radiant Gold Shimmer */}
        <linearGradient id="fm-gold-shimmer" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="45%" stopColor="#FFF9EB" />
          <stop offset="100%" stopColor="#AA820A" />
        </linearGradient>

        {/* Deep Obsidian Noir Core */}
        <radialGradient id="fm-obsidian-core" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#1E222D" />
          <stop offset="70%" stopColor="#0B0D13" />
          <stop offset="100%" stopColor="#050608" />
        </radialGradient>

        {/* Ambient Gold Halo */}
        <filter id="fm-gold-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Luxury Precision Dial (Octagonal Facets) */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="22"
        fill="url(#fm-obsidian-core)"
        stroke="url(#fm-gold-primary)"
        strokeWidth="1.5"
      />

      {/* Subtle Inner Bezel */}
      <rect
        x="10.5"
        y="10.5"
        width="79"
        height="79"
        rx="18"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.08"
        strokeWidth="1"
      />

      {/* Cardinal Precision Calibration Ticks (Tailor's Tape Calibration Marks) */}
      <line x1="50" y1="9" x2="50" y2="14" stroke="url(#fm-gold-shimmer)" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="50" y1="86" x2="50" y2="91" stroke="url(#fm-gold-shimmer)" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="9" y1="50" x2="14" y2="50" stroke="url(#fm-gold-shimmer)" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="86" y1="50" x2="91" y2="50" stroke="url(#fm-gold-shimmer)" strokeWidth="1.75" strokeLinecap="round" />

      {/* Micro Corner Tailor Notches */}
      <circle cx="21" cy="21" r="1.2" fill="#D4AF37" fillOpacity="0.6" />
      <circle cx="79" cy="21" r="1.2" fill="#D4AF37" fillOpacity="0.6" />
      <circle cx="21" cy="79" r="1.2" fill="#D4AF37" fillOpacity="0.6" />
      <circle cx="79" cy="79" r="1.2" fill="#D4AF37" fillOpacity="0.6" />

      {/* Intertwined Haute-Couture Monogram 'F' & 'M' */}
      {/* 1. Left Vertical Stem (The Atelier Needle / Primary F Spine) */}
      <path
        d="M31 27C31 25.3431 32.3431 24 34 24H39C40.6569 24 42 25.3431 42 27V73C42 74.6569 40.6569 76 39 76H34C32.3431 76 31 74.6569 31 73V27Z"
        fill="url(#fm-gold-primary)"
      />

      {/* 2. Top Horizontal Bar of 'F' extending into Crown */}
      <path
        d="M40 24H67C68.6569 24 70 25.3431 70 27V31C70 32.6569 68.6569 34 67 34H40V24Z"
        fill="url(#fm-gold-shimmer)"
      />

      {/* 3. Interlocking Tailor Tape Loop & 'M' Right Chevron */}
      <path
        d="M41 44H59C60.6569 44 62 45.3431 62 47V51C62 52.6569 60.6569 54 59 54H41V44Z"
        fill="url(#fm-gold-primary)"
      />

      {/* 4. Descending Architectural Apex for 'M' */}
      <path
        d="M50 44L69 73.5C69.7 74.6 71.3 74.6 72 73.5L78.5 63C79.1 62.1 79.1 60.9 78.5 60L60 31"
        stroke="url(#fm-gold-shimmer)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 5. Right Stanchion of 'M' */}
      <path
        d="M68 36C68 34.3431 69.3431 33 71 33H74C75.6569 33 77 34.3431 77 36V73C77 74.6569 75.6569 76 74 76H71C69.3431 76 68 74.6569 68 73V36Z"
        fill="url(#fm-gold-primary)"
      />

      {/* 6. Nexus Diamond: Center Couture Gem representing the Perfect Fit */}
      <polygon
        points="50,47 54.5,53 50,59 45.5,53"
        fill="url(#fm-gold-shimmer)"
        filter="url(#fm-gold-glow)"
      />
      <circle cx="50" cy="53" r="1.2" fill="#FFFFFF" />
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
  // Dimensions map
  const markSizes = {
    xs: 26,
    sm: 34,
    md: 42,
    lg: 54,
    xl: 68,
  };

  const textSizes = {
    xs: 'text-base',
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const isDark = theme === 'dark';

  const content = (
    <div
      className={`inline-flex items-center gap-3 select-none group transition-all duration-200 ${className}`}
    >
      {/* Bespoke Vector Mark */}
      <div className="relative group-hover:scale-105 transition-transform duration-300">
        <BrandMark sizePx={markSizes[size]} />
      </div>

      {/* Typography Lockup */}
      {variant !== 'mark' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-2">
            <span
              className={`font-black tracking-[0.16em] uppercase transition-colors ${
                textSizes[size]
              } ${
                isDark
                  ? 'text-white group-hover:text-amber-300'
                  : 'text-slate-900 group-hover:text-amber-800'
              }`}
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              FIT<span className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 bg-clip-text text-transparent">MATCH</span>
            </span>

            {/* Atelier / Couture Badge */}
            <span
              className={`text-[9px] font-extrabold tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border transition-all ${
                isDark
                  ? 'bg-amber-400/10 text-amber-300 border-amber-400/30'
                  : 'bg-amber-50 text-amber-900 border-amber-200'
              }`}
            >
              HAUTE SIZING
            </span>
          </div>

          {showTagline && (
            <p
              className={`text-[10px] tracking-[0.14em] uppercase font-semibold ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Deterministic Fit • Pure Precision
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
};
