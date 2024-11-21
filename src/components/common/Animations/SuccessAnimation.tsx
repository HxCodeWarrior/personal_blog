import { motion } from 'framer-motion'
import styled from 'styled-components'

const checkmarkPath = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeInOut"
    }
  }
}

const circleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

export const SuccessAnimation = () => (
  <Container>
    <motion.svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        variants={circleVariants}
      />
      <motion.path
        d="M15 25 L22 32 L35 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        variants={checkmarkPath}
      />
    </motion.svg>
  </Container>
)

const Container = styled.div`
  color: ${({ theme }) => theme.colors.success};
  display: flex;
  justify-content: center;
  align-items: center;
` 