import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from './NavLink';
import { NavRoute } from '../../../routes/NavigationRoutes';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface NavItemProps {
  item: NavRoute;
  mobile?: boolean;
  depth?: number;
}

export const NavItem: React.FC<NavItemProps> = ({ 
  item, 
  mobile = false,
  depth = 0 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: mobile ? 0 : -10,
      height: 0 
    },
    visible: { 
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  };

  if (item.children) {
    return (
      <div ref={ref} className={`nav-item ${mobile ? 'nav-item--mobile' : ''}`}>
        <button
          className="nav-item__button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {item.icon && <span className="nav-item__icon">{item.icon}</span>}
          {item.label}
          <ChevronDownIcon
            className={`nav-item__chevron ${isOpen ? 'nav-item__chevron--open' : ''}`}
          />
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="nav-item__dropdown"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ paddingLeft: mobile ? `${depth * 16}px` : 0 }}
            >
              {item.children.map((child) => (
                <NavItem 
                  key={child.path} 
                  item={child} 
                  mobile={mobile}
                  depth={depth + 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink 
      href={item.path} 
      className={mobile ? 'nav-link--mobile' : ''}
      icon={item.icon}
    >
      {item.label}
    </NavLink>
  );
}; 