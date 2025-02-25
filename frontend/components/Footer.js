import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FaLinkedin, FaFacebook, FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Footer component
 * Displays site navigation, social links, and newsletter signup
 * Fully responsive with dark theme support
 * @returns {JSX.Element} Site footer
 */
const Footer = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('idle');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }
    
    setSubscribeStatus('loading');
    
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscribeStatus('success');
      setEmail('');
    } catch (error) {
      setSubscribeStatus('error');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <Link href="/" className="text-3xl font-bold text-white font-space">
              {t('site.title')}
            </Link>
            <p className="text-neutral-400 mt-2">
              {t('site.tagline', 'Building innovative solutions for a better tomorrow')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/library" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  {t('nav.library')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link href="/finance" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  {t('nav.finance')}
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  {t('nav.impact')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.connect')}</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.linkedin.com/in/vuvietkien/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/idol.meo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <FaFacebook /> Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/jonathankv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <FaGithub /> GitHub
                </a>
              </li>
              <li>
                <a 
                  href="mailto:vuvietkien.ptithcm@gmail.com" 
                  className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <FaEnvelope /> Email
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('newsletter.title')}</h3>
            <p className="text-neutral-400 mb-4">
              {t('footer.stayUpdated', 'Stay updated with the latest insights')}
            </p>
            
            {subscribeStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400"
              >
                {t('newsletter.success')}
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletter.placeholder')}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-4 text-white 
                      placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={subscribeStatus === 'loading'}
                    className="absolute right-1 top-1 bottom-1 px-3 bg-primary-600 hover:bg-primary-700 
                      text-white rounded-md transition-colors flex items-center justify-center"
                  >
                    {subscribeStatus === 'loading' ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    )}
                  </button>
                </div>
                
                {subscribeStatus === 'error' && (
                  <p className="text-red-400 text-sm">{t('newsletter.error')}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 my-8"></div>

        {/* Copyright and Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <div>
            © {currentYear} {t('site.author', 'John Anderson')}. {t('footer.allRightsReserved', 'All rights reserved.')}
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">
              {t('footer.privacyPolicy', 'Privacy Policy')}
            </Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">
              {t('footer.termsOfService', 'Terms of Service')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 