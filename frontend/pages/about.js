import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navigation from '../components/Navigation';
import About from '../components/About';

export default function AboutPage() {
  const { t } = useTranslation('common');
  
  return (
    <>
      <Navigation />
      <main className="pt-16"> {/* Add padding-top to account for fixed navigation */}
        <About />
      </main>
    </>
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