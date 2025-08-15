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
      className="bg-neutral-25 dark:bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
        <h3 className="text-heading-sm mb-2 text-neutral-900 dark:text-neutral-50">{book.title}</h3>
        <p className="text-body-sm text-neutral-600 dark:text-neutral-300 mb-4">{book.author}</p>
        <p className="text-caption text-neutral-500 dark:text-neutral-400 mb-6 line-clamp-3">
          {book.summary}
        </p>
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push(`/library/${book.id}`)}
            className="text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 text-ui transition-colors"
          >
            {t('library.read_notes')} →
          </button>
          <div className="flex items-center">
            <span className="text-primary-500">★</span>
            <span className="ml-1 text-neutral-600 dark:text-neutral-300">{book.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 