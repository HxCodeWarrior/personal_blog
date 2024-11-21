import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

interface CardFooterProps {
  children?: React.ReactNode;
  className?: string;
  sx?: BoxProps['sx'];
  divider?: boolean;
  align?: 'left' | 'center' | 'right' | 'space-between';
  sticky?: boolean;
  animated?: boolean;
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FooterWrapper = styled(Box, {
  shouldForwardProp: (prop) => !['divider', 'align', 'sticky', 'animated'].includes(prop as string),
})<{ 
  divider?: boolean; 
  align?: CardFooterProps['align'];
  sticky?: boolean;
  animated?: boolean;
}>(({ theme, divider, align, sticky, animated }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: align || 'flex-end',
  padding: theme.spacing(2),
  gap: theme.spacing(1.5),
  borderTop: divider ? `1px solid ${theme.palette.divider}` : 'none',
  transition: 'all 0.3s ease',
  backgroundColor: theme.palette.background.paper,
  position: sticky ? 'sticky' : 'relative',
  bottom: sticky ? 0 : 'auto',
  zIndex: 1,
  animation: animated ? `${fadeInUp} 0.3s ease-out` : 'none',

  '&::before': sticky ? {
    content: '""',
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 20,
    background: `linear-gradient(to top, ${theme.palette.background.paper}, transparent)`,
    pointerEvents: 'none',
  } : {},

  '& > *': {
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
    }
  }
}));

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  sx,
  divider = true,
  align = 'right',
  sticky = false,
  animated = true,
}) => {
  return (
    <FooterWrapper
      className={className}
      sx={sx}
      divider={divider}
      align={align}
      sticky={sticky}
      animated={animated}
    >
      {children}
    </FooterWrapper>
  );
};

export default CardFooter; 