import { Variants } from "framer-motion"


export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const hoverScale: Variants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

export const shimmer: Variants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 8,
      ease: "linear",
      repeat: Infinity
    }
  }
}

export const cardHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

export const imageZoom: Variants = {
  rest: {
    scale: 1
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
}

export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}; 

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const slideInFromRight = {
  hidden: {
    opacity: 0,
    x: 20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const shake = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5
    }
  }
}; 