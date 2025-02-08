import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const BlogCard = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group space-y-4">
        {/* Category Label */}
        <div className="text-sm font-semibold uppercase tracking-wider text-gray-600">
          {post.category}
        </div>

        {/* Cover Image */}
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

        {/* Title and Excerpt */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard; 