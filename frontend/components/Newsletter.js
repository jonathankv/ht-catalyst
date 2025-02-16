import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

export default function Newsletter() {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage('');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
            {t('newsletter.title')}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            {t('newsletter.description')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              className="flex-1 px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 
                focus:outline-none focus:ring-2 focus:ring-primary-500 
                dark:bg-neutral-800 dark:text-neutral-50
                placeholder-neutral-500 dark:placeholder-neutral-400"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`px-6 py-3 rounded-lg font-medium transition-colors
                ${status === 'loading'
                  ? 'bg-neutral-400 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600 dark:bg-primary-400 dark:hover:bg-primary-500'
                } text-white`}
            >
              {status === 'loading' ? 'Subscribing...' : t('newsletter.button')}
            </button>
          </div>
          {status === 'error' && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          )}
          {status === 'success' && (
            <p className="mt-2 text-sm text-primary-600 dark:text-primary-400">
              {t('newsletter.success')}
            </p>
          )}
        </form>
      </div>
    </section>
  );
} 