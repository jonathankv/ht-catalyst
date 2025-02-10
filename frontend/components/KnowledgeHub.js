import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBook, FaBlog, FaPiggyBank, FaHeart } from 'react-icons/fa';

const KnowledgeHub = () => {
  const sections = [
    {
      title: 'Library',
      description: 'Explore my curated collection of books and key insights',
      icon: <FaBook className="w-8 h-8" />,
      href: '/library',
      color: 'bg-amber-50 hover:bg-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Blog',
      description: 'Thoughts on product, impact, and personal growth',
      icon: <FaBlog className="w-8 h-8" />,
      href: '/blog',
      color: 'bg-blue-50 hover:bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Personal Finance',
      description: 'AI-powered tools for better financial management',
      icon: <FaPiggyBank className="w-8 h-8" />,
      href: '/finance',
      color: 'bg-green-50 hover:bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Impact',
      description: 'Discover and support meaningful charity projects',
      icon: <FaHeart className="w-8 h-8" />,
      href: '/impact',
      color: 'bg-rose-50 hover:bg-rose-100',
      iconColor: 'text-rose-600'
    }
  ];

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={section.href}>
              <div className={`p-8 rounded-2xl ${section.color} transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg cursor-pointer`}>
                <div className={`${section.iconColor} mb-6`}>
                  {section.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{section.title}</h3>
                <p className="text-gray-600 text-lg">{section.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default KnowledgeHub; 