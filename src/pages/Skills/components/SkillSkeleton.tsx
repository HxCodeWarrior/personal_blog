import { motion } from 'framer-motion';
import styles from './SkillSkeleton.module.scss';

const SkillSkeleton = () => {
  // 添加骨架屏动画变体
  const containerVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  // 添加内容动画变体
  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { 
      opacity: 0,
      y: 10
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    }
  };

  return (
    <motion.div 
      className={styles.skeletonCard}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className={styles.shimmerWrapper} />
      
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className={styles.iconSkeleton}
          variants={itemVariants}
        />
        
        <motion.div 
          className={styles.titleSkeleton}
          variants={itemVariants}
        />
        
        <motion.div 
          className={styles.progressSkeleton}
          variants={itemVariants}
        >
          <div className={styles.label} />
          <div className={styles.bar} />
        </motion.div>
        
        <motion.div 
          className={styles.descriptionSkeleton}
          variants={itemVariants}
        >
          <div className={styles.line} />
          <div className={styles.line} />
          <div className={styles.line} />
        </motion.div>
        
        <motion.div 
          className={styles.tagsSkeleton}
          variants={itemVariants}
        >
          {[1, 2, 3].map((_, index) => (
            <motion.div
              key={index}
              className={styles.tag}
              variants={itemVariants}
              custom={index}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SkillSkeleton; 