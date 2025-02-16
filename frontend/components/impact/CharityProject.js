import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CharityProject({ project, isActive }) {
  const progressPercentage = (project.currentAmount / project.goalAmount) * 100;

  return (
    <div
      className={`p-6 rounded-xl transition-all duration-300 ${
        isActive
          ? 'bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-500 dark:ring-primary-400'
          : 'bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 shadow-sm'
      }`}
    >
      <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50">{project.title}</h3>
      <p className="text-neutral-700 dark:text-neutral-300 mb-4">{project.description}</p>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-700 dark:text-neutral-300">Progress</span>
          <span className="text-neutral-700 dark:text-neutral-300">{progressPercentage.toFixed(1)}%</span>
        </div>
        
        <div className="relative">
          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 dark:bg-primary-400 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-neutral-700 dark:text-neutral-300">
            ${project.currentAmount.toLocaleString()} raised
          </span>
          <span className="font-medium text-primary-600 dark:text-primary-300">
            Goal: ${project.goalAmount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button className="flex-1 px-4 py-2 bg-primary-800 hover:bg-primary-900 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
          Donate Now
        </button>
        <button className="flex-1 px-4 py-2 border-2 border-primary-700 dark:border-primary-600 text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium rounded-lg transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
}