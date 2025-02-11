import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { LanguageProvider } from '../contexts/LanguageContext';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default appWithTranslation(MyApp); 