import React from 'react';
import classNames from 'classnames';
import { AuthHeaderProps } from '../types';
import styles from '../AuthLayout.module.scss';

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  logo = '/logo.svg',
  title,
  className
}) => {
  return (
    <header className={classNames(styles.header, className)}>
      <div className={styles.logo}>
        <img src={logo} alt={title || 'Logo'} />
        {title && <h1>{title}</h1>}
      </div>
    </header>
  );
};
