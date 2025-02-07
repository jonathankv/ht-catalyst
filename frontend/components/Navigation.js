import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Navigation.module.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Impact', href: '#impact' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav 
      className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <Link href="/">
          <motion.div 
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            PM
          </motion.div>
        </Link>

        <div className={styles.desktopMenu}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <span className={styles.navItem}>{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.button
          className={styles.mobileMenuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.button>
      </div>

      <motion.div 
        className={styles.mobileMenu}
        initial={false}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={item.href}>
              <span className={styles.mobileNavItem}>{item.name}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Navigation; 