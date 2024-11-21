import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** 按钮类型 */
  buttonType?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  /** 按钮尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 是否为危险按钮 */
  danger?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否块级元素 */
  block?: boolean;
  /** 按钮图标 */
  icon?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
  /** HTML 按钮类型 */
  type?: 'submit' | 'button' | 'reset';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  buttonType = 'default',
  size = 'middle',
  danger = false,
  loading = false,
  block = false,
  icon,
  className,
  children,
  disabled,
  type,
  ...rest
}, ref) => {
  const LoadingIcon = () => (
    <svg 
      className={styles.spinner} 
      viewBox="0 0 1024 1024" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M512 64c-247.4 0-448 200.6-448 448s200.6 448 448 448 448-200.6 448-448-200.6-448-448-448zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
    </svg>
  );

  return (
    <button
      ref={ref}
      type={type}
      className={classNames(
        styles.button,
        styles[buttonType],
        styles[size],
        {
          [styles.danger]: danger,
          [styles.loading]: loading,
          [styles.block]: block,
        },
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <LoadingIcon />}
      {!loading && icon}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
