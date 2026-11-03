'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, type LanguageCode } from '../../lib/i18n/translations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeOption = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <div ref={containerRef} className="relative inline-block text-left select-none">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition min-h-[36px]"
      >
        <span>🌐</span>
        <span>{activeOption.nativeLabel}</span>
        <span className="text-[10px] text-slate-400">▾</span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
            Indian Languages (भाषा)
          </div>
          {SUPPORTED_LANGUAGES.map((opt) => (
            <button
              key={opt.code}
              role="option"
              aria-selected={opt.code === language}
              onClick={() => {
                setLanguage(opt.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between transition ${
                opt.code === language
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs">{opt.nativeLabel}</span>
                <span className="text-[10px] text-slate-400 font-normal">{opt.label}</span>
              </div>
              {opt.code === language && <span className="text-indigo-600 font-bold">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
