import { AES, enc } from 'crypto-js';

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || 'default-key';

/**
 * 密码加密
 * @param password 原始密码
 * @returns Promise<string>
 */
export const encryptPassword = async (password: string): Promise<string> => {
  try {
    // 使用 Web Crypto API 进行加密
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    console.error('Password encryption failed:', error);
    throw error;
  }
};

/**
 * 数据加密
 * @param data 待加密数据
 * @returns string
 */
export const encryptData = (data: string): string => {
  return AES.encrypt(data, ENCRYPTION_KEY).toString();
};

/**
 * 数据解密
 * @param encryptedData 加密数据
 * @returns string
 */
export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(enc.Utf8);
  } catch (error) {
    console.error('Data decryption failed:', error);
    throw error;
  }
};

/**
 * 生成安全的随机字符串
 * @param length 长度
 * @returns string
 */
export const generateSecureRandomString = (length: number): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * 生成防重放攻击的nonce
 * @returns string
 */
export const generateNonce = (): string => {
  return generateSecureRandomString(16);
};

/**
 * 生成时间戳
 * @returns number
 */
export const generateTimestamp = (): number => {
  return Date.now();
};

/**
 * 验证时间戳是否有效（防止重放攻击）
 * @param timestamp 时间戳
 * @param maxAge 最大有效期（毫秒）
 * @returns boolean
 */
export const isTimestampValid = (timestamp: number, maxAge: number = 5 * 60 * 1000): boolean => {
  const now = Date.now();
  return timestamp > now - maxAge && timestamp <= now;
};

/**
 * 混淆敏感数据
 * @param data 敏感数据
 * @returns string
 */
export const obfuscateSensitiveData = (data: string): string => {
  if (data.length <= 4) return '*'.repeat(data.length);
  const visibleStart = data.slice(0, 2);
  const visibleEnd = data.slice(-2);
  return `${visibleStart}${'*'.repeat(data.length - 4)}${visibleEnd}`;
};

/**
 * 安全地比较两个字符串（防止时序攻击）
 * @param a 字符串a
 * @param b 字符串b
 * @returns boolean
 */
export const secureCompare = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

/**
 * 生成密码哈希盐值
 * @returns string
 */
export const generateSalt = (): string => {
  return generateSecureRandomString(16);
};

/**
 * 使用盐值加密密码
 * @param password 密码
 * @param salt 盐值
 * @returns Promise<string>
 */
export const hashPasswordWithSalt = async (password: string, salt: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * 检查密码强度
 * @param password 密码
 * @returns {score: number, feedback: string[]}
 */
export const checkPasswordStrength = (password: string): { score: number; feedback: string[] } => {
  const feedback: string[] = [];
  let score = 0;

  // 长度检查
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // 复杂度检查
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // 特殊模式检查
  if (/(.)\1{2,}/.test(password)) {
    score--;
    feedback.push('避免使用重复的字符');
  }

  if (/^(?:abc|123|password|admin|qwerty)/i.test(password)) {
    score--;
    feedback.push('避免使用常见的密码模式');
  }

  return {
    score: Math.max(0, Math.min(5, score)),
    feedback
  };
}; 