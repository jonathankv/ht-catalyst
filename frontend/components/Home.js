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
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative"
          >
            <Link href={section.href}>
              <div className="relative overflow-hidden rounded-2xl h-[300px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/40 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-white mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{section.title}</h3>
                    <p className="text-white/90 text-lg max-w-sm line-clamp-2">{section.description}</p>
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="flex items-center text-white group-hover:text-white/90 transition-colors">
                    <span className="text-sm font-medium mr-2">{t('common.explore')}</span>
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: 5 }}
                      transition={{ 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        duration: 0.8 
                      }}
                      className="font-medium"
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Home; 