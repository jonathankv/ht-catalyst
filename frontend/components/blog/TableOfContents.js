import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 400);
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0% -80% 0%',
        threshold: [0, 0.5, 1]
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`rounded-lg transition-all duration-300 ${
        isSticky 
          ? 'bg-neutral-25/80 dark:bg-neutral-900/80 backdrop-blur-lg shadow-lg border border-neutral-200/50 dark:border-neutral-700/50'
          : ''
      }`}
    >
      <div className="p-4">
        <h2 className="font-medium text-neutral-900 dark:text-neutral-50 mb-4">
          Table of Contents
        </h2>
        <div className="border-l border-neutral-200 dark:border-neutral-700">
          <ul className="space-y-2">
            {headings.map(({ id, text, level }) => (
              <li
                key={id}
                style={{ paddingLeft: `${(level - 2) * 12}px` }}
              >
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={`block pl-3 -ml-px border-l-2 pr-2 py-1.5 text-sm transition-all duration-200 ease-in-out
                    hover:text-primary-700 dark:hover:text-primary-300 
                    ${activeId === id
                      ? 'text-primary-700 dark:text-primary-300 border-primary-700 dark:border-primary-300 font-medium bg-primary-50/50 dark:bg-primary-900/20 rounded-r-lg'
                      : 'text-neutral-600 dark:text-neutral-400 border-transparent'
                    }`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
} 