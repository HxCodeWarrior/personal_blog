import { motion } from 'framer-motion'
import styled from 'styled-components'

interface FocusEffectProps {
  isActive: boolean;
  hasError?: boolean;
}

export const InputFocusEffect = ({ isActive, hasError }: FocusEffectProps) => {
  return (
    <FocusLine
      initial={false}
      animate={isActive ? "active" : "inactive"}
      variants={{
        inactive: {
          scaleX: 0,
          opacity: 0
        },
        active: {
          scaleX: 1,
          opacity: 1
        }
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut"
      }}
      $hasError={hasError}
    />
  )
}

const FocusLine = styled(motion.div)<{ $hasError?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${({ theme, $hasError }) => 
    $hasError ? theme.colors.error : theme.colors.primary};
  transform-origin: left;
` 