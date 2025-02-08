import { motion } from 'framer-motion';

const ProjectFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'education', name: 'Education' },
    { id: 'environment', name: 'Environment' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'technology', name: 'Technology' }
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeFilter === filter.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilter; 