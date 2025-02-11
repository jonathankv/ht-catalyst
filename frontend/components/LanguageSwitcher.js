import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const toggleLanguage = async () => {
    const newLocale = router.locale === 'en' ? 'vi' : 'en';
    await router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <span className="text-sm font-medium">
        {router.locale === 'en' ? 'EN 🇬🇧' : 'VI 🇻🇳'}
      </span>
    </motion.button>
  );
} 