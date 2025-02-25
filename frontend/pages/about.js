import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import About from '../components/About';
import { getTranslatedStaticProps } from '../utils/translationUtils';

export default function AboutPage({ locale }) {
  const { t } = useTranslation('common');
  
  return (
    <>
      <Head>
        <title>{t('about.title')} | {t('site.title')}</title>
        <meta name="description" content={t('about.intro')} />
      </Head>
      <Navigation />
      <main className="pt-16"> {/* Add padding-top to account for fixed navigation */}
        <About locale={locale} />
      </main>
    </>
  );
}

// This is crucial for translations to work
export async function getStaticProps({ locale }) {
  return getTranslatedStaticProps(locale);
} 