import React from 'react';
import { styled } from '@mui/material/styles';
import BaseLabel, { BaseLabelProps } from './BaseLabel';

// 文章标签的预设样式
const ARTICLE_STYLES = {
  technology: {
    color: '#2196F3',
    gradient: { from: '#2196F3', to: '#00BCD4' },
    icon: '💻',
  },
  design: {
    color: '#E91E63',
    gradient: { from: '#E91E63', to: '#FF4081' },
    icon: '🎨',
  },
  lifestyle: {
    color: '#4CAF50',
    gradient: { from: '#4CAF50', to: '#8BC34A' },
    icon: '🌿',
  },
  travel: {
    color: '#FF9800',
    gradient: { from: '#FF9800', to: '#FFC107' },
    icon: '✈️',
  },
  food: {
    color: '#F44336',
    gradient: { from: '#F44336', to: '#FF5722' },
    icon: '🍳',
  },
  health: {
    color: '#009688',
    gradient: { from: '#009688', to: '#4DB6AC' },
    icon: '💪',
  },
  business: {
    color: '#607D8B',
    gradient: { from: '#607D8B', to: '#90A4AE' },
    icon: '💼',
  },
  science: {
    color: '#9C27B0',
    gradient: { from: '#9C27B0', to: '#BA68C8' },
    icon: '🔬',
  },
} as const;

export type ArticleType = keyof typeof ARTICLE_STYLES;

interface ArticleLabelProps extends Omit<BaseLabelProps, 'color' | 'label' | 'gradient' | 'icon'> {
  /** 文章类型 */
  type: ArticleType;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 是否使用渐变效果 */
  useGradient?: boolean;
}

const ArticleLabel: React.FC<ArticleLabelProps> = ({
  type,
  showIcon = true,
  useGradient = false,
  variant = 'filled',
  size = 'medium',
  shape = 'rounded',
  animated = true,
  ...props
}) => {
  const style = ARTICLE_STYLES[type];
  const label = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <BaseLabel
      label={label}
      color={style.color}
      variant={variant}
      size={size}
      shape={shape}
      animated={animated}
      gradient={useGradient ? { ...style.gradient, deg: 45 } : undefined}
      icon={showIcon ? style.icon : undefined}
      iconPosition="start"
      {...props}
    />
  );
};

export default ArticleLabel; 