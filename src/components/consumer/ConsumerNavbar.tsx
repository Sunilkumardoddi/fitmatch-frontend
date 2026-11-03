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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-sm transition-all select-none">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-18 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Couture Emblem */}
        <div className="flex items-center space-x-3">
          <BrandLogo size="md" variant="horizontal" />
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold text-slate-700 tracking-wide">
          <a href="#sizing-engine" className="hover:text-amber-800 transition-colors py-1">
            {t('navSizing')}
          </a>
          <button
            type="button"
            onClick={onOpenGuide}
            className="hover:text-amber-800 transition-colors py-1 flex items-center space-x-1.5"
          >
            <span>{t('navGuides')}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
          <a href="#supported-brands" className="hover:text-amber-800 transition-colors py-1">
            {t('navBrands')}
          </a>
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="hover:text-amber-800 transition-colors py-1 flex items-center space-x-1.5"
          >
            <span>{t('navPrivacy')}</span>
            <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-300/60 px-2 py-0.5 rounded font-bold">
              {t('verifiedBadge')}
            </span>
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Language Switcher Dropdown */}
          <LanguageSwitcher />

          {/* Unit Toggle Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => unit !== 'in' && onUnitToggle()}
              className={`px-3 py-1.5 rounded-lg transition min-h-[34px] ${
                unit === 'in' ? 'bg-white text-amber-950 font-extrabold shadow-sm border border-amber-900/10' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              IN
            </button>
            <button
              type="button"
              onClick={() => unit !== 'cm' && onUnitToggle()}
              className={`px-3 py-1.5 rounded-lg transition min-h-[34px] ${
                unit === 'cm' ? 'bg-white text-amber-950 font-extrabold shadow-sm border border-amber-900/10' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CM
            </button>
          </div>

          {/* How to Measure Quick Modal Button */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="text-xs bg-amber-50/80 hover:bg-amber-100/90 text-amber-950 border border-amber-300/60 font-bold px-3.5 py-2 rounded-xl transition min-h-[38px] flex items-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <span>📏</span>
            <span className="hidden sm:inline">{t('howToMeasureBtn')}</span>
          </button>

          {/* Privacy Center Button */}
          <button
            type="button"
            onClick={onOpenPrivacy}
            aria-label="Open Privacy Center"
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold px-3 py-2 rounded-xl transition min-h-[38px] flex items-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <span>🔒</span>
            <span className="hidden md:inline">{t('privacyBtn')}</span>
          </button>

          {/* Operator Portal Link */}
          <Link
            href="/admin"
            className="text-xs font-bold text-slate-700 hover:text-amber-900 px-3.5 py-2 rounded-xl transition whitespace-nowrap hidden xl:inline-block bg-slate-50 border border-slate-200 hover:bg-amber-50/50"
          >
            {t('operatorPortal')}
          </Link>
        </div>
      </div>
    </header>
  );
};
