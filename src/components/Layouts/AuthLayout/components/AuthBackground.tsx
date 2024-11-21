import React from 'react';
import classNames from 'classnames';
import styles from '../AuthLayout.module.scss';

interface AuthBackgroundProps {
  image?: string;
  className?: string;
}

export const AuthBackground: React.FC<AuthBackgroundProps> = ({
  image,
  className
}) => {
  return (
    <div 
      className={classNames(styles.background, className)}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    />
  );
};
