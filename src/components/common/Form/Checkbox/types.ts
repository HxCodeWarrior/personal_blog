import { ReactNode } from 'react';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  value?: string | number;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  name?: string;
  id?: string;
  autoFocus?: boolean;
  'aria-label'?: string;
}

export interface CheckboxOptionType {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

export interface CheckboxGroupProps {
  value?: Array<string | number>;
  defaultValue?: Array<string | number>;
  disabled?: boolean;
  name?: string;
  options?: Array<CheckboxOptionType | string | number>;
  onChange?: (checkedValues: Array<string | number>) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export interface CheckboxGroupContextProps {
  value?: Array<string | number>;
  disabled?: boolean;
  name?: string;
  registerValue: (value: string | number) => void;
  cancelValue: (value: string | number) => void;
  toggleOption: (option: CheckboxOptionType) => void;
} 