// 搜索框
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from '../Header.module.scss';

const Search = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div className={styles.search}>
      <motion.div 
        className={`${styles.searchWrapper} ${isExpanded ? styles.expanded : ''}`}
        animate={{ width: isExpanded ? 300 : 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.button
          className={styles.searchToggle}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSearch />
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={styles.searchInputWrapper}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <motion.button
                  className={styles.clearSearch}
                  onClick={() => setSearchQuery('')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTimes />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Search;
