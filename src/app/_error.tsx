'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { Navigation } from '@/components/Navigation'

interface ErrorProps {
  error: Error & { digest?: string; statusCode?: number }
  reset: () => void
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  const [retryCount, setRetryCount] = useState(0)
  const [isReporting, setIsReporting] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // 错误日志上报
    const reportError = async () => {
      setIsReporting(true)
      try {
        // 自定义错误上报
        await fetch('/api/error-tracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: error.message,
            stack: error.stack,
            digest: error.digest,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (reportError) {
        console.error('Error reporting failed:', reportError)
      } finally {
        setIsReporting(false)
      }
    }

    reportError()
  }, [error, retryCount])

  // 重试处理
  const handleRetry = async () => {
    setRetryCount(prev => prev + 1)
    try {
      await reset()
    } catch (retryError) {
      console.error('Retry failed:', retryError)
    }
  }

  // 获取错误提示信息
  const getErrorMessage = () => {
    const statusCode = error.statusCode || 500
    if (statusCode === 404) {
      return '抱歉，请求的页面不存在'
    }
    if (statusCode === 403) {
      return '抱歉，您没有权限访问此页面'
    }
    if (statusCode >= 500) {
      return '抱歉，服务器出现了问题'
    }
    return error.message || '应用程序遇到了意外错误'
  }

  return (
    <AnimatePresence mode="wait">
      <ErrorContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <ErrorContent>
          <ErrorIconWrapper
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
          >
            <ErrorIcon />
            {isReporting && (
              <ReportingIndicator
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            )}
          </ErrorIconWrapper>

          <ErrorInfo
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ErrorTitle>{getErrorMessage()}</ErrorTitle>
            <ErrorMessage>
              {error.digest && (
                <ErrorDigest>
                  错误代码: {error.digest}
                  <CopyButton
                    onClick={() => navigator.clipboard.writeText(error.digest || '')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    复制
                  </CopyButton>
                </ErrorDigest>
              )}
              {retryCount > 0 && (
                <RetryCount>重试次数: {retryCount}</RetryCount>
              )}
            </ErrorMessage>
          </ErrorInfo>

          <ErrorActions
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <RetryButton
              onClick={handleRetry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isReporting || retryCount >= 3}
            >
              {isReporting ? '错误上报中...' : '重试'}
            </RetryButton>
            <Navigation />
          </ErrorActions>

          {process.env.NODE_ENV === 'development' && (
            <ErrorStack
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.5 }}
            >
              <ErrorStackHeader>
                <ErrorStackTitle>错误详情</ErrorStackTitle>
                <ExpandButton
                  onClick={() => setIsExpanded(!isExpanded)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isExpanded ? '收起' : '展开'}
                </ExpandButton>
              </ErrorStackHeader>
              <AnimatePresence>
                {isExpanded && (
                  <motion.pre
                    className="error-stack-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      maxHeight: '200px',
                      overflowY: 'auto',
                    }}
                  >
                    {error.stack}
                  </motion.pre>
                )}
              </AnimatePresence>
            </ErrorStack>
          )}
        </ErrorContent>
      </ErrorContainer>
    </AnimatePresence>
  )
}

// 优化后的样式组件
const ErrorContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background.default};
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
`

const ErrorContent = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 40px;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  ${({ theme }) => theme.effects.glassMorphism}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px;
  }
`

const ErrorIconWrapper = styled(motion.div)`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
`

const ErrorIcon = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.gradients.error};
  mask: url('/icons/error.svg') no-repeat center;
  mask-size: contain;
`

const ErrorInfo = styled(motion.div)`
  text-align: center;
  margin-bottom: 32px;
`

const ErrorTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`

const ErrorDigest = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.disabled};
  margin-top: 8px;
`

const ErrorActions = styled(motion.div)`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
`

const Button = styled(motion.button)`
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
`

const RetryButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`

const ErrorStack = styled(motion.div)`
  margin-top: 40px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background.subtle};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`

const ErrorStackTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 8px;
`

const ErrorStackContent = styled.pre`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.disabled};
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 200px;
  overflow-y: auto;
  ${({ theme }) => theme.mixins.scrollbar}
`

const ReportingIndicator = styled(motion.div)`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 10px;
  height: 10px;
  background: ${({ theme }) => theme.colors.status.warning};
  border-radius: 50%;
`

const CopyButton = styled(motion.button)`
  margin-left: 8px;
  padding: 4px 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.primary.main};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrast};
  }
`

const RetryCount = styled.div`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ErrorStackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const ExpandButton = styled(motion.button)`
  padding: 4px 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.subtle};
  }
`

export default ErrorPage