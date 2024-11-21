import { Variants } from 'framer-motion'

export const labelAnimation: Variants = {
  idle: {
    y: 0,
    scale: 1,
    color: 'rgba(0, 0, 0, 0.6)'
  },
  focus: {
    y: -24,
    scale: 0.85,
    color: 'var(--primary-color)',
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  }
}

export const inputContainerAnimation: Variants = {
  idle: {
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
  },
  hover: {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  focus: {
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
  }
} 