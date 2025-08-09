import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

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
      <div className="max-w-5xl mx-auto px-4 py-24 space-y-16">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Mentoring</h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Learn with me through practical product and technology mentorship tailored to your goals.
          </p>
          <div className="pt-4">
            <Link
              href="/mentee/apply"
              className="inline-block px-6 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-500"
            >
              {t('nav.login')}
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Educational Skillsets</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((group) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
              >
                <h3 className="font-semibold text-lg mb-3">{group.title}</h3>
                <ul className="space-y-2 list-disc list-inside text-neutral-700 dark:text-neutral-300">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((tst) => (
              <motion.blockquote
                key={tst.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
              >
                <p className="text-neutral-800 dark:text-neutral-200">“{tst.quote}”</p>
                <footer className="mt-3 text-sm text-neutral-500">— {tst.name}</footer>
              </motion.blockquote>
            ))}
          </div>
        </section>
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


