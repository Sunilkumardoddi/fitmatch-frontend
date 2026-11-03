'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { type LanguageCode, SUPPORTED_LANGUAGES, getTranslation } from './translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fitmatch_lang') as LanguageCode;
      if (saved && ['en', 'hi', 'hinglish', 'te', 'ta'].includes(saved)) {
        setLanguageState(saved);
      }
    } catch {
      // localStorage may fail in restricted environments
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('fitmatch_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string) => getTranslation(language, key);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

