import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  className = '',
  children,
  icon,
  onClick
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      className={`nav-link ${isActive ? 'nav-link--active' : ''} ${className}`}
      onClick={onClick}
    >
      <motion.div
        className="nav-link__content"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon && <span className="nav-link__icon">{icon}</span>}
        <span className="nav-link__text">{children}</span>
      </motion.div>
    </Link>
  );
};

export default NavLink;