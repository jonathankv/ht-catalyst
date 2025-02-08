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
    <div className="border-b border-gray-200">
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
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
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