import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function LanguageSwitcher({ isScrolled }) {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const toggleLanguage = async () => {
    const newLocale = router.locale === 'en' ? 'vi' : 'en';
    localStorage.setItem('language', newLocale);
    await router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleLanguage}
      className={`p-2 rounded-full transition-colors duration-200 ${
        isScrolled
          ? 'hover:bg-primary-600/50 text-neutral-50'
          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-50'
      }`}
    >
      <span className="text-sm font-medium">
      {router.locale === 'en' ? 'EN 🇬🇧' : 'VI 🇻🇳'}
      </span>
    </motion.button>
  );
} 