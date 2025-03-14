import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaBook, FaBlog, FaPiggyBank, FaHeart, FaBookmark } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

/**
 * Main Resource Library page component
 * Combines hero section, featured content, and call-to-action elements
 * Fully responsive and animated with Framer Motion
 * @returns {JSX.Element} Complete Resource Library page layout
 */
function ResourceLibrary({ variant = 'image', className = '' }) {
  const { t } = useTranslation('common');

  const sections = [
    {
      title: t('nav.library'),
      description: t('library.section_description'),
      icon: <FaBook className={variant === 'image' ? 'w-6 h-6' : 'w-8 h-8'} />,
      href: '/library',
      image: '/images/books/list-of-books.jpg',
      color: 'bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50',
      iconColor: 'text-amber-600 dark:text-amber-500',
      category: 'Tech',
      readTime: 15
    },
    {
      title: t('nav.blog'),
      description: t('blog.description'),
      icon: <FaBlog className={variant === 'image' ? 'w-6 h-6' : 'w-8 h-8'} />,
      href: '/blog',
      image: '/images/blog/blogs.jpg',
      color: 'bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50',
      iconColor: 'text-blue-600 dark:text-blue-500',
      category: 'Product',
      readTime: 12
    },
    {
      title: t('nav.finance'),
      description: t('finance.description'),
      icon: <FaPiggyBank className={variant === 'image' ? 'w-6 h-6' : 'w-8 h-8'} />,
      href: '/finance',
      image: '/images/finance/background.jpg',
      color: 'bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-950/50',
      iconColor: 'text-green-600 dark:text-green-500',
      category: 'Finance',
      readTime: 10
    },
    {
      title: t('nav.impact'),
      description: t('impact.description'),
      icon: <FaHeart className={variant === 'image' ? 'w-6 h-6' : 'w-8 h-8'} />,
      href: '/impact',
      image: '/images/hero/social-impact.jpeg',
      color: 'bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50',
      iconColor: 'text-rose-600 dark:text-rose-500',
      category: 'Strategy',
      readTime: 18
    }
  ];

  // Modern card layout (inspired by the image)
  const renderModernCards = () => (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">{t('library.title')}</h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={section.href}>
              <div className="bg-white dark:bg-neutral-950 rounded-xl p-6 h-full flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors duration-300 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 shadow-sm hover:shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full 
                    ${section.title === t('nav.library') ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' : 
                      section.title === t('nav.blog') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 
                      section.title === t('nav.finance') ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 
                      'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300'}`}>
                    {t(`category.${section.category.toLowerCase()}`, section.category)}
                  </span>
                  <button className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors">
                    <FaBookmark />
                  </button>
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">{section.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-grow">{section.description}</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">{section.readTime} {t('common.minRead', 'min read')}</span>
                  <span className="text-primary-600 dark:text-blue-400 text-sm font-medium">{t('common.readMore', 'Read more')}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Image-based card layout (original ResourceLibrary component)
  const renderImageCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Link href={section.href}>
            <div className="card overflow-hidden h-[300px] relative border-0 dark:bg-transparent">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-neutral-900/30 
                group-hover:from-neutral-900/95 group-hover:to-neutral-900/40 transition-colors duration-300 
                dark:from-black/95 dark:to-black/50 dark:group-hover:from-black/95 dark:group-hover:to-black/60" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">{section.title}</h3>
                <p className="text-neutral-100 group-hover:text-white transition-colors duration-300">{section.description}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );

  // Color-based card layout (original KnowledgeHub component)
  const renderColorCards = () => (
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
  );

  const containerClasses = variant === 'image' 
    ? "py-24 bg-neutral-25 dark:bg-neutral-950" 
    : "py-8 px-4";

  return (
    <section className={`${containerClasses} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {variant === 'modern' 
          ? renderModernCards() 
          : variant === 'image' 
            ? renderImageCards() 
            : renderColorCards()}
      </div>
    </section>
  );
}

export default ResourceLibrary;