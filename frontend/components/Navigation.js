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

  // Left side navigation items - KienNotes.AI
  const leftNavItems = [
    { name: 'KienNotes.AI', href: '/', isLogo: true }
  ];

  // Center navigation items
  const centerNavItems = [
    { name: t('nav.library'), href: '/library' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.mentoring'), href: '/mentoring' },
  ];

  // Right side navigation items
  const rightNavItems = [];

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
          ? 'bg-nav-scrolled shadow-lg' 
          : 'bg-nav'} 
      `}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left Side - KienNotes.AI */}
          <div className="flex items-center">
            <Link href="/" className="relative group">
              <motion.div 
                className={`text-3xl font-space font-bold text-primary-800 transition-colors duration-300 ${
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
          </div>

          {/* Center - Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {centerNavItems.map((item, index) => (
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
            
            {/* Start Learning CTA */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                href="/start-learning"
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-white text-primary-600 hover:bg-neutral-100 shadow-md hover:shadow-lg' 
                    : 'bg-primary-600 hover:bg-primary-400 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {t('nav.start_learning')}
              </Link>
            </motion.div>
          </div>

          {/* Right Side - About & Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {/* About merged into Mentoring; right side reserved for auth controls */}

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
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link 
                  href="/login"
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    isScrolled 
                      ? 'bg-white text-primary-600 hover:bg-neutral-100 shadow-md hover:shadow-lg' 
                      : 'bg-primary-600 text-white hover:bg-primary-500 shadow-md hover:shadow-lg'
                  }`}
                >
                  {t('nav.login')}
                </Link>
              </motion.div>
            )}

            {/* Theme & Language Controls */}
            <div className="flex items-center space-x-2 ml-2 bg-opacity-20 bg-neutral-200 dark:bg-neutral-700 rounded-full px-2 py-1">
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

          {/* Mobile Menu Button */}
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
          {/* Mobile Navigation Links */}
          {centerNavItems.map((item) => (
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
          
          {/* Start Learning CTA for Mobile */}
          <Link
            href="/start-learning"
            className="block px-3 py-2 rounded-md text-sm font-medium bg-primary-500 text-white hover:bg-primary-400 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.start_learning')}
          </Link>
          
          {/* About Link for Mobile */}
          <Link
            href="/about"
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
              ${isActive('/about')
                ? 'text-neutral-50 bg-primary-600/50'
                : 'text-neutral-100 hover:text-neutral-50 hover:bg-primary-600/30'
              }
            `}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.about')}
          </Link>
          
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
            <Link
              href="/login"
              className="block px-3 py-2 rounded-md text-sm font-medium bg-white text-primary-600 hover:bg-neutral-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.login')}
            </Link>
          )}
          
          {/* Theme Toggle for Mobile */}
          <button
            onClick={() => {
              toggleDarkMode();
              setIsMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-neutral-100 hover:text-neutral-50 hover:bg-primary-600/30 transition-colors duration-200"
          >
            {isDarkMode ? t('theme.light') : t('theme.dark')}
          </button>
          
          {/* Language Switcher for Mobile */}
          <div className="px-3 py-2">
            <LanguageSwitcher isScrolled={true} />
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation; 