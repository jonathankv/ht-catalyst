import { useState } from 'react';
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
            <h1 className="text-3xl font-bold mb-4">No Posts Yet</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for new content!
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
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Thoughts on product management, technology, and social impact
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 mb-4 overflow-hidden rounded-t-lg">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {post.date} · {post.readTime}
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 