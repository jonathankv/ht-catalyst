import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import KnowledgeHub from '../components/KnowledgeHub';
import Newsletter from '../components/Newsletter';
import FloatingChat from '../components/FloatingChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-32 pb-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-8 leading-tight py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Welcome to My Knowledge Hub
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Discover insights on technology, personal growth, and making a positive impact
          </motion.p>
        </div>
      </motion.section>

      {/* Knowledge Hub Sections */}
      <KnowledgeHub />

      {/* Newsletter Section */}
      <Newsletter />

      <FloatingChat />
    </div>
  );
} 