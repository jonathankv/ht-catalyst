import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    );

    // Observe all section headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Adjust this value based on your header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24 ml-8 hidden xl:block"
      aria-label="Table of contents"
    >
      <div className="space-y-1 text-sm">
        <p className="font-medium text-gray-900 dark:text-gray-100 mb-4">
          Table of Contents
        </p>
        <ul className="space-y-3 border-l border-gray-200 dark:border-gray-700">
          {headings.map(({ id, text, level }) => (
            <li key={id} style={{ paddingLeft: `${(level - 2) * 12}px` }}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`block pl-3 -ml-px border-l-2 pr-2 py-1 transition-colors duration-200 ease-in-out hover:text-primary-600 dark:hover:text-primary-400 ${
                  activeId === id
                    ? 'text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
} 