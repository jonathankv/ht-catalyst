import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import About from '../components/About';
import { FiTarget, FiClock, FiUsers, FiMessageSquare, FiCheck, FiCalendar, FiBriefcase, FiBookOpen, FiArrowRight, FiStar, FiTrendingUp } from 'react-icons/fi';
import { mentoringStats, mentoringSessions } from '../data/mentoring';

const skills = [
  {
    title: 'Product Management',
    items: ['Product strategy', 'Discovery & research', 'Roadmapping', 'OKRs'],
  },
  {
    title: 'Engineering Collaboration',
    items: ['Spec writing', 'Technical scoping', 'Prioritization', 'Delivery'],
  },
  {
    title: 'Career Growth',
    items: ['Interview prep', 'Portfolio feedback', 'Communication', 'Stakeholders'],
  },
];

const testimonials = [
  {
    name: 'Alex N.',
    quote:
      'Jonathan helped me create a clear roadmap and communicate effectively with engineering. I landed my first PM role.',
  },
  {
    name: 'Minh T.',
    quote: 'Actionable feedback and practical frameworks. The sessions were focused and motivating.',
  },
];

export default function MentoringPage({ locale }) {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <Head>
        <title>Mentoring</title>
      </Head>
      <div className="w-full">
        {/* Cover + Profile header */}
        <section className="relative">
          <div className="h-48 md:h-56 w-full bg-gradient-to-r from-primary-700 to-primary-500" />
          <div className="max-w-7xl mx-auto px-6">
            <div className="-mt-16 md:-mt-20 flex items-end gap-4">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full ring-4 ring-white dark:ring-neutral-900 overflow-hidden bg-white">
                <Image src="/images/avatar/profile-avatar.jpg" alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
              </div>
              <div className="pb-3">
                <h1 className="text-display-sm">Kien (Jonathan) Vu Viet</h1>
                <div className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">{t('mentoring.header.tagline')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs (static) */}
        <div className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex items-center gap-6 text-sm">
              <span className="py-4 border-b-2 border-neutral-900 dark:border-white font-medium">{t('mentoring.tabs.overview')}</span>
              <span className="py-4 text-neutral-500">{t('mentoring.tabs.reviews')}</span>
              <span className="py-4 text-neutral-500">{t('mentoring.tabs.achievements')}</span>
              <span className="py-4 text-neutral-500">{t('mentoring.tabs.group')}</span>
            </nav>
          </div>
        </div>

        {/* Two-column content */}
        <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">
          {/* Left: Overview */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
              <h2 className="text-body-lg font-medium mb-2">{t('mentoring.overview.title')}</h2>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{t('mentoring.overview.body')}</p>
              <div className="mt-4">
                <Link href="/mentee/apply" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-500">
                  {t('mentoring.apply.title')} <FiArrowRight />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
              <h3 className="text-base font-semibold mb-3">{t('mentoring.insights.title')}</h3>
              <div className="flex items-center gap-3 text-sm">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <FiStar className="text-yellow-500" /> {t('mentoring.insights.badge')}
                </div>
                <span className="text-neutral-500">{t('mentoring.insights.dateRange')}</span>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
              <h3 className="text-base font-semibold mb-3">{t('mentoring.background.title')}</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  t('mentoring.background.tags.product'),
                  t('mentoring.background.tags.ai'),
                  t('mentoring.background.tags.data'),
                  t('mentoring.background.tags.b2c'),
                  t('mentoring.background.tags.saas'),
                ].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">{tag}</span>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">{t('mentoring.background.core')}</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {skills.map((group) => (
                    <div key={group.title} className="rounded-md border border-neutral-200 dark:border-neutral-700 p-4">
                      <div className="font-medium mb-1">{group.title}</div>
                      <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2"><FiCheck className="mt-0.5" /> {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
              <h3 className="text-base font-semibold mb-3">{t('mentoring.testimonials.title')}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map((tst) => (
                  <blockquote key={tst.name} className="rounded-md border border-neutral-200 dark:border-neutral-700 p-4">
                    <p className="text-neutral-800 dark:text-neutral-200">“{tst.quote}”</p>
                    <footer className="mt-2 text-xs text-neutral-500">— {tst.name}</footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
              <h3 className="text-base font-semibold mb-3">{t('mentoring.sidebar.stats.title')}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><FiClock className="text-primary-600" /> <span>{mentoringStats.minutes} mins</span> <span className="text-neutral-500">{t('mentoring.sidebar.stats.minutesLabel')}</span></div>
                <div className="flex items-center gap-2"><FiTrendingUp className="text-primary-600" /> <span>{mentoringStats.sessionsCompleted}</span> <span className="text-neutral-500">{t('mentoring.sidebar.stats.sessionsLabel')}</span></div>
              </div>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
              <h3 className="text-base font-semibold mb-3">{t('mentoring.sidebar.sessions.title')}</h3>
              <div className="space-y-3">
                {mentoringSessions.map((s) => (
                  <div key={s.slug} className="border border-neutral-200 dark:border-neutral-700 rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-neutral-500">{s.duration} • {s.price}</div>
                      </div>
                      <Link href={s.bookingPath} className="px-3 py-1.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800">{t('mentoring.sidebar.sessions.book')}</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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


