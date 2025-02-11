import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from './ThemeProvider';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = () => {
  const { t } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.resources'), href: '/resources' },
    { name: t('nav.about'), href: '/about' }
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20
        ${isScrolled 
          ? 'backdrop-blur-xl bg-gradient-to-r from-indigo-500/90 to-purple-500/90 dark:from-indigo-900/95 dark:to-purple-900/95' 
          : 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md'}
      `}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Shadow overlay div to prevent height jumping */}
      <div className={`absolute inset-0 transition-shadow duration-500 pointer-events-none
        ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="relative group">
            <motion.div 
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-gray-800 dark:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('site.title')}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full duration-300 ${
                isScrolled ? 'bg-white/80' : 'bg-gray-800 dark:bg-white/80'
              }`} />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <Link 
                  href={item.href}
                  className={`py-2 text-sm font-medium transition-colors duration-200
                    ${isActive(item.href)
                      ? isScrolled ? 'text-white' : 'text-gray-900 dark:text-white'
                      : isScrolled 
                        ? 'text-white/80 hover:text-white'
                        : 'text-gray-700 hover:text-gray-900 dark:text-white/80 dark:hover:text-white'
                    }
                  `}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300
                    ${isScrolled ? 'bg-white/80' : 'bg-gray-800 dark:bg-white/80'}
                    ${isActive(item.href) ? 'w-full' : 'group-hover:w-full'}
                  `} />
                </Link>
              </motion.div>
            ))}
            
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isScrolled ? 'hover:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className={`w-5 h-5 ${isScrolled ? 'text-yellow-300' : 'text-yellow-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className={`w-5 h-5 ${isScrolled ? 'text-white/90' : 'text-gray-700 dark:text-white/90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.button>
            <LanguageSwitcher />
          </div>

          <motion.button
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled ? 'hover:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-6 h-5 flex flex-col justify-between transition-transform duration-200 ${isMenuOpen ? 'transform' : ''}`}>
              <span className={`h-0.5 w-full transition-transform duration-200 ${
                isScrolled ? 'bg-white' : 'bg-gray-800 dark:bg-white'
              } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-full transition-opacity duration-200 ${
                isScrolled ? 'bg-white' : 'bg-gray-800 dark:bg-white'
              } ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full transition-transform duration-200 ${
                isScrolled ? 'bg-white' : 'bg-gray-800 dark:bg-white'
              } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className="md:hidden overflow-hidden absolute top-20 left-0 right-0"
        initial={false}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-indigo-500/95 to-purple-500/95 dark:from-indigo-900/95 dark:to-purple-900/95 backdrop-blur-xl shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${isActive(item.href)
                  ? 'text-white bg-white/20'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
                }
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleDarkMode();
              setIsMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <LanguageSwitcher />
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation; 