import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useState } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

/**
 * My Learning page component
 * Displays user profile, course overview, recommendations, and progress tracking
 * @returns {JSX.Element} My Learning page
 */
const MyLearning = () => {
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState('in-progress');
  
  // Mock data for courses - in a real app, this would come from an API
  const inProgressCourses = [
    {
      id: 1,
      title: 'AI Python for Beginners',
      description: 'Learn Python programming with AI assistance. Gain skills writing, testing, and debugging code efficiently, and create real-world AI applications.',
      provider: 'DeepLearning.AI',
      providerLogo: '/images/deeplearning-ai-logo.png',
      tags: ['Generative Models', 'Prompt Engineering'],
      progress: 55,
      recentlyAccessed: true,
    },
    {
      id: 2,
      title: 'Finetuning Large Language Models',
      description: 'Discover when to use finetuning vs prompting for LLMs. Select suitable models and prepare training data effectively.',
      provider: 'Lamini',
      providerLogo: '/images/lamini-logo.png',
      tags: ['Deep Learning', 'Fine-Tuning'],
      progress: 30,
    },
    {
      id: 3,
      title: 'Vector Databases: from Embeddings to Applications',
      description: 'Design and execute real-world applications of vector databases. Build efficient systems for various use cases.',
      provider: 'Weaviate',
      providerLogo: '/images/weaviate-logo.png',
      tags: ['Embeddings', 'GenAI Applications'],
      progress: 15,
    }
  ];
  
  const completedCourses = [
    {
      id: 4,
      title: 'Pair Programming with Language Models',
      description: 'Learn how to program effectively with AI assistance. Improve, debug, and test your code with AI pair programming.',
      provider: 'Google',
      providerLogo: '/images/google-logo.png',
      tags: ['AI in Software Dev'],
      completedDate: '2024-03-01',
    }
  ];

  return (
    <>
      <Head>
        <title>{t('learning.meta.title')}</title>
        <meta name="description" content={t('learning.meta.description')} />
      </Head>

      <div className="min-h-screen pt-24 pb-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              {t('learning.title', 'DeepLearning.AI Short Courses')}
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              {t('learning.description', 'Expand your AI knowledge with our curated short courses')}
            </p>
          </motion.div>

          {/* Course Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="w-full md:w-auto">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                  {t('learning.course_available', 'Course Available')}
                </h2>
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('learning.search_placeholder', 'Search for courses or type topic to filter by topic')}
                    className="w-full py-3 px-4 pl-10 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Course Listing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            {/* Tabs */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-700 mb-8">
              <button
                onClick={() => setActiveTab('in-progress')}
                className={`py-2 px-4 font-medium text-sm ${
                  activeTab === 'in-progress'
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {t('learning.tabs.in_progress', 'In progress')} 
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {inProgressCourses.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-2 px-4 font-medium text-sm ${
                  activeTab === 'completed'
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {t('learning.tabs.completed', 'Completed')}
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
                  {completedCourses.length}
                </span>
              </button>
            </div>

            {/* Course Cards */}
            <div className="space-y-6">
              {activeTab === 'in-progress' && inProgressCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  type="in-progress" 
                />
              ))}
              
              {activeTab === 'completed' && completedCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  type="completed" 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

/**
 * Course Card Component
 * Displays information about a course
 * @param {Object} props - Component props
 * @param {Object} props.course - Course data
 * @param {string} props.type - Card type (in-progress or completed)
 * @returns {JSX.Element} Course card
 */
const CourseCard = ({ course, type }) => {
  const { t } = useTranslation('common');
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Course Info */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
              {course.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              {course.description}
            </p>
            
            {/* Provider and Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center">
                <div className="w-6 h-6 mr-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                  {/* Provider logo would go here */}
                </div>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {course.provider}
                </span>
              </div>
              
              {course.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Progress Bar (for in-progress courses) */}
            {type === 'in-progress' && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {course.progress}% {t('learning.progress_complete', 'complete')}
                  </span>
                  {course.recentlyAccessed && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {t('learning.recently_accessed', 'Recently Accessed')}
                    </span>
                  )}
                </div>
                <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Completed Date (for completed courses) */}
            {type === 'completed' && course.completedDate && (
              <div className="mb-4">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {t('learning.completed_on', 'Completed on')}: {new Date(course.completedDate).toLocaleDateString()}
                </span>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {type === 'in-progress' ? (
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                  {t('learning.continue', 'Continue')}
                </button>
              ) : (
                <button className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 rounded-md transition-colors">
                  {t('learning.review', 'Review')}
                </button>
              )}
              
              <button className="px-4 py-2 flex items-center gap-2 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md transition-colors">
                {t('learning.view_syllabus', 'View Syllabus')}
                <FiChevronDown className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Show More Section */}
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            {expanded ? t('learning.show_less', 'Show Less') : t('learning.show_more', 'Show More')}
            <FiChevronDown className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default MyLearning;