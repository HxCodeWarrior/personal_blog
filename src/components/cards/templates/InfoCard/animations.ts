export const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      scale: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }
};

export const avatarVariants = {
  hidden: { 
    scale: 0.8,
    opacity: 0,
    y: 20
  },
  visible: { 
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const skillVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 10
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2
    }
  }
};

export const infoItemVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }),
  hover: {
    x: 4,
    transition: {
      duration: 0.2
    }
  }
}; 