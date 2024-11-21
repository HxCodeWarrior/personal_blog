'use client'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import SkillCard from '@/Skills/components/SkillCard';
import SkillFilter from '@/Skills/components/SkillFilter';
import SkillSkeleton from '@/Skills/components/SkillSkeleton';
import { skillsData } from '@/data/skillsData';
import styles from '@/Skills/Skills.module.scss';

const SkillsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 页面容器动画
  const pageVariants = {
    initial: { 
      opacity: 0,
      scale: 0.98
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.610, 0.355, 1.000],
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.5
      }
    }
  };

  // 内容网格动画
  const gridVariants = {
    initial: { 
      opacity: 0,
      y: 40
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.610, 0.355, 1.000],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // 处理滚动效果
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 50);
  }, []);
  
  useEffect(() => {
    const preparePageData = async () => {
      setPageReady(false);
      setLoading(true);
      
      // 模拟数据加载
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
      
      requestAnimationFrame(() => {
        setPageReady(true);
      });
    };

    preparePageData();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const filteredSkills = selectedCategory === 'all' 
    ? skillsData
    : skillsData.filter(skill => skill.category === selectedCategory);

  return (
    <LayoutGroup>
      <motion.div 
        className={styles.skillsContainer}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* 背景装饰 */}
        <div className={styles.backgroundDecoration}>
          <div className={styles.gradientOrb} />
          <div className={styles.gridPattern} />
          <div className={styles.glowEffect} />
        </div>

        <motion.div
          className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.8,
              ease: [0.215, 0.610, 0.355, 1.000]
            }
          }}
        >
          <motion.h1 
            className={styles.title}
            animate={scrolled ? { scale: 0.9 } : { scale: 1 }}
          >
            <span className={styles.titleHighlight}>技能</span>
            <span className={styles.titleDivider}>&</span>
            <span className={styles.titleSecondary}>专长</span>
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            animate={scrolled ? { opacity: 0.8 } : { opacity: 1 }}
          >
            探索我的技术栈和专业领域
          </motion.p>
        </motion.div>

        <SkillFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <AnimatePresence mode="wait">
          {pageReady && (
            <motion.div 
              className={styles.skillsGrid}
              variants={gridVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {loading ? (
                <div className={styles.skeletonGrid}>
                  {Array(6).fill(null).map((_, index) => (
                    <SkillSkeleton key={`skeleton-${index}`} />
                  ))}
                </div>
              ) : (
                <AnimatePresence>
                  {filteredSkills.map((skill, index) => (
                    <SkillCard 
                      key={skill.id} 
                      skill={skill}
                      custom={index}
                    />
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
};

export default SkillsPage;
