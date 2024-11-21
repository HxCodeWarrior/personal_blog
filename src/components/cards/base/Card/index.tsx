import React from 'react';
import { styled, keyframes, useTheme } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import { alpha, darken, lighten } from '@mui/material/styles';
import CardHeader from '../CardHeader';
import CardBody from '../CardBody';
import CardFooter from '../CardFooter';
import CardSkeleton from '../CardSkeleton';

type BaseVariant = 'elevation' | 'outlined';
type ExtendedVariant = 'glass' | 'solid' | 'gradient' | 'floating';
type CardVariant = BaseVariant | ExtendedVariant;

interface StyledCardProps {
  $variant?: CardVariant;
  $hover?: boolean;
  $animated?: boolean;
  $fullHeight?: boolean;
  $borderRadius?: number | string;
  $noPadding?: boolean;
  $clickable?: boolean;
  $selected?: boolean;
}

interface CardProps extends Omit<React.ComponentProps<typeof MuiCard>, 'variant'> {
  variant?: CardVariant;
  hover?: boolean;
  animated?: boolean;
  loading?: boolean;
  loadingProps?: React.ComponentProps<typeof CardSkeleton>;
  fullHeight?: boolean;
  borderRadius?: number | string;
  noPadding?: boolean;
  clickable?: boolean;
  selected?: boolean;
  /** 渐变色配置 (仅在 variant='gradient' 时生效) */
  gradient?: {
    from?: string;
    to?: string;
    deg?: number;
  };
  /** 阴影深度 */
  elevation?: 0 | 1 | 2 | 3 | 4;
}

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const floatingAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
`;

const StyledCard = styled(MuiCard)<StyledCardProps>(({ 
  theme, 
  $variant = 'elevation', 
  $hover, 
  $animated, 
  $fullHeight,
  $borderRadius,
  $noPadding,
  $clickable,
  $selected,
}) => {
  const isGlass = $variant === 'glass';
  const isSolid = $variant === 'solid';
  const isGradient = $variant === 'gradient';
  const isFloating = $variant === 'floating';

  const getBackgroundColor = () => {
    if (isGlass) {
      return alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.8 : 0.9);
    }
    if (isSolid) {
      return theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.dark, 0.1)
        : alpha(theme.palette.primary.light, 0.1);
    }
    return theme.palette.background.paper;
  };

  const getHoverStyles = () => {
    if (!$hover) return {};

    const baseHoverStyles = {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[8],
      borderColor: $variant === 'outlined' ? theme.palette.primary.main : undefined,
    };

    if (isGlass) {
      return {
        ...baseHoverStyles,
        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
        backdropFilter: 'blur(12px)',
      };
    }

    if (isGradient) {
      return {
        ...baseHoverStyles,
        filter: 'brightness(1.1)',
      };
    }

    return baseHoverStyles;
  };

  return {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: $fullHeight ? '100%' : 'auto',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: $animated 
      ? `${fadeInScale} 0.4s ease-out${isFloating ? `, ${floatingAnimation} 3s ease-in-out infinite` : ''}`
      : isFloating ? `${floatingAnimation} 3s ease-in-out infinite` : 'none',
    overflow: 'hidden',
    backgroundColor: getBackgroundColor(),
    borderRadius: $borderRadius || theme.shape.borderRadius,
    padding: $noPadding ? 0 : undefined,
    cursor: $clickable ? 'pointer' : undefined,

    ...(isGlass && {
      backdropFilter: 'blur(10px)',
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    }),

    ...(isSolid && {
      border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
    }),

    ...($selected && {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
    }),

    '&:hover': getHoverStyles(),

    ...(isSolid && {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, 
          ${theme.palette.primary.main}, 
          ${theme.palette.secondary.main}, 
          ${theme.palette.primary.main})`,
        backgroundSize: '200% 100%',
        animation: 'gradient 3s linear infinite',
      },
    }),

    ...(isGradient && {
      background: `linear-gradient(45deg, 
        ${theme.palette.primary.main}, 
        ${theme.palette.secondary.main})`,
      color: theme.palette.primary.contrastText,
    }),

    '@keyframes gradient': {
      '0%': { backgroundPosition: '0% 0%' },
      '100%': { backgroundPosition: '200% 0%' },
    },
  };
});

const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
} = ({
  children,
  variant = 'elevation',
  hover = true,
  animated = true,
  loading = false,
  loadingProps,
  fullHeight = false,
  borderRadius,
  noPadding = false,
  clickable = false,
  selected = false,
  gradient,
  elevation = 1,
  ...props
}) => {
  const theme = useTheme();
  const baseVariant: BaseVariant = ['glass', 'solid', 'gradient', 'floating'].includes(variant) 
    ? 'elevation' 
    : (variant as BaseVariant);

  // 处理渐变色
  const gradientStyles = gradient && variant === 'gradient' ? {
    background: `linear-gradient(${gradient.deg || 45}deg, 
      ${gradient.from || theme.palette.primary.main}, 
      ${gradient.to || theme.palette.secondary.main})`,
  } : {};

  if (loading) {
    return (
      <StyledCard
        $variant={variant}
        $hover={false}
        $animated={animated}
        $fullHeight={fullHeight}
        $borderRadius={borderRadius}
        $noPadding={noPadding}
        $clickable={clickable}
        $selected={selected}
        variant={baseVariant}
        elevation={elevation}
        {...props}
        sx={{ ...gradientStyles, ...props.sx }}
      >
        <CardSkeleton {...loadingProps} />
      </StyledCard>
    );
  }

  return (
    <StyledCard
      $variant={variant}
      $hover={hover}
      $animated={animated}
      $fullHeight={fullHeight}
      $borderRadius={borderRadius}
      $noPadding={noPadding}
      $clickable={clickable}
      $selected={selected}
      variant={baseVariant}
      elevation={elevation}
      {...props}
      sx={{ ...gradientStyles, ...props.sx }}
    >
      {children}
    </StyledCard>
  );
};

// 附加子组件
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
