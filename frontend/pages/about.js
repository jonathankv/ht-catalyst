import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Layout from '../components/Layout';
import About from '../components/About';
import { getTranslatedStaticProps } from '../utils/translationUtils';

export default function AboutPage({ locale }) {
  const { t } = useTranslation('common');
  
  return (
    <Layout>
      <Head>
        <title>{t('about.title')} | {t('site.title')}</title>
        <meta name="description" content={t('about.intro')} />
      </Head>
      <About locale={locale} />
    </Layout>
  );
}

// This is crucial for translations to work
export async function getStaticProps({ locale }) {
  return getTranslatedStaticProps(locale);
} 