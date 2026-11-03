'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, type LanguageCode } from '../../lib/i18n/translations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select Language"
        className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300/80 rounded-xl text-xs font-bold text-slate-800 transition min-h-[38px] shadow-sm"
      >
        <span className="text-sm">🌐</span>
        <span>{currentOption.nativeLabel}</span>
        <span className="text-[10px] text-slate-400">▾</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-amber-900/15 rounded-2xl shadow-xl shadow-slate-900/10 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 mb-1">
            Regional Dialect
          </div>
          {SUPPORTED_LANGUAGES.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => {
                setLanguage(opt.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between transition ${
                opt.code === language
                  ? 'bg-amber-50 text-amber-950 font-black'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs">{opt.nativeLabel}</span>
                <span className="text-[10px] text-slate-400 font-normal">{opt.label}</span>
              </div>
              {opt.code === language && <span className="text-amber-600 text-xs font-black">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
