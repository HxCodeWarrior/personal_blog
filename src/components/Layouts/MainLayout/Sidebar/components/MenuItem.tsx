// 菜单项
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import styles from '../Sidebar.module.scss';
import SubMenu from './SubMenu';
import { MenuItemProps } from '../types';

const MenuItem = ({ 
  item, 
  index, 
  isCollapsed,
  expandedItem,
  setExpandedItem,
  currentPath
}: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = expandedItem === index;

  // 优化性能：使用useCallback缓存处理函数
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback(() => {
    if (!isCollapsed) {
      setExpandedItem(isActive ? null : index);
    }
  }, [isCollapsed, isActive, index, setExpandedItem]);

  // 动画变体
  const menuItemVariants = {
    initial: { scale: 0.96, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { 
      scale: 0.96, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    hover: {
      scale: 1.02,
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    collapsed: { scale: 1.2, rotate: 0 },
    expanded: { scale: 1, rotate: isActive ? 360 : 0 },
    hover: { scale: 1.1 }
  };

  const titleVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const arrowVariants = {
    initial: { rotate: 0, opacity: 0.5 },
    animate: { 
      rotate: isActive ? 180 : 0,
      opacity: isHovered ? 1 : 0.5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className={styles.menuItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={menuItemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <motion.div
        className={`${styles.menuTitle} ${isActive ? styles.active : ''}`}
        onClick={handleClick}
        whileHover="hover"
        variants={menuItemVariants}
        animate={{
          color: isActive ? '#2196F3' : '#fff',
          paddingLeft: isCollapsed ? '0.5rem' : '1rem'
        }}
      >
        <motion.span 
          className={styles.icon}
          variants={iconVariants}
          animate={isCollapsed ? 'collapsed' : 'expanded'}
          whileHover="hover"
        >
          {item.icon}
        </motion.span>
        
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.span 
              className={styles.title}
              variants={titleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {item.title}
            </motion.span>
          )}
        </AnimatePresence>

        {!isCollapsed && (
          <motion.span 
            className={styles.arrow}
            variants={arrowVariants}
            initial="initial"
            animate="animate"
          >
            ▼
          </motion.span>
        )}

        {isHovered && !isCollapsed && (
          <motion.div 
            className={styles.hoverGlow}
            layoutId="hoverGlow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </motion.div>

      <SubMenu 
        isCollapsed={isCollapsed}
        isExpanded={isActive}
        subItems={item.subItems}
        currentPath={currentPath}
      />
    </motion.div>
  );
};

export default MenuItem;