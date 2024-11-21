import { LoginFormData } from '@/pages/Auth/types';
import { message } from 'antd';
import { AES, enc } from 'crypto-js';
import { encryptPassword } from '@/utils/Auth/security';

// 登录安全配置
const LOGIN_SECURITY_CONFIG = {
  MAX_ATTEMPTS: 5,                // 最大尝试次数
  BLOCK_DURATION: 300,            // 封禁时长（秒）
  MIN_PASSWORD_LENGTH: 8,         // 最小密码长度
  REMEMBER_ME_DURATION: 7,        // 记住登录状态持续时间（天）
  SESSION_TIMEOUT: 30 * 60 * 1000,// 会话超时时间（30分钟）
  ENCRYPTION_KEY: process.env.REACT_APP_ENCRYPTION_KEY || 'default-key',
  PASSWORD_RULES: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  }
};

// 登录尝试记录接口
interface LoginAttempt {
  timestamp: number;
  ip: string;
  identifier: string;
  userAgent: string;
  geoLocation?: string;
}

// 登录尝试管理器
export class LoginAttemptManager {
  private static readonly STORAGE_KEY = 'login_attempts';
  private static readonly CLEANUP_INTERVAL = 24 * 60 * 60 * 1000; // 24小时
  private static readonly IP_CACHE_KEY = 'user_ip';
  private static readonly GEO_CACHE_KEY = 'user_geo';

  // 获取登录尝试记录
  static getAttempts(): LoginAttempt[] {
    try {
      const encryptedAttempts = localStorage.getItem(this.STORAGE_KEY);
      if (!encryptedAttempts) return [];
      
      const decrypted = AES.decrypt(
        encryptedAttempts,
        LOGIN_SECURITY_CONFIG.ENCRYPTION_KEY
      ).toString(enc.Utf8);
      
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to get login attempts:', error);
      return [];
    }
  }

  // 添加登录尝试记录
  static async addAttempt(identifier: string): Promise<void> {
    try {
      const attempts = this.getAttempts();
      const userAgent = navigator.userAgent;
      
      // 获取IP地址（实际项目中应从服务器获取）
      let ip = localStorage.getItem(this.IP_CACHE_KEY) || 'unknown';
      let geoLocation = localStorage.getItem(this.GEO_CACHE_KEY);

      if (!ip || ip === 'unknown') {
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          ip = data.ip;
          localStorage.setItem(this.IP_CACHE_KEY, ip);
        } catch (error) {
          console.error('Failed to get IP:', error);
        }
      }

      const attempt: LoginAttempt = {
        timestamp: Date.now(),
        ip,
        identifier,
        userAgent,
        geoLocation: geoLocation || undefined
      };

      attempts.push(attempt);

      // 加密存储
      const encrypted = AES.encrypt(
        JSON.stringify(attempts),
        LOGIN_SECURITY_CONFIG.ENCRYPTION_KEY
      ).toString();

      localStorage.setItem(this.STORAGE_KEY, encrypted);

      // 检查是否需要触发安全警告
      this.checkSecurityThreats(attempts, identifier);
    } catch (error) {
      console.error('Failed to add login attempt:', error);
    }
  }

  // 检查安全威胁
  private static checkSecurityThreats(attempts: LoginAttempt[], identifier: string): void {
    const recentAttempts = attempts.filter(
      attempt => Date.now() - attempt.timestamp < 3600000 // 1小时内
    );

    // 检查多IP登录
    const uniqueIPs = new Set(recentAttempts.map(a => a.ip)).size;
    if (uniqueIPs > 3) {
      message.warning('检测到多个IP地址的登录尝试，请注意账号安全');
    }

    // 检查不同设备登录
    const uniqueAgents = new Set(recentAttempts.map(a => a.userAgent)).size;
    if (uniqueAgents > 2) {
      message.warning('检测到多个设备的登录尝试，请注意账号安全');
    }
  }

  // 清理过期记录
  static cleanup(): void {
    try {
      const attempts = this.getAttempts();
      const now = Date.now();
      const validAttempts = attempts.filter(
        attempt => now - attempt.timestamp < this.CLEANUP_INTERVAL
      );

      const encrypted = AES.encrypt(
        JSON.stringify(validAttempts),
        LOGIN_SECURITY_CONFIG.ENCRYPTION_KEY
      ).toString();

      localStorage.setItem(this.STORAGE_KEY, encrypted);
    } catch (error) {
      console.error('Failed to cleanup login attempts:', error);
    }
  }

  // 检查是否应该封禁
  static shouldBlock(identifier: string): boolean {
    const attempts = this.getAttempts();
    const recentAttempts = attempts.filter(
      attempt => 
        attempt.identifier === identifier &&
        Date.now() - attempt.timestamp < LOGIN_SECURITY_CONFIG.BLOCK_DURATION * 1000
    );
    return recentAttempts.length >= LOGIN_SECURITY_CONFIG.MAX_ATTEMPTS;
  }

  // 获取剩余封禁时间
  static getRemainingBlockTime(identifier: string): number {
    const attempts = this.getAttempts();
    const lastAttempt = attempts
      .filter(attempt => attempt.identifier === identifier)
      .sort((a, b) => b.timestamp - a.timestamp)[0];

    if (!lastAttempt) return 0;

    const elapsed = (Date.now() - lastAttempt.timestamp) / 1000;
    const remaining = LOGIN_SECURITY_CONFIG.BLOCK_DURATION - elapsed;
    return remaining > 0 ? Math.ceil(remaining) : 0;
  }
}

