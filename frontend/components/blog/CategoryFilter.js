import { useState } from 'react';

const CategoryFilter = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'product', label: 'Product Management' },
    { id: 'impact', label: 'Social Impact' },
    { id: 'projects', label: 'Side Projects' },
    { id: 'family', label: 'Family' },
    { id: 'growth', label: 'Personal Growth' }
  ];

  return (
    <div className="border-b border-gray-200">
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
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
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