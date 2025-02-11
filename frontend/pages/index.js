import { motion } from 'framer-motion';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navigation from '../components/Navigation';
import KnowledgeHub from '../components/KnowledgeHub';
import Newsletter from '../components/Newsletter';
import FloatingChat from '../components/FloatingChat';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Head>
        <title>{t('site.title')} - {t('site.description')}</title>
      </Head>

      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-32 pb-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-8 leading-tight py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>
      </motion.section>

      {/* Knowledge Hub Sections */}
      <KnowledgeHub />

      {/* Newsletter Section */}
      <Newsletter />

      <FloatingChat />
    </div>
  );
}

// This is crucial for translations to work
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 