import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function BookCard({ book }) {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{book.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{book.author}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-3">
          {book.summary}
        </p>
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push(`/library/${book.id}`)}
            className="text-primary hover:text-primary-dark transition-colors"
          >
            {t('library.read_notes')} →
          </button>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-gray-600 dark:text-gray-400">{book.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 