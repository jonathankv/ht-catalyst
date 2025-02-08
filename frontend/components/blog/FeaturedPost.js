import Image from 'next/image';
import Link from 'next/link';

const FeaturedPost = ({ post }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-5xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Featured Post
            </span>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
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