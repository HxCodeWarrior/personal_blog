// 用户菜单
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaUser, FaCog, FaSignOutAlt, FaBell } from 'react-icons/fa';
import { UserProfile, Notification } from '../types';
import styles from '../Header.module.scss';

interface UserMenuProps {
  profile: UserProfile;
  notifications: Notification[];
}

const UserMenu = ({ profile, notifications }: UserMenuProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={styles.userMenu}>
      <motion.div 
        className={styles.notificationIcon}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
      >
        <FaBell />
        {unreadCount > 0 && (
          <motion.span 
            className={styles.notificationBadge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.div>

      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div
            className={styles.notificationsDropdown}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                className={`${styles.notification} ${!notification.read ? styles.unread : ''}`}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div className={styles.notificationContent}>
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className={styles.timestamp}>
                    {notification.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.profile}>
        <motion.div
          className={styles.profileIcon}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          whileHover={{ scale: 1.05 }}
        >
          <img src={profile.avatar} alt={profile.name} />
          <motion.div 
            className={styles.statusIndicator}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </motion.div>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              className={styles.profileDropdown}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className={styles.profileHeader}>
                <img src={profile.avatar} alt={profile.name} />
                <div className={styles.profileInfo}>
                  <h4>{profile.name}</h4>
                  <span>{profile.email}</span>
                  <span className={styles.role}>{profile.role}</span>
                </div>
              </div>
              
              <div className={styles.dropdownDivider} />
              
              <Link href="/profile" className={styles.dropdownItem}>
                <FaUser />
                <span>My Profile</span>
              </Link>
              <Link href="/settings" className={styles.dropdownItem}>
                <FaCog />
                <span>Settings</span>
              </Link>
              
              <div className={styles.dropdownDivider} />
              
              <button className={styles.dropdownItem}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserMenu;
