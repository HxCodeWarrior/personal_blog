import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

interface LabelGroupProps {
  children: React.ReactNode;
  /** 标签间距 */
  spacing?: number;
  /** 是否允许换行 */
  wrap?: boolean;
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 自定义类名 */
  className?: string;
}

const GroupWrapper = styled(Box, {
  shouldForwardProp: (prop) => !['spacing', 'wrap', 'align'].includes(prop as string),
})<{ spacing: number; wrap: boolean; align: string }>(({ spacing, wrap, align }) => ({
  display: 'flex',
  flexWrap: wrap ? 'wrap' : 'nowrap',
  gap: spacing * 8,
  justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
  alignItems: 'center',
}));

const LabelGroup: React.FC<LabelGroupProps> = ({
  children,
  spacing = 1,
  wrap = true,
  align = 'left',
  className,
}) => {
  return (
    <GroupWrapper
      spacing={spacing}
      wrap={wrap}
      align={align}
      className={className}
    >
      {children}
    </GroupWrapper>
  );
};

export default LabelGroup; 