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
    <div className="border-b border-gray-200 dark:border-gray-700">
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
                ? 'border-primary-500 text-primary-500 dark:border-primary-400 dark:text-primary-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}
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