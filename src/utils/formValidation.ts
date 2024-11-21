export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    return { isValid: false, message: '请输入邮箱地址' }
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, message: '请输入有效的邮箱地址' }
  }
  return { isValid: true }
}

export const validateMessage = (message: string): ValidationResult => {
  if (!message) {
    return { isValid: false, message: '请输入留言内容' }
  }
  if (message.length < 10) {
    return { isValid: false, message: '留言内容至少10个字符' }
  }
  return { isValid: true }
} 