// 密码强度评估器
export class PasswordStrengthEvaluator {
  static evaluate(password: string): {
    score: number;
    feedback: string[];
    isStrong: boolean;
  } {
    const feedback: string[] = [];
    let score = 0;

    // 长度检查
    if (password.length >= LOGIN_SECURITY_CONFIG.PASSWORD_RULES.minLength) {
      score += 2;
    } else {
      feedback.push(`密码长度至少需要${LOGIN_SECURITY_CONFIG.PASSWORD_RULES.minLength}个字符`);
    }

    // 复杂度检查
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // 特殊模式检查
    if (/(.)\1{2,}/.test(password)) {
      score -= 1;
      feedback.push('避免使用重复的字符');
    }

    if (/^(?:abc|123|password|admin|qwerty)/i.test(password)) {
      score -= 2;
      feedback.push('避免使用常见的密码模式');
    }

    return {
      score: Math.max(0, Math.min(5, score)),
      feedback,
      isStrong: score >= 4
    };
  }
}

// 表单验证器
export class LoginFormValidator {
  static validate(data: LoginFormData): Record<string, string> {
    const errors: Record<string, string> = {};

    // 验证标识符
    if (!data.identifier.trim()) {
      errors.identifier = '请输入用户名或邮箱';
    } else if (data.identifier.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.identifier)) {
        errors.identifier = '请输入有效的邮箱地址';
      }
    } else {
      const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
      if (!usernameRegex.test(data.identifier)) {
        errors.identifier = '用户名格式不正确';
      }
    }

    // 验证密码
    if (!data.password) {
      errors.password = '请输入密码';
    } else if (data.password.length < LOGIN_SECURITY_CONFIG.MIN_PASSWORD_LENGTH) {
      errors.password = `密码长度不能小于${LOGIN_SECURITY_CONFIG.MIN_PASSWORD_LENGTH}位`;
    }

    return errors;
  }
}

// 会话管理器
export class SessionManager {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly EXPIRATION_KEY = 'token_expiration';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  // 设置会话
  static setSession(token: string, refreshToken?: string): void {
    const expirationDate = new Date();
    expirationDate.setTime(
      expirationDate.getTime() + LOGIN_SECURITY_CONFIG.SESSION_TIMEOUT
    );

    // 加密存储
    const encryptedToken = AES.encrypt(
      token,
      LOGIN_SECURITY_CONFIG.ENCRYPTION_KEY
    ).toString();

    localStorage.setItem(this.TOKEN_KEY, encryptedToken);
    localStorage.setItem(this.EXPIRATION_KEY, expirationDate.toISOString());

    if (refreshToken) {
      const encryptedRefreshToken = AES.encrypt(
        refreshToken,
        LOGIN_SECURITY_CONFIG.ENCRYPTION_KEY
      ).toString();
      localStorage.setItem(this.REFRESH_TOKEN_KEY, encryptedRefreshToken);
    }
  }

  // 获取会话token
  static getToken(): string | null {
    try {
      const encryptedToken = localStorage.getItem(this.TOKEN_KEY);
      if (!encryptedToken) return null;

      return AES.decrypt(
        encryptedToken,
        LOGIN_SECURITY_CONFIG.ENCRYPTION_KEY
      ).toString(enc.Utf8);
    } catch (error) {
      console.error('Failed to get token:', error);
      return null;
    }
  }

  // 检查会话是否有效
  static isSessionValid(): boolean {
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    if (!expiration) return false;

    return new Date(expiration) > new Date();
  }

  // 清除会话
  static clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRATION_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}

// 安全的登录处理
export const secureLogin = async (
  data: LoginFormData
): Promise<{ encryptedData: LoginFormData; timestamp: number }> => {
  // 加密密码
  const encryptedPassword = await encryptPassword(data.password);
  
  // 添加时间戳和随机数防重放
  const timestamp = Date.now();
  const nonce = Math.random().toString(36).substring(7);

  const encryptedData = {
    ...data,
    password: encryptedPassword,
    nonce,
    timestamp
  };

  return {
    encryptedData,
    timestamp
  };
}; 