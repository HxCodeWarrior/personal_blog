import React from 'react';
import classNames from 'classnames';
import { AuthFooterProps } from '../types';
import styles from '../AuthLayout.module.scss';

export const AuthFooter: React.FC<AuthFooterProps> = ({
  copyright = `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  links = [],
  className
}) => {
  return (
    <footer className={classNames(styles.footer, className)}>
      {links.length > 0 && (
        <div className={styles.links}>
          {links.map(({ key, title, href }) => (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          ))}
        </div>
      )}
      <p>{copyright}</p>
    </footer>
  );
};
