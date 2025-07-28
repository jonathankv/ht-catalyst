import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import FinanceTools from '../components/finance/FinanceTools';
import AIAssistant from '../components/finance/AIAssistant';
import Layout from '../components/Layout';
import { getTranslatedStaticProps } from '../utils/translationUtils';

/**
 * Finance page component
 * Displays financial tools, calculators, and insights
 * Features interactive charts and data visualization
 * @param {Object} props - Page properties from getStaticProps
 * @returns {JSX.Element} Rendered finance page
 */
export default function Finance({ locale }) {
  const { t } = useTranslation('common');
  
  return (
    <Layout>
      <Head>
        <title>{t('finance.title')} | {t('site.title')}</title>
        <meta name="description" content={t('finance.description')} />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="section-title">{t('finance.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FinanceTools locale={locale} />
          <AIAssistant locale={locale} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return getTranslatedStaticProps(locale);
} 