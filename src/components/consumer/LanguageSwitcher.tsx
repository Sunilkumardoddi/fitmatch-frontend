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
        className="flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-400 rounded-lg text-xs font-medium text-neutral-800 transition min-h-[36px]"
      >
        <span className="text-xs">🌐</span>
        <span className="font-semibold">{currentOption.nativeLabel}</span>
        <span className="text-[10px] text-neutral-400">▾</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-xl shadow-neutral-900/5 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-100 mb-1">
            Regional Language
          </div>
          {SUPPORTED_LANGUAGES.map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => {
                setLanguage(opt.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between transition ${
                opt.code === language
                  ? 'bg-neutral-100 text-black font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50 hover:text-black'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs">{opt.nativeLabel}</span>
                <span className="text-[10px] text-neutral-400">{opt.label}</span>
              </div>
              {opt.code === language && <span className="text-black text-xs font-bold">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
