'use client'

import styled from 'styled-components'
import { useTheme } from 'styled-components'

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.default};
`

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid ${({ theme }) => theme.colors.primary.light};
  border-top-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export default function Loading() {
  // 确保主题可用
  const theme = useTheme()
  
  if (!theme) {
    return null // 或者返回一个基础的加载状态
  }

  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  )
}