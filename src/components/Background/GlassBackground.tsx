import styled from 'styled-components';
import { motion } from 'framer-motion';

interface GlassBackgroundProps {
  variant?: 'primary' | 'secondary' | 'neutral';
  intensity?: 'light' | 'medium' | 'strong';
  animated?: boolean;
}

export const GlassBackground = styled(motion.div)<GlassBackgroundProps>`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme, variant = 'neutral', intensity = 'medium' }) => `
      radial-gradient(
        circle at ${variant === 'primary' ? '70% 30%' : '30% 70%'},
        ${variant === 'primary' 
          ? theme.colors.primary.main 
          : variant === 'secondary' 
          ? theme.colors.secondary.main 
          : theme.colors.text.primary}${intensity === 'light' ? '08' : intensity === 'medium' ? '10' : '15'} 0%,
        transparent 70%
      ),
      radial-gradient(
        circle at ${variant === 'primary' ? '20% 80%' : '80% 20%'},
        ${variant === 'primary' 
          ? theme.colors.secondary.main 
          : variant === 'secondary' 
          ? theme.colors.primary.main 
          : theme.colors.secondary.main}${intensity === 'light' ? '05' : intensity === 'medium' ? '08' : '10'} 0%,
        transparent 70%
      )
    `};
    filter: blur(80px);
    opacity: 0.8;
    animation: ${({ animated }) => animated ? 'pulseGlow 8s ease-in-out infinite alternate' : 'none'};
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.background.paper}40;
    backdrop-filter: blur(100px) saturate(150%);
  }

  @keyframes pulseGlow {
    0% {
      transform: scale(1) rotate(0deg);
      opacity: 0.8;
    }
    100% {
      transform: scale(1.1) rotate(3deg);
      opacity: 0.6;
    }
  }
`; 