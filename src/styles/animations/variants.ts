export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 180, 360],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
} 