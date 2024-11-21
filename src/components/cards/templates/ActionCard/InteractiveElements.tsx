import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { rippleAnimation } from './animations';

const likeAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const InteractiveBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    transition: 'all 0.3s ease',
    opacity: 0,
    background: alpha(theme.palette.primary.main, 0.08),
  },

  '&:hover': {
    transform: 'translateY(-1px)',
    
    '&::before': {
      opacity: 1,
    },

    '& .count': {
      color: theme.palette.primary.main,
    },

    '& .icon': {
      transform: 'scale(1.1)',
    },
  },

  '&:active': {
    transform: 'scale(0.98)',
  },
}));

const IconWrapper = styled('span')<{ active?: boolean }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  animation: active ? `${likeAnimation} 0.3s ease` : 'none',

  '&.icon': {
    fontSize: '1.25rem',
  },
}));

const Count = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  transition: 'color 0.2s ease',
  minWidth: '1.5rem',
  textAlign: 'center',
}));

interface ActionItemProps {
  icon: React.ReactNode;
  count: string | number;
  tooltip: string;
  active?: boolean;
  onClick?: () => void;
}

export const ActionItem: React.FC<ActionItemProps> = ({
  icon,
  count,
  tooltip,
  active,
  onClick,
}) => (
  <Tooltip title={tooltip} arrow>
    <InteractiveBox onClick={onClick}>
      <IconWrapper active={active} className="icon">
        {icon}
      </IconWrapper>
      <Count className="count">{count}</Count>
    </InteractiveBox>
  </Tooltip>
);

const RippleContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 5,
    height: 5,
    background: alpha(theme.palette.primary.main, 0.3),
    opacity: 0,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%) scale(1)',
    animation: `${rippleAnimation} 0.6s ease-out`,
  },
}));

export const RippleEffect: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RippleContainer>{children}</RippleContainer>
); 