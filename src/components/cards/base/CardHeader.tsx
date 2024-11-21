import React from 'react';
import { styled, Theme, keyframes } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CardHeaderProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  sx?: BoxProps['sx'];
  enableHover?: boolean;
  animated?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeaderWrapper = styled(Box, {
  shouldForwardProp: (prop) => !['enableHover', 'animated'].includes(prop as string),
})<{ enableHover?: boolean; animated?: boolean }>(({ theme, enableHover, animated }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: 72,
  gap: theme.spacing(2),
  transition: 'all 0.3s ease',
  backgroundColor: theme.palette.background.paper,
  animation: animated ? `${fadeIn} 0.3s ease-out` : 'none',

  ...(enableHover && {
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.03)' 
        : 'rgba(0, 0, 0, 0.02)',
      '& .header-action': {
        opacity: 1,
        transform: 'translateX(0)',
      }
    }
  })
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '6px',
  minWidth: 0,
  transition: 'all 0.2s ease',

  '&:hover .header-title': {
    color: theme.palette.primary.main,
  }
}));

const ActionWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: theme.spacing(1),
  transition: 'all 0.3s ease',
  opacity: 0.8,
  transform: 'translateX(10px)',

  '&.header-action': {
    opacity: 0.6,
    '@media (max-width: 600px)': {
      opacity: 1,
      transform: 'none',
    }
  }
}));

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className,
  sx,
  enableHover = true,
  animated = true,
}) => {
  return (
    <HeaderWrapper 
      className={className} 
      sx={sx}
      enableHover={enableHover}
      animated={animated}
    >
      <TitleWrapper>
        {title && (
          <Typography
            variant="h6"
            component="div"
            noWrap
            className="header-title"
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              letterSpacing: '0.015em',
              transition: 'color 0.2s ease',
            }}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{
              lineHeight: 1.5,
              opacity: 0.85,
              fontWeight: 400,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </TitleWrapper>
      {action && (
        <ActionWrapper className="header-action">
          {action}
        </ActionWrapper>
      )}
    </HeaderWrapper>
  );
};

export default CardHeader; 