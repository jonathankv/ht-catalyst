import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaBook, FaBlog, FaPiggyBank, FaHeart } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

const Home = () => {
  const { t } = useTranslation('common');

  const sections = [
    {
      title: t('nav.library'),
      description: t('library.section_description'),
      icon: <FaBook className="w-6 h-6" />,
      href: '/library',
      image: '/images/books/list-of-books.jpg'
    },
    {
      title: t('nav.blog'),
      description: t('blog.description'),
      icon: <FaBlog className="w-6 h-6" />,
      href: '/blog',
      image: '/images/blog/blogs.jpg'
    },
    {
      title: t('nav.finance'),
      description: t('finance.description'),
      icon: <FaPiggyBank className="w-6 h-6" />,
      href: '/finance',
      image: '/images/finance/background.jpg'
    },
    {
      title: t('nav.impact'),
      description: t('impact.description'),
      icon: <FaHeart className="w-6 h-6" />,
      href: '/impact',
      image: '/images/hero/social-impact.jpeg'
    }
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
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
                <div className="card overflow-hidden h-[300px] relative">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-neutral-900/20 
                    group-hover:from-neutral-900/90 group-hover:to-neutral-900/30 transition-colors duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                    <p className="text-neutral-200">{section.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home; 