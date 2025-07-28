import { motion } from 'framer-motion';

export default function ProjectFilter({ 
  categories = [], // Provide default empty array
  activeCategory = 'all', 
  onCategoryChange 
}) {
  // Ensure categories is always an array
  const categoryList = Array.isArray(categories) ? categories : [];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeCategory === 'all'
            ? 'bg-primary-700 text-white dark:bg-primary-600 dark:text-white hover:bg-primary-800 dark:hover:bg-primary-700'
            : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700'
        }`}
      >
        All Projects
      </button>
      {categoryList.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category
              ? 'bg-primary-700 text-white dark:bg-primary-600 dark:text-white hover:bg-primary-800 dark:hover:bg-primary-700'
              : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
} 