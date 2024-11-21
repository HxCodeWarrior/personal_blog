import React, { useMemo, CSSProperties } from 'react';
import classNames from 'classnames';
import { AuthHeader } from './components/AuthHeader';
import { AuthFooter } from './components/AuthFooter';
import { AuthBackground } from './components/AuthBackground';
import { AuthLayoutProps } from './types';
import styles from './AuthLayout.module.scss';

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showHeader = true,
  showFooter = true,
  headerProps,
  footerProps,
  className,
  contentWidth,
}) => {
  const containerStyle = useMemo(() => ({
    '--content-width': typeof contentWidth === 'number' 
      ? `${contentWidth}px` 
      : contentWidth
  } as CSSProperties), [contentWidth]);

  return (
    <div className={classNames(styles.authLayout, className)}>
      <AuthBackground />
      
      {showHeader && <AuthHeader {...headerProps} />}
      
      <main className={styles.container} style={containerStyle}>
        <div className={styles.content}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {children}
        </div>
      </main>

      {showFooter && <AuthFooter {...footerProps} />}
    </div>
  );
};

export default AuthLayout;
