import { useScroll, useTransform, MotionValue } from 'framer-motion'

interface ScrollAnimationConfig {
  inputRange: number[]
  outputRange: number[]
}

export const useScrollAnimation = (config: ScrollAnimationConfig) => {
  const { scrollYProgress } = useScroll()
  const animatedValue = useTransform(
    scrollYProgress, 
    config.inputRange, 
    config.outputRange
  )
  
  return animatedValue
} 