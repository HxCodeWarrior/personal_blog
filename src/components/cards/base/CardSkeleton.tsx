import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

interface CardSkeletonProps {
  className?: string;
  sx?: BoxProps['sx'];
  hasAction?: boolean;
  hasSubtitle?: boolean;
  contentLines?: number;
  hasFooter?: boolean;
  /** 动画效果类型 */
  animation?: 'pulse' | 'wave' | false | 'none';
}

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  padding: theme.spacing(2.5),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  width: '100%',
}));

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  transform: 'none',
  '&.MuiSkeleton-pulse': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(0, 0, 0, 0.06)',
    '&::after': {
      background: `linear-gradient(90deg, transparent, 
        ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'}, 
        transparent)`,
      animation: `${shimmer} 2s infinite`,
    }
  }
}));

const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  sx,
  hasAction = true,
  hasSubtitle = true,
  contentLines = 3,
  hasFooter = true,
  animation = 'pulse'
}) => {
  const getSkeletonAnimation = (anim: CardSkeletonProps['animation']) => {
    if (anim === 'none' || anim === false) return false;
    return anim;
  };

  const skeletonAnimation = getSkeletonAnimation(animation);

  return (
    <SkeletonWrapper className={className} sx={sx}>
      <HeaderWrapper>
        <Box sx={{ flex: 1 }}>
          <StyledSkeleton 
            variant="text" 
            width="70%" 
            height={32} 
            animation={skeletonAnimation}
          />
          {hasSubtitle && (
            <StyledSkeleton 
              variant="text" 
              width="50%" 
              height={20} 
              animation={skeletonAnimation}
              sx={{ mt: 1 }} 
            />
          )}
        </Box>
        {hasAction && (
          <StyledSkeleton 
            variant="circular" 
            width={40} 
            height={40} 
            animation={skeletonAnimation}
          />
        )}
      </HeaderWrapper>

      <Box sx={{ py: 2 }}>
        {Array.from({ length: contentLines }).map((_, index) => (
          <StyledSkeleton
            key={index}
            variant="text"
            width={`${85 + Math.sin(index) * 15}%`}
            height={24}
            animation={skeletonAnimation}
            sx={{ my: 1.5 }}
          />
        ))}
      </Box>

      {hasFooter && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            pt: 2,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <StyledSkeleton 
            variant="rounded" 
            width={90} 
            height={36} 
            animation={skeletonAnimation}
          />
          <StyledSkeleton 
            variant="rounded" 
            width={90} 
            height={36} 
            animation={skeletonAnimation}
          />
        </Box>
      )}
    </SkeletonWrapper>
  );
};

export default CardSkeleton; 