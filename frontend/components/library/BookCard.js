import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const BookCard = ({ book }) => {
  return (
    <Link href={`/library/${book.id}`}>
      <article className="group space-y-4">
        {/* Category Label */}
        <div className="text-sm font-semibold uppercase tracking-wider text-gray-600">
          {book.category}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold group-hover:text-blue-600 transition-colors">
          {book.title}
        </h2>

        {/* Summary Preview */}
        <p className="text-xl text-gray-700 dark:text-gray-300 line-clamp-2">
          {book.summary}
        </p>

        {/* Book Cover Image */}
        <motion.div 
          className="relative aspect-[4/3] w-full overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src={book.coverImage} 
            alt={book.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </article>
    </Link>
  );
};

export default BookCard; 