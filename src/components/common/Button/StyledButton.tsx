'use client'
import React, { useCallback } from 'react';
import classNames from 'classnames';
import styles from './StyledButton.module.scss';
import type { ButtonHTMLAttributes } from 'react';

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonVariant?: 'create' | 'view' | 'edit' | 'preview' | 'back' | 'delete';
  buttonType?: 'primary' | 'default' | 'text' | 'danger';
  icon?: React.ReactNode;
  size?: 'large' | 'middle' | 'small';
  loading?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({ 
  buttonVariant,
  className,
  children,
  onClick,
  buttonType = 'default',
  icon,
  size = 'middle',
  disabled,
  loading,
  type = 'button',
  ...props 
}) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    requestAnimationFrame(() => {
      onClick?.(e);
    });
  }, [onClick, disabled, loading]);

  const buttonClasses = classNames(
    styles.button,
    styles[size],
    {
      [styles.create]: buttonVariant === 'create',
      [styles.view]: buttonVariant === 'view',
      [styles.edit]: buttonVariant === 'edit',
      [styles.preview]: buttonVariant === 'preview',
      [styles.back]: buttonVariant === 'back',
      [styles.primary]: buttonType === 'primary',
      [styles.text]: buttonType === 'text',
      [styles.disabled]: disabled || loading,
      [styles.loading]: loading,
      [styles.iconOnly]: icon && !children,
    },
    className
  );

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.content}>{children}</span>}
      {loading && <span className={styles.loadingIcon}>...</span>}
    </button>
  );
};

export default React.memo(StyledButton); 