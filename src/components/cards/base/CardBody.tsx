import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

interface CardBodyProps {
  children?: React.ReactNode;
  className?: string;
  sx?: BoxProps['sx'];
  fullHeight?: boolean;
  /** 内容填充程度 */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /** 是否启用动画 */
  animated?: boolean;
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const getPadding = (padding: CardBodyProps['padding']) => {
  switch (padding) {
    case 'none': return 0;
    case 'small': return 2;
    case 'large': return 4;
    default: return 3;
  }
};

const BodyWrapper = styled(Box, {
  shouldForwardProp: (prop) => !['fullHeight', 'padding', 'animated'].includes(prop as string),
})<{ 
  fullHeight?: boolean; 
  padding?: CardBodyProps['padding'];
  animated?: boolean;
}>(({ theme, fullHeight, padding = 'medium', animated }) => ({
  padding: theme.spacing(getPadding(padding)),
  flex: fullHeight ? 1 : 'none',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  position: 'relative',
  transition: 'all 0.3s ease',
  animation: animated ? `${fadeInUp} 0.4s ease-out` : 'none',

  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.2)',
    borderRadius: '3px',
    '&:hover': {
      background: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.3)'
        : 'rgba(0, 0, 0, 0.3)',
    }
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  }
}));

const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
  sx,
  fullHeight = false,
  padding = 'medium',
  animated = true,
}) => {
  return (
    <BodyWrapper 
      className={className} 
      sx={sx} 
      fullHeight={fullHeight}
      padding={padding}
      animated={animated}
    >
      {children}
    </BodyWrapper>
  );
};

export default CardBody; 