import React from 'react';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import BaseLabel, { BaseLabelProps } from './BaseLabel';

// 用户标签的预设样式
const USER_LABEL_STYLES = {
  primary: {
    color: '#1976d2',
    gradient: { from: '#1976d2', to: '#42a5f5' },
  },
  success: {
    color: '#2e7d32',
    gradient: { from: '#2e7d32', to: '#66bb6a' },
  },
  warning: {
    color: '#ed6c02',
    gradient: { from: '#ed6c02', to: '#ffa726' },
  },
  error: {
    color: '#d32f2f',
    gradient: { from: '#d32f2f', to: '#ef5350' },
  },
  info: {
    color: '#0288d1',
    gradient: { from: '#0288d1', to: '#29b6f6' },
  },
  purple: {
    color: '#7b1fa2',
    gradient: { from: '#7b1fa2', to: '#ba68c8' },
  },
  teal: {
    color: '#00796b',
    gradient: { from: '#00796b', to: '#26a69a' },
  },
} as const;

export type UserLabelStyle = keyof typeof USER_LABEL_STYLES;

interface UserLabelProps extends Omit<BaseLabelProps, 'color' | 'gradient'> {
  /** 预设样式 */
  style?: UserLabelStyle;
  /** 是否显示删除按钮 */
  deletable?: boolean;
  /** 删除回调 */
  onDelete?: () => void;
  /** 是否使用渐变效果 */
  useGradient?: boolean;
}

const DeleteButton = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  borderRadius: '50%',
  marginLeft: 4,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  opacity: 0.6,
  transform: 'scale(0.8)',
  fontSize: '14px',
  lineHeight: 1,

  '&:hover': {
    opacity: 1,
    transform: 'scale(1)',
    backgroundColor: alpha(theme.palette.error.main, 0.1),
    color: theme.palette.error.main,
  },

  '&::before': {
    content: '"×"',
    display: 'block',
    transform: 'translateY(-1px)',
    fontWeight: 'bold',
  },
}));

const UserLabel: React.FC<UserLabelProps> = ({
  style = 'primary',
  deletable,
  onDelete,
  useGradient = false,
  variant = 'soft',
  size = 'medium',
  shape = 'pill',
  animated = true,
  ...props
}) => {
  const labelStyle = USER_LABEL_STYLES[style];
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <BaseLabel
      color={labelStyle.color}
      variant={variant}
      size={size}
      shape={shape}
      animated={animated}
      gradient={useGradient ? { ...labelStyle.gradient, deg: 45 } : undefined}
      icon={deletable ? (
        <DeleteButton onClick={handleDelete} />
      ) : undefined}
      iconPosition="end"
      {...props}
    />
  );
};

export default UserLabel; 