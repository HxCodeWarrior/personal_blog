import type { ReactNode } from 'react';

export interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  label?: string;
  name?: string;
  value?: string | number;
  description?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'button' | 'card';
  theme?: 'light' | 'dark';
}

export interface RadioGroupProps {
  children: ReactNode;
  value?: string | number;
  defaultValue?: string | number;
  name?: string;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export interface RadioGroupContextType {
  name?: string;
  value?: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
} 