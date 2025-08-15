import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Hero component for landing pages
 * Features animated text and background effects using Framer Motion
 * Supports multilingual content through i18next
 * @returns {JSX.Element} Hero section with title and subtitle
 */
function Hero() {
  const { t } = useTranslation('common');

  return (
    <section className="bg-section-hero text-neutral-900 dark:text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-display-lg">
              {t('site.author', 'Kien (Jonathan) Vu Viet')}
            </h1>
            
            <p className="text-body-xl">
              {t('site.tagline')}
            </p>
            
            <p className="text-body-lg">
              {t('hero.description')}
            </p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/contact">
                <button className="bg-primary-600 hover:bg-primary-500 dark:bg-primary-600 dark:hover:bg-primary-500 text-white dark:text-neutral-900 text-ui px-6 py-3 rounded-lg 
                  transform hover:scale-105 transition-all duration-300
                  shadow-lg hover:shadow-primary-600/30 dark:hover:shadow-primary-600/30 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-600 focus:ring-offset-2
                  focus:ring-offset-white dark:focus:ring-offset-neutral-900">
                  {t('contact.title')}
                </button>
              </Link>
              <Link href="/library">
                <button className="bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800
                  text-neutral-900 dark:text-white text-ui border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600
                  px-6 py-3 rounded-lg transform hover:scale-105 transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 focus:ring-offset-2
                  focus:ring-offset-white dark:focus:ring-offset-neutral-900">
                  {t('hero.cta.primary')}
                </button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Profile Image */}
          <motion.div
            className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/images/avatar/profile-avatar.jpg"
              alt={t('site.author', 'Kien (Jonathan) Vu Viet')}
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero; 