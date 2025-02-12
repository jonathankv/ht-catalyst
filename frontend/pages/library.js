import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BookCard from '../components/library/BookCard';
import BookFilter from '../components/library/BookFilter';
import { books } from '../data/books';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Library() {
  const { t } = useTranslation('common');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredBook, setFeaturedBook] = useState(null);

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
      <div className="min-h-screen">
        {/* Hero Section with Featured Book */}
        {featuredBook && (
          <div className="relative bg-yellow-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="text-sm font-semibold uppercase tracking-wider">{t('library.latest_read')}</span>
                  <h1 className="text-4xl md:text-5xl font-bold">{featuredBook.title}</h1>
                  <p className="text-lg text-gray-700">{featuredBook.summary}</p>
                  <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                    {t('library.read_notes')}
                  </button>
                </div>
                <div className="relative h-[500px]">
                  <Image
                    src={featuredBook.coverImage}
                    alt={featuredBook.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('library.section_title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('library.section_description')}
            </p>
          </div>

          <BookFilter onFilterChange={setActiveFilter} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingCards />
              ) : (
                filteredBooks.map(book => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
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
      className="card p-6 animate-pulse"
    >
      <div className="aspect-w-3 aspect-h-4 mb-4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        <div className="space-y-2">
          {Array(3).fill(null).map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          ))}
        </div>
      </div>
    </div>
  ));
}; 