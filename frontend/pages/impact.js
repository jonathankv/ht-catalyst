import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Layout from '../components/Layout';
import CharityProject from '../components/impact/CharityProject';
import ProjectFilter from '../components/impact/ProjectFilter';
import { motion } from 'framer-motion';
import { getTranslatedStaticProps } from '../utils/translationUtils';

// Sample projects data (in a real app, this would come from an API or database)
const projects = [
  {
    id: 1,
    title: 'Education for All',
    description: 'Providing quality education to underprivileged children through technology.',
    category: 'education',
    currentAmount: 15000,
    goalAmount: 20000,
    image: '/images/projects/education.jpg'
  },
  {
    id: 2,
    title: 'Clean Ocean Initiative',
    description: 'Developing innovative solutions to clean and protect our oceans.',
    category: 'environment',
    currentAmount: 30000,
    goalAmount: 50000,
    image: '/images/projects/ocean.jpg'
  },
  {
    id: 3,
    title: 'Healthcare Access',
    description: 'Bringing healthcare services to remote communities through telemedicine.',
    category: 'healthcare',
    currentAmount: 20000,
    goalAmount: 50000,
    image: '/images/projects/healthcare.jpg'
  }
];

// Extract unique categories from projects
const categories = [...new Set(projects.map(project => project.category))];

export default function Impact({ locale }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const { t } = useTranslation('common');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <Layout>
      <Head>
        <title>{t('impact.title')} | {t('site.title')}</title>
        <meta name="description" content={t('impact.description')} />
      </Head>
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-primary-25 dark:bg-neutral-900"> {/* background_color: primary-25 is the light blue color */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-display mb-4 text-neutral-900 dark:text-white">
              {t('impact.title')}
            </h1>
            <p className="text-body-lg text-neutral-700 dark:text-neutral-100 max-w-3xl mx-auto">
              {t('impact.description')}
            </p>
          </motion.div>

          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            locale={locale}
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <CharityProject 
                key={project.id} 
                project={project}
                isActive={activeCategory === project.category}
                locale={locale}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-700 dark:text-neutral-100">
                {t('impact.no_projects')}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return getTranslatedStaticProps(locale);
} 