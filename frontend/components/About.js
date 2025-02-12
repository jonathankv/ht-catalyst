import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from '../styles/About.module.css';

const About = () => {
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState('background');

  const tabs = {
    background: {
      title: t('about.background.title', 'Background'),
      content: t('about.background.content', `As a Product Manager with a passion for technology and social impact, 
      I bridge the gap between innovative solutions and human needs. My journey in 
      product management has been driven by a commitment to creating meaningful 
      digital experiences that make a difference.`)
    },
    expertise: {
      title: t('about.expertise.title', 'Expertise'),
      skills: [
        { name: t('about.expertise.skills.product_strategy', 'Product Strategy'), level: 90 },
        { name: t('about.expertise.skills.user_research', 'User Research'), level: 85 },
        { name: t('about.expertise.skills.agile', 'Agile Management'), level: 88 },
        { name: t('about.expertise.skills.analytics', 'Data Analytics'), level: 82 },
        { name: t('about.expertise.skills.technical', 'Technical Leadership'), level: 85 }
      ]
    },
    vision: {
      title: t('about.vision.title', 'Vision'),
      content: t('about.vision.content', `I believe in leveraging technology to create products that not only 
      solve problems but also contribute positively to society. My goal is to lead 
      product initiatives that combine innovation with social responsibility.`)
    }
  };

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

        <div className={styles.tabsContainer}>
          {Object.keys(tabs).map((tab) => (
            <motion.button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tabs[tab].title}
            </motion.button>
          ))}
        </div>

        <motion.div 
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={activeTab}
        >
          {activeTab === 'expertise' ? (
            <div className={styles.skillsContainer}>
              {tabs.expertise.skills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className={styles.skillItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.skillInfo}>
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className={styles.skillBar}>
                    <motion.div 
                      className={styles.skillProgress}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.p 
              className={styles.paragraph}
              variants={itemVariants}
            >
              {tabs[activeTab].content}
            </motion.p>
          )}
        </motion.div>

        <motion.div 
          className={styles.timeline}
          variants={itemVariants}
        >
          <div className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3>{t('about.timeline.present.year', '2023 - Present')}</h3>
              <p>{t('about.timeline.present.title', 'Senior Product Manager')}</p>
              <p>{t('about.timeline.present.description', 'Leading innovative product initiatives')}</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3>{t('about.timeline.past_1.year', '2020 - 2023')}</h3>
              <p>{t('about.timeline.past_1.title', 'Product Manager')}</p>
              <p>{t('about.timeline.past_1.description', 'Driving user-centered product development')}</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3>{t('about.timeline.past_2.year', '2018 - 2020')}</h3>
              <p>{t('about.timeline.past_2.title', 'Associate Product Manager')}</p>
              <p>{t('about.timeline.past_2.description', 'Building foundation in product management')}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About; 