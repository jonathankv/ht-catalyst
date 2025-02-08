import { motion } from 'framer-motion';
import Image from 'next/image';

const CharityProject = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card overflow-hidden"
    >
      <div className="relative h-48">
        <Image
          src={project.image || '/images/blog/default-cover.svg'}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${
            project.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}>
            {project.status}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Raised: ${project.raised.toLocaleString()}
            </span>
            <span className="font-medium">
              Goal: ${project.goal.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="mt-6">
          <button className="btn-primary w-full">Support Project</button>
        </div>
      </div>
    </motion.div>
  );
};

export default CharityProject; 