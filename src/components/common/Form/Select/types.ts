import { ReactNode } from 'react';

export interface SelectOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
  children?: SelectOption[];
  icon?: ReactNode;
  groupLabel?: string;
}

export interface SelectProps {
  value?: string | number | Array<string | number>;
  defaultValue?: string | number | Array<string | number>;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  multiple?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  size?: 'large' | 'middle' | 'small';
  status?: 'error' | 'warning';
  maxTagCount?: number;
  dropdownClassName?: string;
  dropdownStyle?: React.CSSProperties;
  dropdownMatchSelectWidth?: boolean;
  bordered?: boolean;
  virtual?: boolean;
  notFoundContent?: ReactNode;
  loadingContent?: ReactNode;
  maxHeight?: number;
  optionHeight?: number;
  filterOption?: (inputValue: string, option: SelectOption) => boolean;
  onChange?: (value: string | number | Array<string | number>, option: SelectOption | SelectOption[]) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onPopupScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onDropdownVisibleChange?: (visible: boolean) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface SelectContextType {
  value?: string | number | Array<string | number>;
  multiple?: boolean;
  onSelect?: (option: SelectOption) => void;
  onDeselect?: (option: SelectOption) => void;
  activeIndex?: number;
}

export interface VirtualScrollProps {
  height: number;
  itemHeight: number;
  itemCount: number;
  renderItem: (index: number) => ReactNode;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
} 