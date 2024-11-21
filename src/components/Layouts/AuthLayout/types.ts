import { ReactNode } from 'react';

export interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  headerProps?: AuthHeaderProps;
  footerProps?: AuthFooterProps;
  className?: string;
  contentWidth?: number | string;
}

export interface AuthHeaderProps {
  logo?: string;
  title?: string;
  className?: string;
}

export interface AuthFooterProps {
  copyright?: string;
  links?: Array<{
    key: string;
    title: string;
    href: string;
  }>;
  className?: string;
}
