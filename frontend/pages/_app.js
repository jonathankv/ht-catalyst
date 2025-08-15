import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../components/ThemeProvider';
import dynamic from 'next/dynamic';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

// Lazy-load AuthProvider to keep it out of the critical path on non-auth pages
const AuthProvider = dynamic(() => import('../contexts/AuthContext').then(m => m.AuthProvider), { ssr: false });

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin', 'vietnamese'], 
  variable: '--font-space-grotesk', 
  weight: ['400','500','600','700'],
  display: 'swap',
  fallback: ['Inter', 'system-ui', 'sans-serif']
});
const inter = Inter({ 
  subsets: ['latin', 'vietnamese'], 
  variable: '--font-inter', 
  weight: ['400','500','600','700'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
});
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains-mono', 
  weight: ['400','500','600'],
  display: 'swap',
  fallback: ['Consolas', 'Monaco', 'Courier New', 'monospace']
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}

export default appWithTranslation(MyApp); 