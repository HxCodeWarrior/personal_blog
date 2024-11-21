// 子菜单
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCallback } from 'react';
import styles from '../Sidebar.module.scss';
import { SubMenuProps } from '../types';

const SubMenu = ({ 
  isCollapsed, 
  isExpanded, 
  subItems, 
  currentPath 
}: SubMenuProps) => {
  // 动画变体
  const subMenuVariants = {
    initial: { 
      height: 0, 
      opacity: 0,
      transition: { duration: 0.3 }
    },
    animate: { 
      height: 'auto', 
      opacity: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const itemVariants = {
    initial: { 
      x: -20, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { 
      x: -20, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    hover: {
      x: 10,
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      transition: { duration: 0.2 }
    }
  };

  // 优化性能：使用useCallback缓存渲染子项函数
  const renderSubItem = useCallback((subItem: any) => {
    const isActive = currentPath === subItem.path;
    
    return (
      <Link 
        key={subItem.title} 
        href={subItem.path}
        className={styles.subItemLink}
      >
        <motion.div
          className={`${styles.subItem} ${isActive ? styles.active : ''}`}
          variants={itemVariants}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
          layout
        >
          <motion.span 
            className={styles.icon}
            animate={{
              color: isActive ? '#2196F3' : '#fff',
              scale: isActive ? 1.1 : 1
            }}
            whileHover={{ scale: 1.1 }}
          >
            {subItem.icon}
          </motion.span>
          
          <motion.span 
            className={styles.title}
            animate={{
              color: isActive ? '#2196F3' : 'inherit'
            }}
          >
            {subItem.title}
          </motion.span>
          
          {isActive && (
            <motion.div 
              className={styles.activeIndicator}
              layoutId="activeIndicator"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            />
          )}
        </motion.div>
      </Link>
    );
  }, [currentPath]);

  return (
    <AnimatePresence mode="wait">
      {isExpanded && !isCollapsed && (
        <motion.div
          className={styles.subItems}
          variants={subMenuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          layout
        >
          {subItems.map(renderSubItem)}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubMenu;