import zxcvbn from 'zxcvbn'; // 需要安装 zxcvbn 包进行密码强度评估

// 密码强度评估
export const evaluatePasswordStrength = (password: string) => {
  const result = zxcvbn(password);
  return {
    score: result.score,          // 0-4 分
    feedback: result.feedback,    // 改进建议
    crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second,
    warnings: result.feedback.warning,
    suggestions: result.feedback.suggestions
  };
};

// 检查密码是否包含常见密码
const commonPasswords = new Set([
  'password123', 'admin123', '123456', 'qwerty',
  // ... 添加更多常见密码
]);

// 检查密码复杂度
export const validatePasswordComplexity = (password: string) => {
  const minLength = 8;
  const errors: string[] = [];
  
  if (password.length < minLength) {
    errors.push(`密码长度至少需要${minLength}个字符`);
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('密码需要包含大写字母');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('密码需要包含小写字母');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('密码需要包含数字');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('密码需要包含特殊字符');
  }
  
  if (commonPasswords.has(password.toLowerCase())) {
    errors.push('请勿使用常见密码');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// 检查用户名与密码相关性
export const validatePasswordUsername = (password: string, username: string) => {
  const lowercasePassword = password.toLowerCase();
  const lowercaseUsername = username.toLowerCase();
  
  if (lowercasePassword.includes(lowercaseUsername) || 
      lowercaseUsername.includes(lowercasePassword)) {
    return '密码不能包含用户名，用户名也不能包含密码';
  }
  
  return null;
};

// 检查密码是否包含连续字符
export const checkSequentialChars = (password: string) => {
  const sequences = [
    '1234567890',
    'abcdefghijklmnopqrstuvwxyz',
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
  ];
  
  const lowercasePassword = password.toLowerCase();
  
  for (const sequence of sequences) {
    for (let i = 0; i < sequence.length - 2; i++) {
      const triple = sequence.slice(i, i + 3);
      if (lowercasePassword.includes(triple)) {
        return '密码不能包含连续的字符序列';
      }
    }
  }
  
  return null;
};

// 检查重复字符
export const checkRepeatingChars = (password: string) => {
  const repeatingPattern = /(.)\1{2,}/;
  if (repeatingPattern.test(password)) {
    return '密码不能包含连续重复的字符';
  }
  return null;
};

// 密码熵计算
export const calculatePasswordEntropy = (password: string) => {
  const charsets = {
    numbers: /[0-9]/.test(password),
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
  
  let poolSize = 0;
  if (charsets.numbers) poolSize += 10;
  if (charsets.lowercase) poolSize += 26;
  if (charsets.uppercase) poolSize += 26;
  if (charsets.special) poolSize += 32;
  
  const entropy = Math.log2(Math.pow(poolSize, password.length));
  return entropy;
}; 