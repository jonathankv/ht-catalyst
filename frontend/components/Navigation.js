import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from './ThemeProvider';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../contexts/AuthContext';

/**
 * Main navigation component for the website
 * Provides links to all major sections and handles mobile/desktop navigation
 * Integrates with i18next for multilingual support
 * @returns {JSX.Element} Navigation bar with responsive menu
 */
const Navigation = () => {
  const { t } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.library'), href: '/library' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.finance'), href: '/finance' },
    { name: t('nav.impact'), href: '/impact' },
    { name: t('nav.about'), href: '/about' }
  ];

  const isActive = (path) => router.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20
        ${isScrolled 
          ? 'bg-primary-700 dark:bg-primary-800 shadow-lg' 
          : 'bg-neutral-25/80 dark:bg-neutral-900/80 backdrop-blur-md'}
      `}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="relative group">
            <motion.div 
              className={`text-3xl font-space font-bold text-primary-700 transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-neutral-900 dark:text-neutral-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('site.title')}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full duration-300 ${
                isScrolled ? 'bg-white' : 'bg-neutral-900 dark:bg-neutral-50'
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
                  className={`relative group ${
                    isScrolled 
                      ? 'text-white hover:text-neutral-100' 
                      : 'text-neutral-800 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-50'
                  } transition-colors duration-200`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full duration-300 ${
                    isScrolled ? 'bg-neutral-50' : 'bg-neutral-900 dark:bg-neutral-50'
                  }`} />
                </Link>
              </motion.div>
            ))}
            
            <div className="flex items-center space-x-4 ml-4">
              {/* Auth Links */}
              {currentUser ? (
                <div className="relative group">
                  <Link 
                    href="/profile"
                    className={`relative group ${
                      isScrolled 
                        ? 'text-white hover:text-neutral-100' 
                        : 'text-neutral-800 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-50'
                    } transition-colors duration-200`}
                  >
                    {t('nav.profile')}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full duration-300 ${
                      isScrolled ? 'bg-neutral-50' : 'bg-neutral-900 dark:bg-neutral-50'
                    }`} />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="relative group">
                    <Link 
                      href="/login"
                      className={`relative group ${
                        isScrolled 
                          ? 'text-white hover:text-neutral-100' 
                          : 'text-neutral-800 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-50'
                      } transition-colors duration-200`}
                    >
                      {t('nav.login')}
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full duration-300 ${
                        isScrolled ? 'bg-neutral-50' : 'bg-neutral-900 dark:bg-neutral-50'
                      }`} />
                    </Link>
                  </div>
                  <div className="relative group">
                    <Link 
                      href="/signup"
                      className={`relative group ${
                        isScrolled 
                          ? 'text-white hover:text-neutral-100' 
                          : 'text-neutral-800 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-50'
                      } transition-colors duration-200`}
                    >
                      {t('nav.signup')}
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full duration-300 ${
                        isScrolled ? 'bg-neutral-50' : 'bg-neutral-900 dark:bg-neutral-50'
                      }`} />
                    </Link>
                  </div>
                </>
              )}

              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isScrolled ? 'hover:bg-primary-600/50' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className={`w-5 h-5 ${isScrolled ? 'text-white' : 'text-primary-500 dark:text-primary-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className={`w-5 h-5 ${isScrolled ? 'text-white' : 'text-neutral-900 dark:text-neutral-50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.button>
              <LanguageSwitcher isScrolled={isScrolled} />
            </div>
          </div>

          <motion.button
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled ? 'hover:bg-primary-600/50' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-6 h-5 flex flex-col justify-between transition-transform duration-200 ${isMenuOpen ? 'transform' : ''}`}>
              <span className={`h-0.5 w-full transition-transform duration-200 ${
                isScrolled ? 'bg-white' : 'bg-neutral-900 dark:bg-neutral-50'
              } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-full transition-opacity duration-200 ${
                isScrolled ? 'bg-white' : 'bg-neutral-900 dark:bg-neutral-50'
              } ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full transition-transform duration-200 ${
                isScrolled ? 'bg-white' : 'bg-neutral-900 dark:bg-neutral-50'
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
        <div className="px-2 pt-2 pb-3 space-y-1 bg-primary-700 dark:bg-primary-800 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${isActive(item.href)
                  ? 'text-neutral-50 bg-primary-600/50'
                  : 'text-neutral-100 hover:text-neutral-50 hover:bg-primary-600/30'
                }
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Auth Links for Mobile */}
          {currentUser ? (
            <>
              <Link
                href="/profile"
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${isActive('/profile')
                    ? 'text-neutral-50 bg-primary-600/50'
                    : 'text-neutral-100 hover:text-neutral-50 hover:bg-primary-600/30'
                  }
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.profile')}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-neutral-100 hover:text-neutral-50 hover:bg-primary-600/30 transition-colors duration-200"
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${isActive('/login')
                    ? 'text-neutral-50 bg-primary-600/50'
                    : 'text-neutral-100 hover:text-neutral-50 hover:bg-primary-600/30'
                  }
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.login')}
              </Link>
              <Link
                href="/signup"
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${isActive('/signup')
                    ? 'text-neutral-50 bg-primary-600/50'
                    : 'text-neutral-100 hover:text-neutral-50 hover:bg-primary-600/30'
                  }
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.signup')}
              </Link>
            </>
          )}
          
          <button
            onClick={() => {
              toggleDarkMode();
              setIsMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-neutral-100 hover:text-neutral-50 hover:bg-primary-600/30 transition-colors duration-200"
          >
            {isDarkMode ? t('theme.light') : t('theme.dark')}
          </button>
          <LanguageSwitcher isScrolled={isScrolled} />
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation; 