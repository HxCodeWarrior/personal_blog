import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '请输入您的邮箱'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = '请输入留言内容'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSuccess(true)
      
      // 重置表单
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        setIsSuccess(false)
      }, 3000)
      
    } catch (error) {
      setErrors({ submit: '提交失败，请稍后重试' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <FormField>
            <Label>
              姓名
              <Required>*</Required>
            </Label>
            <InputWrapper $hasError={!!errors.name}>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: '' })
                }}
                placeholder="请输入您的姓名"
                disabled={isSubmitting}
              />
              <InputBorder />
            </InputWrapper>
            <AnimatePresence>
              {errors.name && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FiAlertCircle />
                  {errors.name}
                </ErrorMessage>
              )}
            </AnimatePresence>
          </FormField>

          <FormField>
            <Label>
              邮箱
              <Required>*</Required>
            </Label>
            <InputWrapper $hasError={!!errors.email}>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  if (errors.email) setErrors({ ...errors, email: '' })
                }}
                placeholder="请输入您的邮箱"
                disabled={isSubmitting}
              />
              <InputBorder />
            </InputWrapper>
            <AnimatePresence>
              {errors.email && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FiAlertCircle />
                  {errors.email}
                </ErrorMessage>
              )}
            </AnimatePresence>
          </FormField>
        </InputGroup>

        <FormField>
          <Label>主题</Label>
          <InputWrapper>
            <Input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="请输入主题（选填）"
              disabled={isSubmitting}
            />
            <InputBorder />
          </InputWrapper>
        </FormField>

        <FormField>
          <Label>
            留言内容
            <Required>*</Required>
          </Label>
          <TextAreaWrapper $hasError={!!errors.message}>
            <TextArea
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value })
                if (errors.message) setErrors({ ...errors, message: '' })
              }}
              placeholder="请输入您的留言内容"
              disabled={isSubmitting}
            />
            <TextAreaBorder />
            <CharCount>
              {formData.message.length}/500
            </CharCount>
          </TextAreaWrapper>
          <AnimatePresence>
            {errors.message && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <FiAlertCircle />
                {errors.message}
              </ErrorMessage>
            )}
          </AnimatePresence>
        </FormField>

        <SubmitButton
          type="submit"
          disabled={isSubmitting || isSuccess}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ButtonContent>
            {isSubmitting ? (
              <LoadingSpinner />
            ) : isSuccess ? (
              <>
                <FiCheck />
                发送成功
              </>
            ) : (
              <>
                <FiSend />
                发送消息
              </>
            )}
          </ButtonContent>
          <ButtonGlow />
        </SubmitButton>
      </Form>
    </FormContainer>
  )
}

const FormContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
`

const InputWrapper = styled.div<{ $hasError?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.background.input};
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  
  &:focus-within {
    background: ${({ theme }) => theme.colors.background.inputHover};
  }
`

const InputBorder = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  ${InputWrapper}:focus-within & {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary.main}20`};
  }
`

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

const TextAreaWrapper = styled(InputWrapper)`
  min-height: 150px;
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  outline: none;
  resize: vertical;
  line-height: 1.6;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`

const TextAreaBorder = styled(InputBorder)``

const CharCount = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.paper};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`

const ErrorMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.75rem;
  padding: 0.5rem;
  background: ${({ theme }) => `${theme.colors.error}10`};
  border-radius: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`

const SubmitButton = styled(motion.button)`
  position: relative;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrast};
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  align-self: flex-end;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

const ButtonGlow = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;

  ${SubmitButton}:hover &:not(:disabled) {
    transform: translateX(100%);
  }
`

const LoadingSpinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
` 