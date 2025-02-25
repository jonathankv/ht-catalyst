import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

/**
 * Newsletter subscription component
 * Allows users to sign up for email updates
 * Features form validation and success/error states
 * @param {Object} props - Component properties
 * @param {string} props.locale - Current locale for i18n
 * @returns {JSX.Element} Newsletter signup form
 */
const Newsletter = ({ locale }) => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    setStatus('loading');
    
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || t('newsletter.error'));
    }
  };

  return (
    <section className="py-16 bg-primary-50 dark:bg-primary-900/20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
            {t('newsletter.title')}
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            {t('newsletter.description')}
          </p>
          
          <div className="mt-8 max-w-xl mx-auto">
            {status === 'success' ? (
              <motion.div 
                className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-green-800 dark:text-green-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {t('newsletter.success')}
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  className="flex-grow px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 
                    bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100
                    focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  disabled={status === 'loading'}
                />
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600
                    text-white font-medium rounded-lg transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : t('newsletter.button')}
                </motion.button>
              </form>
            )}
            
            {status === 'error' && (
              <motion.p 
                className="mt-2 text-red-600 dark:text-red-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errorMessage}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter; 