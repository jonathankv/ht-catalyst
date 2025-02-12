import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../components/ThemeProvider';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp); 