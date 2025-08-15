import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import axios from 'axios';

export default function Profile({ locale }) {
  const { t } = useTranslation('common');
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    async function fetchApplications() {
      if (!currentUser?.email) {
        setLoadingApps(false);
        return;
      }
      try {
        const token = await currentUser.getIdToken();
        const res = await axios.get(`${API_BASE}/mentoring/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingApps(false);
      }
    }
    fetchApplications();
  }, [currentUser?.email]);

  async function handleLogout() {
    setError('');

    try {
      await logout();
      router.push('/login');
    } catch {
      setError(t('auth.profile.error'));
    }
  }

  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>{t('auth.profile.title')}</title>
        </Head>
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="w-full max-w-md space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="mt-6 text-center text-display-sm">
                {t('auth.profile.title')}
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
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-body-lg font-medium text-gray-900">
                  {t('auth.profile.user_info_title')}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {t('auth.profile.user_info_description')}
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">{t('auth.profile.email_label')}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUser?.email}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">{t('auth.profile.email_verified_label')}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {currentUser?.emailVerified ? t('auth.profile.yes') : t('auth.profile.no')}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Mentoring applications */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-body-lg font-medium text-gray-900">Mentoring Applications</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Your submissions and current status.</p>
              </div>
              <div className="border-t border-gray-200">
                {loadingApps ? (
                  <div className="px-4 py-5 sm:px-6 text-sm text-gray-500">Loading...</div>
                ) : applications.length === 0 ? (
                  <div className="px-4 py-5 sm:px-6 text-sm text-gray-500">No applications yet.</div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {applications.map((app) => (
                      <li key={app.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{app.full_name || currentUser?.email}</p>
                            <p className="mt-1 text-sm text-gray-500">Submitted: {new Date(app.created_at).toLocaleString()}</p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${app.status === 'accepted' ? 'bg-green-100 text-green-800' : app.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {app.status}
                          </span>
                        </div>
                        {app.goals ? (
                          <p className="mt-2 text-sm text-gray-700">Goals: {app.goals}</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('auth.profile.logout_button')}
              </button>
            </div>
          </motion.div>
        </div>
      </Layout>
    </ProtectedRoute>
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