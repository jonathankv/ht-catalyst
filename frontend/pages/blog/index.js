import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../components/Layout';
import BlogCard from '../../components/blog/BlogCard';
import CategoryFilter from '../../components/blog/CategoryFilter';
import FeaturedPost from '../../components/blog/FeaturedPost';
import { posts } from '../../data/posts';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(posts.slice(1));
  const featuredPost = posts[0];
  const { t } = useTranslation('common');

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    const filtered = category === 'all'
      ? posts.slice(1)
      : posts.filter(post => post.category === category && post.id !== featuredPost.id);
    setFilteredPosts(filtered);
  };

  if (!posts || posts.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-heading-xl mb-4">{t('blog.no_posts_title')}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('blog.no_posts_description')}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

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
            <h1 className="text-heading-xl mb-4">{t('blog.title')}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('blog.description')}
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
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