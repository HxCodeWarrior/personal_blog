'use client'
import { FC, memo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from 'antd';
import styles from './SkillFilter.module.scss';

interface SkillFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { 
    id: 'all', 
    name: '全部',
    icon: '🎯',
    description: '查看所有技能'
  },
  { 
    id: 'frontend', 
    name: '前端',
    icon: '🎨',
    description: '前端开发技能'
  },
  { 
    id: 'backend', 
    name: '后端',
    icon: '⚙️',
    description: '后端开发技能'
  },
  { 
    id: 'devops', 
    name: 'DevOps',
    icon: '🔧',
    description: '开发运维技能'
  },
  { 
    id: 'design', 
    name: '设计',
    icon: '✨',
    description: 'UI/UX 设计技能'
  },
];

const SkillFilter: FC<SkillFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 添加鼠标跟踪光效
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      wrapper.style.setProperty('--mouse-x', `${x}%`);
      wrapper.style.setProperty('--mouse-y', `${y}%`);
    };

    wrapper.addEventListener('mousemove', handleMouseMove);
    return () => wrapper.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 优化按钮动画
  const buttonVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      rotateX: -15
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    }),
    hover: {
      y: -4,
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      y: 2
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className={styles.filterContainer}>
      <motion.div 
        ref={wrapperRef}
        className={styles.filterWrapper}
        initial={{ opacity: 0, y: 20, rotateX: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          transition: {
            duration: 0.6,
            ease: [0.215, 0.610, 0.355, 1.000]
          }
        }}
      >
        <AnimatePresence mode="wait">
          {categories.map((category, index) => (
            <Tooltip 
              key={category.id}
              title={category.description}
              placement="top"
              mouseEnterDelay={0.5}
            >
              <motion.button
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                exit="exit"
                custom={index}
                className={`${styles.filterButton} ${
                  selectedCategory === category.id ? styles.active : ''
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                <motion.span 
                  className={styles.icon}
                  animate={selectedCategory === category.id ? {
                    scale: 1.2,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  } : {
                    scale: 1
                  }}
                >
                  {category.icon}
                </motion.span>
                <span className={styles.text}>{category.name}</span>
                {selectedCategory === category.id && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </motion.button>
            </Tooltip>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default memo(SkillFilter); 