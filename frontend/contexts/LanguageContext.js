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
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'vi'];
    const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
    
    // Get saved language preference
    const savedLang = localStorage.getItem('language');
    const initialLang = savedLang || defaultLang;
    
    setCurrentLanguage(initialLang);
    router.push(router.pathname, router.asPath, { locale: initialLang });
  }, []);

  const changeLanguage = async (locale) => {
    const { pathname, asPath, query } = router;
    await router.push({ pathname, query }, asPath, { locale });
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