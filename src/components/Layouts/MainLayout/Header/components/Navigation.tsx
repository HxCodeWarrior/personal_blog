// 导航菜单
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavItem } from '../types';
import styles from '../Header.module.scss';

interface NavigationProps {
  items: NavItem[];
}

const Navigation = ({ items }: NavigationProps) => {
  const router = useRouter();

  return (
    <nav className={styles.navigation}>
      {items.map((item) => {
        const isActive = router.pathname === item.path;
        return (
          <motion.div
            key={item.title}
            className={styles.navItemWrapper}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <Link 
              href={item.path} 
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <motion.span 
                className={styles.navIcon}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  color: isActive ? '#2196F3' : 'rgba(255, 255, 255, 0.7)'
                }}
              >
                {item.icon}
              </motion.span>
              <span className={styles.navText}>{item.title}</span>
              {isActive && (
                <motion.div 
                  className={styles.activeIndicator}
                  layoutId="navActiveIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
};

export default Navigation;
