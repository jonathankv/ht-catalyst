import { useState } from 'react';
import { motion } from 'framer-motion';

const BookFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Books' },
    { id: 'recent', label: 'Recent Reads' },
    { id: 'favorites', label: 'My Favorites' },
    { id: 'business', label: 'Business' },
    { id: 'science', label: 'Science' },
    { id: 'society', label: 'Society' }
  ];

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-700">
      <div className="flex overflow-x-auto py-4 gap-8 no-scrollbar">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => {
              setActiveFilter(filter.id);
              onFilterChange(filter.id);
            }}
            className={`
              whitespace-nowrap text-base font-medium pb-4 border-b-2 transition-colors
              ${activeFilter === filter.id 
                ? 'border-primary-600 text-primary-700 dark:border-primary-400 dark:text-primary-300' 
                : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-600'}
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookFilter; 