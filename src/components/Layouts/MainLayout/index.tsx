import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import styles from './MainLayout.module.scss';
import { FaBars, FaTimes } from 'react-icons/fa';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 模拟页面加载
    setTimeout(() => setIsLoading(false), 1000);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingScreen}>
        <motion.div
          className={styles.loadingSpinner}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity }
          }}
        />
        <motion.div
          className={styles.loadingText}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.layout}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <motion.button
        className={styles.sidebarToggle}
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </motion.button>

      <div className={styles.container}>
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              className={styles.sidebarWrapper}
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.main 
          className={`${styles.main} ${!isSidebarOpen ? styles.expanded : ''}`}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className={styles.contentWrapper}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.main>
      </div>

      <Footer />

      {/* 背景装饰 */}
      <div className={styles.backgroundDecoration}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridPattern} />
      </div>
    </motion.div>
  );
};

export default MainLayout;
