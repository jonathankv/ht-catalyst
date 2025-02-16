import Image from 'next/image';
import Link from 'next/link';

const FeaturedPost = ({ post }) => {
  return (
    <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-neutral-800 dark:to-neutral-900">
      <div className="max-w-5xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-300">
              Featured Post
            </span>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">{post.title}</h1>
            <p className="text-xl text-neutral-700 dark:text-neutral-200">
              {post.excerpt}
            </p>
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-block bg-primary-700 text-neutral-50 px-6 py-3 rounded-full hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
            >
              Read More
            </Link>
          </div>
          <div className="relative h-[400px]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost; 