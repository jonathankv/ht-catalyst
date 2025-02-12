import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBook, FaBlog, FaPiggyBank, FaHeart } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

const KnowledgeHub = () => {
  const { t } = useTranslation('common');

  const sections = [
    {
      title: t('nav.library'),
      description: t('library.section_description'),
      icon: <FaBook className="w-8 h-8" />,
      href: '/library',
      color: 'bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50',
      iconColor: 'text-amber-600 dark:text-amber-500'
    },
    {
      title: t('nav.blog'),
      description: t('blog.description'),
      icon: <FaBlog className="w-8 h-8" />,
      href: '/blog',
      color: 'bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50',
      iconColor: 'text-blue-600 dark:text-blue-500'
    },
    {
      title: t('nav.finance'),
      description: t('finance.description'),
      icon: <FaPiggyBank className="w-8 h-8" />,
      href: '/finance',
      color: 'bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-950/50',
      iconColor: 'text-green-600 dark:text-green-500'
    },
    {
      title: t('nav.impact'),
      description: t('impact.description'),
      icon: <FaHeart className="w-8 h-8" />,
      href: '/impact',
      color: 'bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50',
      iconColor: 'text-rose-600 dark:text-rose-500'
    }
  ];

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={section.href}>
              <div className={`p-8 rounded-2xl ${section.color} transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-lg/30 cursor-pointer`}>
                <div className={`${section.iconColor} mb-6`}>
                  {section.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{section.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">{section.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default KnowledgeHub; 