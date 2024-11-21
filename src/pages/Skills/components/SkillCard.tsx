'use client'
import { FC, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from 'antd';
import styles from './SkillCard.module.scss';
import { Skill } from '@/types/skill';

interface SkillCardProps {
  skill: Skill;
  custom?: number;
}

const SkillCard: FC<SkillCardProps> = ({ skill, custom = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  const cardVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      rotateX: -10,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.610, 0.355, 1.000],
        delay: custom * 0.1
      }
    },
    hover: {
      y: -8,
      rotateX: 5,
      scale: 1.02,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2 + (custom * 0.1)
      }
    }
  };

  return (
    <motion.div 
      className={styles.card}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      custom={custom}
    >
      {/* 背景装饰 */}
      <div className={styles.cardBackground}>
        <div className={styles.gradientOrb} />
        <div className={styles.gridPattern} />
      </div>
      
      <motion.div 
        className={styles.content}
        variants={contentVariants}
      >
        <motion.div 
          className={styles.iconWrapper}
          whileHover={{ scale: 1.1 }}
        >
          <div className={styles.iconGlow} />
          <span className={styles.iconContent}>{skill.icon}</span>
        </motion.div>

        <motion.h3 className={styles.title}>
          {skill.name}
        </motion.h3>

        <motion.div className={styles.proficiencyWrapper}>
          <div className={styles.proficiencyLabel}>
            <span>熟练度</span>
            <span className={styles.value}>{skill.proficiency}%</span>
          </div>
          <div className={styles.progressBar}>
            <motion.div 
              className={styles.progress}
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ 
                duration: 1, 
                ease: "easeOut",
                delay: 0.2 + (custom * 0.1)
              }}
            />
          </div>
        </motion.div>

        <motion.p className={styles.description}>
          {skill.description}
        </motion.p>

        <motion.div className={styles.tags}>
          {skill.tags.map((tag, index) => (
            <motion.span
              key={tag}
              className={styles.tag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3 + (custom * 0.1) + (index * 0.05),
                duration: 0.4 
              }}
              whileHover={{ y: -2, scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SkillCard; 