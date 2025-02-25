import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const Hero = () => {
  const { scrollY } = useScroll();
  const { t } = useTranslation('common');

  return (
    <section className="min-h-screen bg-gradient-to-b from-neutral-25 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-24">
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
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/40 
              text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
              {t('hero.badge')}
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-50 
              max-w-4xl mx-auto leading-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-neutral-700 dark:text-neutral-200 max-w-2xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/library">
              <button className="btn-primary px-8 py-4 transform hover:scale-105 
                shadow-lg hover:shadow-primary-500/20 dark:hover:shadow-primary-400/20">
                {t('hero.cta.primary')}
              </button>
            </Link>
            <Link href="/blog">
              <button className="btn-secondary px-8 py-4 transform hover:scale-105">
                {t('hero.cta.secondary')}
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 