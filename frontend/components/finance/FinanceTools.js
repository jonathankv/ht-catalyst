import { motion } from 'framer-motion';
import { useState } from 'react';

const FinanceTools = () => {
  const [activeTab, setActiveTab] = useState('calculator');

  const tools = [
    {
      id: 'calculator',
      name: 'Investment Calculator',
      description: 'Calculate returns on investments with different scenarios'
    },
    {
      id: 'budget',
      name: 'Budget Planner',
      description: 'Plan and track your monthly budget'
    },
    {
      id: 'goals',
      name: 'Financial Goals',
      description: 'Set and track your financial goals'
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Financial Tools</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Tools to help you make better financial decisions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="card cursor-pointer"
              onClick={() => setActiveTab(tool.id)}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tool.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 card">
          {activeTab === 'calculator' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Investment Calculator</h3>
              {/* Add calculator implementation */}
              <p>Calculator coming soon...</p>
            </div>
          )}
          {activeTab === 'budget' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Budget Planner</h3>
              {/* Add budget planner implementation */}
              <p>Budget planner coming soon...</p>
            </div>
          )}
          {activeTab === 'goals' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Financial Goals</h3>
              {/* Add goals implementation */}
              <p>Goals tracking coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FinanceTools; 