import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Language switcher component
 * Allows users to toggle between available languages
 * Visually adapts based on scroll position
 * @param {Object} props - Component properties
 * @param {boolean} props.isScrolled - Whether the page has been scrolled
 * @returns {JSX.Element} Language toggle button
 */
export default function LanguageSwitcher({ isScrolled }) {
  const router = useRouter();
  const { changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLocale = router.locale === 'en' ? 'vi' : 'en';
    changeLanguage(newLocale);
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