// 邮箱验证正则
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 密码验证正则（至少包含一个大写字母、一个小写字母、一个数字和一个特殊字符）
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

/**
 * 验证邮箱格式
 * @param email 待验证的邮箱
 * @returns boolean
 */
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * 验证密码强度
 * @param password 待验证的密码
 * @returns boolean
 */
export const validatePassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};

/**
 * 验证验证码格式（6位数字）
 * @param code 待验证的验证码
 * @returns boolean
 */
export const validateVerificationCode = (code: string): boolean => {
  return /^\d{6}$/.test(code);
};

/**
 * 密码强度评估
 * @param password 待评估的密码
 * @returns {score: number, feedback: string} score: 0-4, feedback: 提示信息
 */
export const assessPasswordStrength = (password: string): { score: number; feedback: string } => {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score < 2) {
    feedback.push('密码强度太弱');
  } else if (score < 4) {
    feedback.push('密码强度中等');
  } else {
    feedback.push('密码强度很强');
  }

  return {
    score: Math.min(4, Math.floor(score / 1.5)),
    feedback: feedback.join(', '),
  };
}; 