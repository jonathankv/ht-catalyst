import { motion, useScroll } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

/**
 * Hero component for landing pages
 * Features animated text and background effects using Framer Motion
 * Supports multilingual content through i18next
 * @param {Object} props - Component properties
 * @param {string} props.backgroundImage - Optional background image URL
 * @param {boolean} props.animated - Whether to enable animations
 * @returns {JSX.Element} Hero section with title and subtitle
 */
function Hero({ backgroundImage, animated = true }) {
  const { scrollY } = useScroll();
  const { t } = useTranslation('common');

  return (
    <section className="bg-transparent">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-24">
        <motion.div 
          className="text-center space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight py-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-400 dark:to-primary-200">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-neutral-700 dark:text-neutral-200 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/library">
              <button className="bg-primary-700 hover:bg-primary-800 text-white font-medium px-8 py-4 rounded-lg 
                transform hover:scale-105 transition-all duration-300
                shadow-lg hover:shadow-primary-600/30 dark:bg-primary-600 dark:hover:bg-primary-700
                dark:hover:shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2
                dark:focus:ring-offset-neutral-900">
                {t('hero.cta.primary')}
              </button>
            </Link>
            <Link href="/blog">
              <button className="bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700
                text-primary-700 dark:text-primary-400 font-medium border-2 border-primary-600 dark:border-primary-500
                px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-300
                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2
                dark:focus:ring-offset-neutral-900">
                {t('hero.cta.secondary')}
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero; 