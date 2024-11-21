import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCollapse from './components/MenuCollapse';
import MenuItem from './components/MenuItem';
import { MenuItem as MenuItemType } from './types';
import { 
  FaCode, 
  FaPalette, 
  FaChartLine,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaFigma,
  FaSketch,
  FaVideo,
  FaUsers,
  FaTasks,
  FaChartBar,
  FaBrain,
  FaRobot,
  FaDatabase
} from 'react-icons/fa';

const sidebarData: MenuItemType[] = [
  {
    title: 'Development',
    icon: <FaCode />,
    subItems: [
      { title: 'Frontend', icon: <FaReact />, path: '/dev/frontend' },
      { title: 'Backend', icon: <FaNodeJs />, path: '/dev/backend' },
      { title: 'DevOps', icon: <FaDocker />, path: '/dev/devops' },
    ],
  },
  {
    title: 'Design',
    icon: <FaPalette />,
    subItems: [
      { title: 'UI/UX', icon: <FaFigma />, path: '/design/ui-ux' },
      { title: 'Graphics', icon: <FaSketch />, path: '/design/graphics' },
      { title: 'Motion', icon: <FaVideo />, path: '/design/motion' },
    ],
  },
  {
    title: 'Management',
    icon: <FaChartLine />,
    subItems: [
      { title: 'Team', icon: <FaUsers />, path: '/management/team' },
      { title: 'Tasks', icon: <FaTasks />, path: '/management/tasks' },
      { title: 'Analytics', icon: <FaChartBar />, path: '/management/analytics' },
    ],
  },
  {
    title: 'AI & Data',
    icon: <FaBrain />,
    subItems: [
      { title: 'Machine Learning', icon: <FaRobot />, path: '/ai/ml' },
      { title: 'Data Science', icon: <FaDatabase />, path: '/ai/data-science' },
    ],
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // 响应式处理
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 移动端自动关闭侧边栏
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  // 路由变化时自动展开对应菜单
  useEffect(() => {
    const currentPath = router.pathname;
    const menuIndex = sidebarData.findIndex(item => 
      item.subItems.some(subItem => currentPath.startsWith(subItem.path))
    );
    
    if (menuIndex !== -1) {
      setExpandedItem(menuIndex);
    }

    // 移动端下路由变化时自动关闭侧边栏
    if (isMobile) {
      setIsOpen(false);
    }
  }, [router.pathname, isMobile]);

  // 处理折叠状态
  const handleCollapse = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  // 动画变体
  const sidebarVariants = {
    open: {
      x: 0,
      width: isCollapsed ? '80px' : '280px',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    },
    closed: {
      x: '-100%',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      display: "block"
    },
    closed: {
      opacity: 0,
      transitionEnd: {
        display: "none"
      }
    }
  };

  return (
    <>
      {/* 移动端遮罩层 */}
      {isMobile && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside 
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isOpen ? styles.open : ''}`}
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <MenuCollapse 
          isCollapsed={isCollapsed} 
          toggleCollapse={handleCollapse}
        />
        
        <motion.div 
          className={styles.sidebarContent}
          animate={{
            x: isOpen ? 0 : -20,
            opacity: isOpen ? 1 : 0
          }}
        >
          <AnimatePresence mode="wait">
            {sidebarData.map((item, index) => (
              <MenuItem
                key={item.title}
                item={item}
                index={index}
                isCollapsed={isCollapsed}
                expandedItem={expandedItem}
                setExpandedItem={setExpandedItem}
                currentPath={router.pathname}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 移动端切换按钮 */}
        {isMobile && (
          <motion.button
            className={styles.mobileToggle}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className={`${styles.hamburger} ${isOpen ? styles.active : ''}`} />
          </motion.button>
        )}
      </motion.aside>
    </>
  );
};

export default Sidebar;
