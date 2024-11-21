// 主题切换
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from '../Header.module.scss';

interface ThemeSwitchProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeSwitch = ({ isDark, onToggle }: ThemeSwitchProps) => {
  return (
    <motion.button
      className={styles.themeSwitch}
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className={styles.themeSwitchIcon}
        initial={false}
        animate={{ 
          rotate: isDark ? 180 : 0,
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? <FaMoon /> : <FaSun />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeSwitch;
