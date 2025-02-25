import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LanguageContext = createContext();

export const languages = {
  en: {
    name: 'English',
    locale: 'en-US'
  },
  vi: {
    name: 'Tiếng Việt',
    locale: 'vi-VN'
  }
};

export function LanguageProvider({ children }) {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'vi'];
    const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
    
    // Get saved language preference or use router locale
    const savedLang = localStorage.getItem('language');
    const initialLang = savedLang || router.locale || defaultLang;
    
    setCurrentLanguage(initialLang);
    
    // Only set in localStorage if it doesn't exist
    if (!savedLang) {
      localStorage.setItem('language', initialLang);
    }
  }, [router.locale]);

  const changeLanguage = (locale) => {
    // Update state
    setCurrentLanguage(locale);
    
    // Save to localStorage
    localStorage.setItem('language', locale);
    
    // Force a hard reload to ensure translations are properly applied
    window.location.href = router.asPath.startsWith('/') 
      ? `/${locale}${router.asPath}` 
      : `/${locale}/${router.asPath}`;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 