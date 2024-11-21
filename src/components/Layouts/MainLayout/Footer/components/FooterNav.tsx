// 底部导航
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FooterNavItem } from '../types';
import styles from '../Footer.module.scss';

interface FooterNavProps {
  items: FooterNavItem[];
}

const FooterNav = ({ items }: FooterNavProps) => {
  return (
    <div className={styles.footerNav}>
      {items.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          className={styles.navSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
        >
          <h4 className={styles.navTitle}>{section.title}</h4>
          <motion.div 
            className={styles.navLinks}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
          >
            {section.links.map((link, linkIndex) => (
              <motion.div
                key={link.name}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <Link 
                  href={link.url}
                  className={styles.navLink}
                >
                  <motion.span
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FooterNav;
