'use client';

import React from 'react';
import Link from 'next/link';

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
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all select-none">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-16 flex items-center justify-between gap-6">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  FitMatch
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                  Deterministic Fit
                </span>
              </div>
              <p className="hidden md:block text-xs text-slate-500 font-medium">
                Privacy-First Apparel Sizing for Indian Fashion
              </p>
            </div>
          </Link>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold text-slate-600">
          <a href="#sizing-engine" className="hover:text-indigo-600 transition-colors py-1">
            Sizing Engine
          </a>
          <button
            type="button"
            onClick={onOpenGuide}
            className="hover:text-indigo-600 transition-colors py-1 flex items-center space-x-1.5"
          >
            <span>Visual Guides</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
          <a href="#supported-brands" className="hover:text-indigo-600 transition-colors py-1">
            Supported Brands (6)
          </a>
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="hover:text-indigo-600 transition-colors py-1 flex items-center space-x-1.5"
          >
            <span>DPDP Privacy</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
              Verified
            </span>
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Unit Toggle Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => unit !== 'in' && onUnitToggle()}
              className={`px-3 py-1.5 rounded-lg transition min-h-[34px] ${
                unit === 'in' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              INCHES
            </button>
            <button
              type="button"
              onClick={() => unit !== 'cm' && onUnitToggle()}
              className={`px-3 py-1.5 rounded-lg transition min-h-[34px] ${
                unit === 'cm' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CM
            </button>
          </div>

          {/* Interactive Guide Quick Button */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold px-4 py-2.5 rounded-xl transition min-h-[42px] flex items-center space-x-2 focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <span>📏</span>
            <span className="hidden sm:inline">Visual Guide</span>
          </button>

          {/* Privacy Center Button */}
          <button
            type="button"
            onClick={onOpenPrivacy}
            aria-label="Open Privacy Center"
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold px-4 py-2.5 rounded-xl transition min-h-[42px] flex items-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <span>🔒</span>
            <span className="hidden md:inline">Privacy</span>
          </button>

          {/* Operator Portal Link */}
          <Link
            href="/admin"
            className="text-xs font-bold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-xl transition whitespace-nowrap hidden xl:inline-block bg-slate-50 border border-slate-200 hover:bg-slate-100"
          >
            Operator Portal &rarr;
          </Link>
        </div>
      </div>
    </header>
  );
};
