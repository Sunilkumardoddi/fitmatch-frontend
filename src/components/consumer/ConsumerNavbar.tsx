'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BrandLogo } from '../brand/BrandLogo';

export interface ConsumerNavbarProps {
  unit: 'in' | 'cm';
  onUnitToggle: () => void;
  onOpenGuide: () => void;
  onOpenPrivacy: () => void;
}

export const ConsumerNavbar: React.FC<ConsumerNavbarProps> = ({
  unit,
  onUnitToggle,
  onOpenGuide,
  onOpenPrivacy,
}) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all select-none">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-18 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Minimalist Wordmark */}
        <div className="flex items-center space-x-3">
          <BrandLogo size="md" variant="horizontal" />
        </div>

        {/* Center Navigation Links — Editorial Style */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-wider uppercase text-neutral-600">
          <a href="#sizing-engine" className="hover:text-black transition-colors py-1">
            {t('navSizing')}
          </a>
          <button
            type="button"
            onClick={onOpenGuide}
            className="hover:text-black transition-colors py-1 flex items-center space-x-1.5"
          >
            <span>{t('navGuides')}</span>
          </button>
          <a href="#supported-brands" className="hover:text-black transition-colors py-1">
            {t('navBrands')}
          </a>
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="hover:text-black transition-colors py-1 flex items-center space-x-1.5"
          >
            <span>{t('navPrivacy')}</span>
            <span className="text-[10px] text-neutral-700 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded font-mono font-medium">
              {t('verifiedBadge')}
            </span>
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Language Switcher Dropdown */}
          <LanguageSwitcher />

          {/* Unit Toggle Pill (Minimalist Segmented Control) */}
          <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => unit !== 'in' && onUnitToggle()}
              className={`px-3 py-1.5 rounded-md transition min-h-[32px] ${
                unit === 'in' ? 'bg-white text-black font-bold shadow-sm' : 'text-neutral-500 hover:text-black'
              }`}
            >
              IN
            </button>
            <button
              type="button"
              onClick={() => unit !== 'cm' && onUnitToggle()}
              className={`px-3 py-1.5 rounded-md transition min-h-[32px] ${
                unit === 'cm' ? 'bg-white text-black font-bold shadow-sm' : 'text-neutral-500 hover:text-black'
              }`}
            >
              CM
            </button>
          </div>

          {/* How to Measure Quick Modal Button */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-medium text-neutral-900 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black px-3.5 py-2 rounded-lg transition min-h-[36px]"
          >
            <span>📏</span>
            <span>{t('howToMeasureBtn')}</span>
          </button>

          {/* Privacy Center Button */}
          <button
            type="button"
            onClick={onOpenPrivacy}
            aria-label="Open Privacy Center"
            className="text-xs bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 font-medium px-3 py-2 rounded-lg transition min-h-[36px] flex items-center space-x-1.5"
          >
            <span>🔒</span>
            <span className="hidden md:inline">{t('privacyBtn')}</span>
          </button>

          {/* Operator Portal Link */}
          <Link
            href="/admin"
            className="text-xs font-medium bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-lg transition whitespace-nowrap min-h-[36px] flex items-center shadow-sm"
          >
            {t('operatorPortal')}
          </Link>
        </div>
      </div>
    </header>
  );
};
