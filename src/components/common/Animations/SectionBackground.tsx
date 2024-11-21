import styled from 'styled-components';
import { motion } from 'framer-motion';

interface SectionBackgroundProps {
  variant?: 'primary' | 'secondary' | 'neutral';
}

export const SectionBackground = styled(motion.div)<SectionBackgroundProps>`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme, variant = 'neutral' }) => `
      radial-gradient(
        circle at ${variant === 'primary' ? '70% 30%' : '30% 70%'},
        ${variant === 'primary' 
          ? theme.colors.primary.main 
          : variant === 'secondary' 
          ? theme.colors.secondary.main 
          : theme.colors.text.primary}08 0%,
        transparent 60%
      )
    `};
    filter: blur(60px);
    opacity: 0.5;
    animation: pulseGlow 8s ease-in-out infinite alternate;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.background.paper}40;
    backdrop-filter: blur(40px) saturate(150%);
  }

  @keyframes pulseGlow {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.1);
      opacity: 0.3;
    }
  }
`; 