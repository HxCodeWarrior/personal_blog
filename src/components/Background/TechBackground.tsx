'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useTheme } from '@/hooks/useTheme'

export const TechBackground = () => {
  const { currentTheme, isDarkMode } = useTheme()
  
  return (
    <BackgroundWrapper>
      <GridOverlay />
      <GradientOrbs>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="orb"
            animate={{
              x: [0, 30, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </GradientOrbs>
      <BlurOverlay />
    </BackgroundWrapper>
  )
}

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: -1;
  background: ${({ theme }) => theme.colors.background.default};
`

const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    ${({ theme }) => theme.colors.border.light}90 1px,
    transparent 1px
  ),
  linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border.light}90 1px,
    transparent 1px
  );
  background-size: 30px 30px;
  opacity: 0.3;
`

const GradientOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.4;
    
    &:nth-child(1) {
      top: 20%;
      left: 20%;
      width: 300px;
      height: 300px;
      background: ${({ theme }) => theme.colors.primary.main};
    }
    
    &:nth-child(2) {
      top: 50%;
      right: 20%;
      width: 400px;
      height: 400px;
      background: ${({ theme }) => theme.colors.secondary.main};
    }
    
    &:nth-child(3) {
      bottom: 10%;
      left: 30%;
      width: 350px;
      height: 350px;
      background: ${({ theme }) => theme.gradients.primary};
    }
  }
`

const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(100px);
  opacity: 0.7;
` 