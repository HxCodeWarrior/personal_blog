import { motion } from 'framer-motion';
import { navigationRoutes } from '../../../routes/NavigationRoutes';
import { NavItem } from './NavItem';

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 }
};

export const DesktopNav: React.FC = () => {
  return (
    <motion.nav 
      className="desktop-nav"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {navigationRoutes.map((route) => (
        <motion.div key={route.path} variants={itemVariants}>
          <NavItem item={route} />
        </motion.div>
      ))}
    </motion.nav>
  );
}; 