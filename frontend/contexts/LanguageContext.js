import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LanguageContext = createContext();

export const languages = {
  en: {
    name: 'English',
    locale: 'en-US',
    fonts: {
      heading: 'Space Grotesk',
      body: 'Inter',
      code: 'JetBrains Mono'
    }
  },
  vi: {
    name: 'Tiếng Việt',
    locale: 'vi-VN',
    fonts: {
      heading: 'Be Vietnam Pro',
      body: 'Inter',
      code: 'JetBrains Mono'
    }
  }
};

export function LanguageProvider({ children }) {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Get language from URL or browser
    const path = router.asPath;
    const locale = router.locale || 'en';
    setCurrentLanguage(locale);

    // Apply language-specific fonts
    document.documentElement.style.setProperty(
      '--font-heading',
      languages[locale].fonts.heading
    );
    document.documentElement.style.setProperty(
      '--font-body',
      languages[locale].fonts.body
    );
    document.documentElement.style.setProperty(
      '--font-code',
      languages[locale].fonts.code
    );
  }, [router.locale]);

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