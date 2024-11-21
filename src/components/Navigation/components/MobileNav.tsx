import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationRoutes } from '../../../routes/NavigationRoutes';
import { NavItem } from './NavItem';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const menuVariants = {
  hidden: { 
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

export const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 处理路由变化时关闭菜单
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // 处理滚动锁定
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="mobile-nav lg:hidden">
      <button
        className="mobile-nav__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav__menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {navigationRoutes.map((route) => (
              <NavItem 
                key={route.path} 
                item={route} 
                mobile 
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 