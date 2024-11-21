import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  FaTwitter, 
  FaGithub, 
  FaLinkedin, 
  FaDiscord,
  FaEnvelope 
} from 'react-icons/fa';
import SocialLinks from './components/SocialLinks';
import FooterNav from './components/FooterNav';
import Copyright from './components/Copyright';
import { SocialLink, FooterNavItem } from './types';
import styles from './Footer.module.scss';

const socialLinks: SocialLink[] = [
  { 
    name: 'Twitter', 
    icon: <FaTwitter />, 
    url: '#',
    color: '#1DA1F2'
  },
  { 
    name: 'GitHub', 
    icon: <FaGithub />, 
    url: '#',
    color: '#333'
  },
  { 
    name: 'LinkedIn', 
    icon: <FaLinkedin />, 
    url: '#',
    color: '#0A66C2'
  },
  { 
    name: 'Discord', 
    icon: <FaDiscord />, 
    url: '#',
    color: '#5865F2'
  }
];

const navItems: FooterNavItem[] = [
  {
    title: 'Product',
    links: [
      { name: 'Features', url: '#' },
      { name: 'Pricing', url: '#' },
      { name: 'Documentation', url: '#' },
      { name: 'API Reference', url: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', url: '#' },
      { name: 'Careers', url: '#' },
      { name: 'Blog', url: '#' },
      { name: 'Press Kit', url: '#' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Community', url: '#' },
      { name: 'Help Center', url: '#' },
      { name: 'Partners', url: '#' },
      { name: 'Status', url: '#' }
    ]
  }
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // 添加鼠标跟踪效果
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const input = e.currentTarget;
    const rect = input.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    input.style.setProperty('--x', `${x}%`);
    input.style.setProperty('--y', `${y}%`);
  };

  return (
    <footer className={styles.footer} ref={ref}>
      <div className={styles.footerGlow} />
      <div className={styles.gridPattern} />
      
      <motion.div 
        className={styles.footerContent}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.5,
              staggerChildren: 0.2
            }
          }
        }}
        initial="hidden"
        animate={controls}
      >
        <motion.div className={styles.footerMain}>
          <motion.div className={styles.footerBrand}>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              DevPortal
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Building the future of development, one line at a time.
            </motion.p>
            <SocialLinks links={socialLinks} />
          </motion.div>

          <FooterNav items={navItems} />

          <motion.div 
            className={styles.newsletter}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest updates and features.</p>
            <div 
              className={styles.inputWrapper}
              onMouseMove={handleMouseMove}
            >
              <input type="email" placeholder="Enter your email" />
              <div className={styles.inputGlow} />
            </div>
          </motion.div>
        </motion.div>

        <Copyright />
      </motion.div>
    </footer>
  );
};

export default Footer;
