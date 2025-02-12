import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BookCard from '../components/library/BookCard';
import BookFilter from '../components/library/BookFilter';
import { books } from '../data/books';
import Image from 'next/image';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function Library() {
  const { t } = useTranslation('common');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredBook, setFeaturedBook] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Set the most recent book as featured
    setFeaturedBook(books[0]);
    
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = activeFilter === 'all'
        ? books.slice(1) // Exclude featured book
        : books.filter(book => book.category === activeFilter);
      setFilteredBooks(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [activeFilter]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section with Featured Book */}
        {featuredBook && (
          <div className="relative bg-gradient-to-r from-yellow-300 to-yellow-200 dark:from-yellow-400 dark:to-yellow-300">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block text-sm font-semibold uppercase tracking-wider bg-black text-white px-4 py-2 rounded-full"
                  >
                    {t('library.latest_read')}
                  </motion.span>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold leading-tight"
                  >
                    {featuredBook.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-700 leading-relaxed"
                  >
                    {featuredBook.summary}
                  </motion.p>
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors transform hover:scale-105 duration-200 shadow-lg"
                    onClick={() => router.push(`/library/${featuredBook.id}`)}
                  >
                    {t('library.read_notes')}
                  </motion.button>
                </div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                  className="relative h-[600px]"
                >
                  <Image
                    src={featuredBook.coverImage}
                    alt={featuredBook.title}
                    fill
                    className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">{t('library.section_title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t('library.section_description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <BookFilter onFilterChange={setActiveFilter} />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingCards />
              ) : (
                filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <BookCard book={book} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// This is crucial for translations to work
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const LoadingCards = () => {
  return Array(6).fill(null).map((_, index) => (
    <div 
      key={index}
      className="card p-8 animate-pulse"
    >
      <div className="aspect-w-3 aspect-h-4 mb-6 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 mb-6" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4" />
        <div className="space-y-2">
          {Array(3).fill(null).map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
          ))}
        </div>
      </div>
    </div>
  ));
}; 