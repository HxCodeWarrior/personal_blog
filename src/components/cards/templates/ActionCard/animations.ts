import { keyframes } from '@mui/material/styles';

export const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const rippleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

export const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0); }
`;

export const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.2); }
  50% { box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.4); }
  100% { box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.2); }
`; 