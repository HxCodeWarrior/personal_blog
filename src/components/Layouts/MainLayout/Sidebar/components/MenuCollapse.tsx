// 菜单折叠
import { motion } from 'framer-motion';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import styles from '../Sidebar.module.scss';

interface MenuCollapseProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const MenuCollapse = ({ isCollapsed, toggleCollapse }: MenuCollapseProps) => {
  return (
    <motion.div
      className={styles.collapseButton}
      onClick={toggleCollapse}
      whileHover={{ 
        scale: 1.1,
        boxShadow: '0 0 12px rgba(33, 150, 243, 0.5)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{ 
        rotate: isCollapsed ? 180 : 0,
        backgroundColor: isCollapsed ? '#1976D2' : '#2196F3'
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <motion.div
        animate={{ 
          x: isCollapsed ? 2 : 0,
          opacity: isCollapsed ? 0 : 1 
        }}
      >
        <FaAngleDoubleLeft />
      </motion.div>
      <motion.div
        animate={{ 
          x: isCollapsed ? 0 : 2,
          opacity: isCollapsed ? 1 : 0 
        }}
        style={{ position: 'absolute' }}
      >
        <FaAngleDoubleRight />
      </motion.div>
    </motion.div>
  );
};

export default MenuCollapse;