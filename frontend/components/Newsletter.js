import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const Newsletter = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus('loading');
      const response = await fetch('http://localhost:8000/api/v1/newsletter/subscribe', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(t('newsletter.error'));
      }

      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || data.message || t('newsletter.error'));

      setStatus('success');
      setMessage(t('newsletter.success'));
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{t('newsletter.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {t('newsletter.description')}
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                disabled={status === 'loading'}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'loading'}
                className={`px-6 py-3 rounded-lg font-medium text-white transition-colors
                  ${status === 'loading'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-500 hover:bg-indigo-600'
                  }`}
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  t('newsletter.button')
                )}
              </motion.button>
            </div>
          </form>

          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 text-sm ${
                  status === 'success' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Newsletter; 