// 版权信息
import { motion } from 'framer-motion';
import styles from '../Footer.module.scss';

const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <motion.div 
      className={styles.copyright}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className={styles.copyrightContent}>
        <motion.div 
          className={styles.copyrightText}
          whileHover={{ scale: 1.05 }}
        >
          <span className={styles.symbol}>©</span>
          <span className={styles.year}>{year}</span>
          <span className={styles.company}>Lindwurm</span>
          <span className={styles.rights}>All rights reserved.</span>
        </motion.div>
        <motion.div 
          className={styles.copyrightLinks}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((text) => (
            <motion.a
              key={text}
              href="#"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ color: '#2196F3' }}
            >
              {text}
            </motion.a>
          ))}
        </motion.div>
      </div>
      <div className={styles.copyrightGlow} />
    </motion.div>
  );
};

export default Copyright;
