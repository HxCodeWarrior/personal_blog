import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import { alpha, darken, lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export type LabelSize = 'tiny' | 'small' | 'medium' | 'large';
export type LabelVariant = 'filled' | 'outlined' | 'soft' | 'glass' | 'gradient';
export type LabelShape = 'rounded' | 'pill' | 'square';

export interface BaseLabelProps {
  /** 标签文本 */
  label: string;
  /** 标签颜色 */
  color?: string;
  /** 标签大小 */
  size?: LabelSize;
  /** 标签变体 */
  variant?: LabelVariant;
  /** 标签形状 */
  shape?: LabelShape;
  /** 是否可点击 */
  clickable?: boolean;
  /** 是否启用动画 */
  animated?: boolean;
  /** 是否选中 */
  selected?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示图标 */
  icon?: React.ReactNode;
  /** 图标位置 */
  iconPosition?: 'start' | 'end';
  /** 渐变色配置 */
  gradient?: {
    from: string;
    to: string;
    deg?: number;
  };
  /** 点击事件 */
  onClick?: () => void;
  /** 自定义类名 */
  className?: string;
}

const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--label-color-rgb), 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(var(--label-color-rgb), 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--label-color-rgb), 0); }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9) translateY(5px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
`;

const getLabelSize = (size: LabelSize) => {
  switch (size) {
    case 'tiny':
      return { height: 20, fontSize: 11, padding: '0 6px', iconSize: 12 };
    case 'small':
      return { height: 24, fontSize: 12, padding: '0 8px', iconSize: 14 };
    case 'large':
      return { height: 36, fontSize: 16, padding: '0 16px', iconSize: 20 };
    default:
      return { height: 30, fontSize: 14, padding: '0 12px', iconSize: 16 };
  }
};

const getShapeStyles = (shape: LabelShape, height: number) => {
  switch (shape) {
    case 'pill':
      return { borderRadius: height / 2 };
    case 'square':
      return { borderRadius: 4 };
    default:
      return { borderRadius: 8 };
  }
};

const LabelWrapper = styled(Box, {
  shouldForwardProp: (prop) => 
    !['size', 'labelColor', 'variant', 'shape', 'clickable', 'animated', 'selected', 'disabled', 'hasIcon', 'iconPosition', 'gradient']
      .includes(prop as string),
})<{
  size: LabelSize;
  labelColor: string;
  variant: LabelVariant;
  shape: LabelShape;
  clickable?: boolean;
  animated?: boolean;
  selected?: boolean;
  disabled?: boolean;
  hasIcon?: boolean;
  iconPosition?: 'start' | 'end';
  gradient?: BaseLabelProps['gradient'];
}>(({ 
  theme, 
  size, 
  labelColor, 
  variant, 
  shape,
  clickable,
  animated,
  selected,
  disabled,
  hasIcon,
  iconPosition,
  gradient,
}) => {
  const sizeStyles = getLabelSize(size);
  const shapeStyles = getShapeStyles(shape, sizeStyles.height);
  const isGlass = variant === 'glass';
  const isGradient = variant === 'gradient';

  // 将颜色转换为 RGB 格式用于动画
  const getRgbColor = (color: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const rgbColor = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);
    return rgbColor.match(/\d+/g)?.join(', ') || '0, 0, 0';
  };

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: hasIcon ? '6px' : 0,
    flexDirection: iconPosition === 'end' ? 'row-reverse' : 'row',
    height: sizeStyles.height,
    padding: sizeStyles.padding,
    fontSize: sizeStyles.fontSize,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: animated 
      ? `${fadeInScale} 0.3s ease-out${clickable ? `, ${floatAnimation} 3s ease-in-out infinite` : ''}`
      : clickable ? `${floatAnimation} 3s ease-in-out infinite` : 'none',
    cursor: disabled ? 'not-allowed' : (clickable ? 'pointer' : 'default'),
    userSelect: 'none',
    opacity: disabled ? 0.5 : 1,
    '--label-color-rgb': getRgbColor(labelColor),
    ...shapeStyles,

    ...(variant === 'filled' && {
      backgroundColor: selected ? labelColor : alpha(labelColor, 0.9),
      color: theme.palette.getContrastText(labelColor),
    }),

    ...(variant === 'outlined' && {
      border: `1.5px solid ${alpha(labelColor, selected ? 1 : 0.5)}`,
      color: labelColor,
    }),

    ...(variant === 'soft' && {
      backgroundColor: alpha(labelColor, selected ? 0.2 : 0.12),
      color: labelColor,
    }),

    ...(isGlass && {
      backgroundColor: alpha(labelColor, selected ? 0.25 : 0.15),
      backdropFilter: 'blur(8px)',
      color: labelColor,
      border: `1px solid ${alpha(labelColor, 0.2)}`,
    }),

    ...(isGradient && gradient && {
      background: `linear-gradient(${gradient.deg || 45}deg, ${gradient.from}, ${gradient.to})`,
      color: theme.palette.getContrastText(gradient.from),
    }),

    ...(selected && !isGradient && {
      animation: `${pulseAnimation} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
    }),

    '& .label-icon': {
      fontSize: sizeStyles.iconSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s ease',
    },

    '&:hover': !disabled && clickable ? {
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 8px ${alpha(labelColor, 0.25)}`,
      
      ...(variant === 'filled' && {
        backgroundColor: labelColor,
      }),
      
      ...(variant === 'outlined' && {
        backgroundColor: alpha(labelColor, 0.08),
        borderColor: labelColor,
      }),
      
      ...(variant === 'soft' && {
        backgroundColor: alpha(labelColor, 0.2),
      }),
      
      ...(isGlass && {
        backgroundColor: alpha(labelColor, 0.25),
        backdropFilter: 'blur(12px)',
      }),

      ...(isGradient && {
        filter: 'brightness(1.1)',
      }),

      '& .label-icon': {
        transform: 'scale(1.1)',
      },
    } : {},

    '&:active': !disabled && clickable ? {
      transform: 'translateY(0)',
      boxShadow: `0 2px 4px ${alpha(labelColor, 0.2)}`,
    } : {},
  };
});

const BaseLabel: React.FC<BaseLabelProps> = ({
  label,
  color = '#1976d2',
  size = 'medium',
  variant = 'filled',
  shape = 'rounded',
  clickable = false,
  animated = true,
  selected = false,
  disabled = false,
  icon,
  iconPosition = 'start',
  gradient,
  onClick,
  className,
}) => {
  const theme = useTheme();

  return (
    <LabelWrapper
      size={size}
      labelColor={color}
      variant={variant}
      shape={shape}
      clickable={clickable}
      animated={animated}
      selected={selected}
      disabled={disabled}
      hasIcon={!!icon}
      iconPosition={iconPosition}
      gradient={gradient}
      onClick={!disabled && clickable ? onClick : undefined}
      className={className}
    >
      {icon && <span className="label-icon">{icon}</span>}
      <Typography
        variant="body2"
        component="span"
        sx={{
          fontWeight: 500,
          letterSpacing: '0.02em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>
    </LabelWrapper>
  );
};

export default BaseLabel; 