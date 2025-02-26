import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaUser } from 'react-icons/fa';
import styles from '../styles/About.module.css';

const About = () => {
  const { t } = useTranslation('common');
  const [imageError, setImageError] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0
    }
  };

  // Professional summary sections for 2-column layout
  const mainSections = [
    {
      title: t('about.background.title'),
      content: t('about.background.content')
    },
    {
      title: t('about.expertise.title'),
      content: t('about.expertise.content')
    },
    {
      title: t('about.approach.title'),
      content: t('about.approach.content')
    }
  ];

  // Vision section (full width)
  const visionSection = {
    title: t('about.vision.title'),
    content: t('about.vision.content')
  };

  // Skills categories
  const skillCategories = [
    {
      name: t('about.skills.product', 'Product Management'),
      skills: ['Product Strategy', 'Roadmap Planning', 'User Research', 'Market Analysis', 'Product Analytics']
    },
    {
      name: t('about.skills.technical', 'Technical'),
      skills: ['Agile Methodologies', 'SQL & Data Analysis', 'API Design', 'JavaScript/React', 'Python']
    },
    {
      name: t('about.skills.leadership', 'Leadership'),
      skills: ['Team Management', 'Stakeholder Communication', 'Strategic Planning', 'Cross-functional Collaboration', 'Mentoring']
    }
  ];

  return (
    <section className={styles.aboutSection} id="about">
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2 
          className={styles.title}
          variants={itemVariants}
        >
          {t('about.title')}
        </motion.h2>

        <div className={styles.content}>
          <div className={styles.profileSection}>
            {/* Profile Header - Full Width Overview */}
            <div className={styles.profileHeader}>
              <div className={styles.profileImage}>
                {imageError ? (
                  <div className={styles.fallbackAvatar}>
                    <FaUser size={60} />
                  </div>
                ) : (
                  <Image 
                    src="/images/avatar/profile-avatar.jpg" 
                    alt={t('about.profile_image_alt', 'Profile')} 
                    width={150} 
                    height={150} 
                    className={styles.avatar}
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
              <div className={styles.profileContact}>
                <h3>{t('site.author', 'Kien (Jonathan) Vu Viet')}</h3>
                <p className={styles.jobTitle}>{t('about.job_title', 'Product Manager & Technology Leader')}</p>
                <div className={styles.socialLinks}>
                  <a href="https://www.linkedin.com/in/vuvietkien/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/jonathankv" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub />
                  </a>
                  <a href="mailto:vuvietkien.ptithcm@gmail.com" aria-label="Email">
                    <FaEnvelope />
                  </a>
                  <a href="/files/jonathan-vu-cv.pdf" download aria-label={t('about.download_cv_aria', 'Download CV')} className={styles.downloadButton}>
                    <FaDownload /> <span>{t('about.download_cv', 'Download CV')}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Professional Summary - 2 Columns */}
            <div className={styles.summarySection}>
              {mainSections.map((section, index) => (
                <motion.div 
                  key={index}
                  className={styles.summaryItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className={styles.summaryTitle}>{section.title}</h3>
                  <p className={styles.paragraph}>{section.content}</p>
                </motion.div>
              ))}
            </div>

            {/* Vision Section - Full Width */}
            <motion.div 
              className={styles.summaryItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className={styles.summaryTitle}>{visionSection.title}</h3>
              <p className={styles.paragraph}>{visionSection.content}</p>
            </motion.div>

            {/* Skills Overview */}
            <motion.div 
              className={styles.skillsOverview}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className={styles.skillsTitle}>{t('about.skills.title')}</h3>
              <div className={styles.skillsGrid}>
                {skillCategories.map((category, index) => (
                  <div key={index} className={styles.skillCategory}>
                    <h4 className={styles.categoryName}>{category.name}</h4>
                    <ul className={styles.skillsList}>
                      {category.skills.map((skill, i) => (
                        <li key={i} className={styles.skillItem}>
                          <span className={styles.skillBullet}>•</span> {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About; 