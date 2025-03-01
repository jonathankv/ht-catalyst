import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function Signup({ locale }) {
  const { t } = useTranslation('common');
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, updateUserProfile } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(t('auth.signup.passwords_not_match'));
    }

    try {
      setError('');
      setLoading(true);
      const { user } = await signup(emailRef.current.value, passwordRef.current.value);
      
      // You can update the user profile here if needed
      // await updateUserProfile(user, { displayName: nameRef.current.value });
      
      router.push('/');
    } catch (error) {
      setError(t('auth.signup.error', { message: error.message }));
    }

    setLoading(false);
  }

  return (
    <Layout>
      <Head>
        <title>{t('auth.signup.title')}</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
              {t('auth.signup.title')}
            </h2>
          </div>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  {t('auth.signup.email_label')}
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={t('auth.signup.email_placeholder')}
                  ref={emailRef}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  {t('auth.signup.password_label')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="relative block w-full border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={t('auth.signup.password_placeholder')}
                  ref={passwordRef}
                />
              </div>
              <div>
                <label htmlFor="password-confirm" className="sr-only">
                  {t('auth.signup.confirm_password_label')}
                </label>
                <input
                  id="password-confirm"
                  name="password-confirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={t('auth.signup.confirm_password_placeholder')}
                  ref={passwordConfirmRef}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
              >
                {loading ? t('auth.signup.submitting') : t('auth.signup.submit_button')}
              </button>
            </div>
          </form>
          <div className="text-sm text-center">
            {t('auth.signup.have_account')}{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              {t('auth.signup.login_link')}
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 