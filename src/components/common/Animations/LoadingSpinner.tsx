'use client'

import styled, { keyframes } from 'styled-components'

interface LoadingSpinnerProps {
  size?: number
  color?: string
}

export const LoadingSpinner = ({ size = 40, color }: LoadingSpinnerProps) => {
  return (
    <SpinnerWrapper size={size}>
      <Spinner color={color} />
    </SpinnerWrapper>
  )
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

interface SpinnerWrapperProps {
  size: number
}

const SpinnerWrapper = styled.div<SpinnerWrapperProps>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface SpinnerProps {
  color?: string
}

const Spinner = styled.div<SpinnerProps>`
  width: 100%;
  height: 100%;
  border: 3px solid ${({ theme, color }) => color || theme.colors.primary.main}20;
  border-top-color: ${({ theme, color }) => color || theme.colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
` 