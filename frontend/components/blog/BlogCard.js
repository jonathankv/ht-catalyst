import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Blog card component
 * Displays a preview of a blog post with image, title, and excerpt
 * Features hover animations and responsive design
 * @param {Object} props - Component properties
 * @param {Object} props.post - Blog post data
 * @param {string} props.post.slug - Post URL slug
 * @param {string} props.post.title - Post title
 * @param {string} props.post.excerpt - Post excerpt
 * @param {string} props.post.coverImage - Post cover image URL
 * @param {string} props.post.date - Formatted post date
 * @param {string} props.post.readTime - Formatted read time
 * @param {string} props.post.category - Post category
 * @returns {JSX.Element} Blog post card
 */
const BlogCard = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Category Label */}
        <div className="px-6 pt-4 text-sm font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
          {post.category}
        </div>

        {/* Cover Image */}
        <div className="px-6 pt-2 pb-4">
          <motion.div 
            className="relative aspect-[16/9] w-full overflow-hidden rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </div>

        {/* Title and Excerpt */}
        <div className="px-6 pb-2 space-y-2">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {post.title}
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        {/* Metadata */}
        <div className="px-6 pb-4 flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard; 