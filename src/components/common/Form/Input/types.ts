import { InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: 'large' | 'middle' | 'small';
  status?: 'error' | 'warning';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  bordered?: boolean;
  showCount?: boolean;
  maxLength?: number;
  onClear?: () => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
} 