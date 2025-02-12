import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import CharityProject from '../components/impact/CharityProject';
import ProjectFilter from '../components/impact/ProjectFilter';
import { motion } from 'framer-motion';

// Sample projects data (in a real app, this would come from an API or database)
const projects = [
  {
    id: 1,
    title: 'Education for All',
    description: 'Providing quality education to underprivileged children through technology.',
    category: 'education',
    status: 'active',
    progress: 75,
    raised: 15000,
    goal: 20000,
    image: '/images/blog/default-cover.svg'
  },
  {
    id: 2,
    title: 'Clean Ocean Initiative',
    description: 'Developing innovative solutions to clean and protect our oceans.',
    category: 'environment',
    status: 'active',
    progress: 60,
    raised: 30000,
    goal: 50000,
    image: '/images/blog/default-cover.svg'
  },
  {
    id: 3,
    title: 'Healthcare Access',
    description: 'Bringing healthcare services to remote communities through telemedicine.',
    category: 'healthcare',
    status: 'active',
    progress: 40,
    raised: 20000,
    goal: 50000,
    image: '/images/blog/default-cover.svg'
  }
];

export default function Impact() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { t } = useTranslation('common');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <Layout>
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">{t('impact.title')}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('impact.description')}
            </p>
          </motion.div>

          <ProjectFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <CharityProject key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 