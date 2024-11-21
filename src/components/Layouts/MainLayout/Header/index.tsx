import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { motion } from 'framer-motion';
import { RiMenu4Line } from 'react-icons/ri';
import { 
  FaHome, 
  FaNewspaper, 
  FaUser, 
  FaLightbulb 
} from 'react-icons/fa';
import Navigation from './components/Navigation';
import Search from './components/Search';
import ThemeSwitch from './components/ThemeSwitch';
import UserMenu from './components/UserMenu';
import { NavItem, UserProfile, Notification } from './types';

const navItems: NavItem[] = [
  { title: 'Home', path: '/', icon: <FaHome /> },
  { title: 'Articles', path: '/articles', icon: <FaNewspaper /> },
  { title: 'Profiles', path: '/profiles', icon: <FaUser /> },
  { title: 'Skills', path: '/skills', icon: <FaLightbulb /> },
];

const mockProfile: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/avatar.png',
  role: 'Senior Developer'
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Project',
    message: 'You have been assigned to a new project',
    type: 'info',
    timestamp: new Date(),
    read: false
  },
  // Add more mock notifications...
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.logoContent}
          >
            <span className={styles.logoIcon}>
              <RiMenu4Line />
            </span>
            <span className={styles.logoText}>DevPortal</span>
          </motion.div>
        </Link>

        <Navigation items={navItems} />
        
        <div className={styles.headerActions}>
          <Search />
          <ThemeSwitch 
            isDark={isDarkTheme} 
            onToggle={() => setIsDarkTheme(!isDarkTheme)} 
          />
          <UserMenu 
            profile={mockProfile}
            notifications={mockNotifications}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
