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
      <div className="min-h-screen bg-gradient-to-b from-neutral-25 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
        <Head>
          <title>{t('meta.home.title')}</title>
          <meta name="description" content={t('meta.home.description')} />
        </Head>
        
        {/* Hero Section */}
        <Hero />

        {/* Main Content */}
        <Home locale={locale} />

        {/* Newsletter Section */}
        <Newsletter locale={locale} />

        <FloatingChat locale={locale} />
      </div>
    </Layout>
  );
}

// This is crucial for translations to work
export async function getStaticProps({ locale }) {
  return getTranslatedStaticProps(locale);
} 