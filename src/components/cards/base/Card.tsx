'use client'
import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { Theme } from '@mui/material/styles';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass';
  loading?: boolean;
  hover?: boolean;
  fullHeight?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

interface StyledCardProps {
  isGlass?: boolean;
  isHoverable?: boolean;
  isFullHeight?: boolean;
  isClickable?: boolean;
  theme?: Theme;
}

interface StyleProps extends StyledCardProps {
  theme: Theme;
}

const StyledCard = styled.div<StyledCardProps>`
  background: ${(props: StyleProps) => props.isGlass 
    ? 'rgba(255, 255, 255, 0.05)'
    : props.theme.palette?.background?.paper || '#fff'};
  border-radius: ${(props: StyleProps) => props.theme.shape?.borderRadius || '8px'};
  box-shadow: ${(props: StyleProps) => props.theme.shadows?.[1] || '0 2px 8px rgba(0, 0, 0, 0.1)'};
  backdrop-filter: ${(props: StyleProps) => props.isGlass ? 'blur(10px)' : 'none'};
  border: 1px solid ${(props: StyleProps) => props.isGlass 
    ? 'rgba(255, 255, 255, 0.1)'
    : props.theme.palette?.divider || 'rgba(0, 0, 0, 0.12)'};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  height: ${(props: StyleProps) => props.isFullHeight ? '100%' : 'auto'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: ${(props: StyleProps) => props.isClickable ? 'pointer' : 'default'};

  ${(props: StyleProps) => props.isHoverable && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.theme.shadows?.[8] || '0 8px 24px rgba(0, 0, 0, 0.12)'};
    }
  `}
`;

const LoadingOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
} = ({
  children,
  className,
  variant = 'default',
  loading = false,
  hover = true,
  fullHeight = false,
  clickable = false,
  onClick,
}) => {
  return (
    <StyledCard
      className={className}
      isGlass={variant === 'glass'}
      isHoverable={hover}
      isFullHeight={fullHeight}
      isClickable={clickable}
      onClick={clickable ? onClick : undefined}
    >
      {loading && (
        <LoadingOverlay>
          {/* Add your loading spinner component here */}
        </LoadingOverlay>
      )}
      {children}
    </StyledCard>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card; 