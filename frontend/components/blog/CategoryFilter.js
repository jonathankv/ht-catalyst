import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const CategoryFilter = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { t } = useTranslation('common');

  const categories = [
    { id: 'all', label: t('blog.categories.all') },
    { id: 'product', label: t('blog.categories.product') },
    { id: 'impact', label: t('blog.categories.impact') },
    { id: 'projects', label: t('blog.categories.projects') },
    { id: 'family', label: t('blog.categories.family') },
    { id: 'growth', label: t('blog.categories.growth') }
  ];

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-700">
      <div className="flex overflow-x-auto py-4 gap-8 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setActiveCategory(category.id);
              onCategoryChange(category.id);
            }}
            className={`
              whitespace-nowrap text-base font-medium pb-4 border-b-2 transition-colors
              ${activeCategory === category.id 
                ? 'border-primary-700 text-primary-700 dark:border-primary-400 dark:text-primary-300' 
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-600'}
            `}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter; 