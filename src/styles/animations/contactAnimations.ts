import { Variants } from 'framer-motion'

export const formFieldAnimation: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

export const submitButtonAnimation: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeInOut'
    }
  },
  success: {
    backgroundColor: '#4CAF50',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}

export const inputFocusAnimation: Variants = {
  initial: { 
    scaleX: 0,
    opacity: 0 
  },
  focus: { 
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
} 