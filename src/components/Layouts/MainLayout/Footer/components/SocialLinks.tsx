// 社交链接
import { motion } from 'framer-motion';
import { SocialLink } from '../types';
import styles from '../Footer.module.scss';

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks = ({ links }: SocialLinksProps) => {
  return (
    <div className={styles.socialLinks}>
      {links.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          className={styles.socialLink}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: `${link.color}20`,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span 
            className={styles.icon}
            style={{ color: link.color }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {link.icon}
          </motion.span>
          <span className={styles.name}>{link.name}</span>
          <div className={styles.glow} style={{ background: link.color }} />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
