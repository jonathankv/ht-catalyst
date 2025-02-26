import { motion } from 'framer-motion';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Home from '../components/Home';
import Newsletter from '../components/Newsletter';
import FloatingChat from '../components/FloatingChat';
import { getTranslatedStaticProps } from '../utils/translationUtils';

/**
 * Index page (homepage) of the website
 * Serves as the entry point for visitors
 * Implements SEO optimization and initial data loading
 * @param {Object} props - Page properties from getStaticProps
 * @returns {JSX.Element} Rendered homepage
 */
export default function Index({ locale }) {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-neutral-950">
        <Head>
          <title>{t('meta.home.title')}</title>
          <meta name="description" content={t('meta.home.description')} />
        </Head>
        
        {/* Hero Section */}
        <Hero />

        {/* Main Content - Using existing Home component with modern cards */}
        <Home 
          variant="modern" 
          className="py-16 bg-neutral-50 dark:bg-neutral-900"
          locale={locale} 
        />

        {/* Newsletter Section */}
        <Newsletter locale={locale} />

        {/* Floating Chat */}
        <FloatingChat locale={locale} />
      </div>
    </Layout>
  );
}

// This is crucial for translations to work
export async function getStaticProps({ locale }) {
  return getTranslatedStaticProps(locale);
} 