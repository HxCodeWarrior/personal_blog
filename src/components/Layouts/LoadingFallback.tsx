'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { LoadingSpinner } from '../common/Animations/LoadingSpinner'

export const LoadingFallback = () => {
  return (
    <LoadingContainer>
      <LoadingContent>
        <LoadingSpinner size={60} />
        <LoadingText>加载中...</LoadingText>
      </LoadingContent>
    </LoadingContainer>
  )
}

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.default};
`

const LoadingContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
` 