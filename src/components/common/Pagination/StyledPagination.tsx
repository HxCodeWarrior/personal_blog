'use client'
import React from 'react';
import { Pagination, ConfigProvider } from 'antd';
import type { PaginationProps } from 'antd';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const paginationStyles = css`
  .ant-pagination-item {
    border-radius: 8px;
    transition: all 0.3s ease;
    overflow: hidden;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &.ant-pagination-item-active {
      background: linear-gradient(120deg, #2196F3, #00BCD4);
      border: none;

      a {
        color: white !important;
      }
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    button {
      border-radius: 8px;
    }
  }
`;

const PaginationWrapper = styled.div`
  ${paginationStyles}
`;

interface CustomPaginationProps extends PaginationProps {
  className?: string;
}

const StyledPagination: React.FC<CustomPaginationProps> = ({ className, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: 'transparent',
            itemSize: 32,
            borderRadius: 8,
          },
        },
      }}
    >
      <PaginationWrapper className={className}>
        <Pagination {...props} />
      </PaginationWrapper>
    </ConfigProvider>
  );
};

export default StyledPagination; 