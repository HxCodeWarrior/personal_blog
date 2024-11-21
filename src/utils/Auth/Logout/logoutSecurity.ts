import { AES, enc, lib, SHA256 } from 'crypto-js';

// 安全配置
const LOGOUT_SECURITY_CONFIG = {
  CLEANUP_DELAY: 2000,        // 清理延迟时间
  TOKEN_BLACKLIST_KEY: 'token_blacklist',
  SESSION_CLEANUP_TARGETS: [
    'token',
    'tokenExpiration',
    'user',
    'login_attempts',
    'remember_me',
    'auth_state',
    'refresh_token',
    'session_id'
  ],
  BLACKLIST_ENTRY_TTL: 24 * 60 * 60 * 1000, // 24小时
  MAX_BLACKLIST_SIZE: 1000,                  // 最大黑名单条目数
  SECURE_CLEANUP_RETRIES: 3,                 // 安全清理重试次数
};

interface BlacklistEntry {
  tokenHash: string;         // 令牌哈希
  timestamp: number;         // 失效时间戳
  deviceInfo?: string;       // 设备信息
  logoutReason?: string;     // 退出原因
}

// 会话清理工具
export class SessionCleanup {
  // 安全地清理本地存储
  static cleanLocalStorage(): void {
    try {
      // 先记录需要清理的键
      const keysToClean = LOGOUT_SECURITY_CONFIG.SESSION_CLEANUP_TARGETS;
      
      // 对每个键进行安全清理
      keysToClean.forEach(key => {
        // 先覆盖数据，再删除
        localStorage.setItem(key, this.generateRandomString(32));
        localStorage.removeItem(key);
      });
      
      // 验证清理结果
      const remainingKeys = keysToClean.filter(key => localStorage.getItem(key) !== null);
      if (remainingKeys.length > 0) {
        throw new Error(`Failed to clean keys: ${remainingKeys.join(', ')}`);
      }
    } catch (error) {
      console.error('LocalStorage cleanup failed:', error);
      // 如果常规清理失败，尝试强制清理
      this.forceCleanStorage();
    }
  }
  
  // 强制清理存储
  private static forceCleanStorage(): void {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.error('Force cleanup failed:', error);
      throw new Error('无法清理本地存储');
    }
  }
  
  // 清理会话存储
  static cleanSessionStorage(): void {
    try {
      const randomData = this.generateRandomString(32);
      // 覆盖所有会话数据
      Object.keys(sessionStorage).forEach(key => {
        sessionStorage.setItem(key, randomData);
        sessionStorage.removeItem(key);
      });
    } catch (error) {
      console.error('SessionStorage cleanup failed:', error);
      sessionStorage.clear();
    }
  }
  
  // 清理Cookie
  static cleanCookies(): void {
    try {
      document.cookie.split(";").forEach(cookie => {
        const [name] = cookie.split("=");
        // 先覆盖cookie值，再使其过期
        document.cookie = `${name}=${this.generateRandomString(32)};path=/`;
        document.cookie = `${name}=;expires=${new Date(0).toUTCString()};path=/`;
      });
    } catch (error) {
      console.error('Cookie cleanup failed:', error);
    }
  }
  
  // 将token加入黑名单
  static async addTokenToBlacklist(token: string, reason?: string): Promise<void> {
    try {
      const blacklist = await this.getTokenBlacklist();
      
      // 生成token哈希
      const tokenHash = SHA256(token).toString();
      
      // 获取设备信息
      const deviceInfo = this.getDeviceInfo();
      
      // 添加新条目
      blacklist.push({
        tokenHash,
        timestamp: Date.now(),
        deviceInfo,
        logoutReason: reason
      });
      
      // 清理过期条目
      this.cleanupBlacklist(blacklist);
      
      // 加密存储黑名单
      await this.secureStoreBlacklist(blacklist);
      
    } catch (error) {
      console.error('Failed to add token to blacklist:', error);
      throw error;
    }
  }
  
  // 获取token黑名单
  private static async getTokenBlacklist(): Promise<BlacklistEntry[]> {
    try {
      const encryptedBlacklist = localStorage.getItem(LOGOUT_SECURITY_CONFIG.TOKEN_BLACKLIST_KEY);
      if (!encryptedBlacklist) return [];
      
      // 解密黑名单
      const decrypted = await this.decryptBlacklist(encryptedBlacklist);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to get token blacklist:', error);
      return [];
    }
  }
  
  // 清理过期的黑名单记录
  private static cleanupBlacklist(blacklist: BlacklistEntry[]): BlacklistEntry[] {
    const now = Date.now();
    
    // 移除过期条目
    const validBlacklist = blacklist.filter(
      entry => now - entry.timestamp < LOGOUT_SECURITY_CONFIG.BLACKLIST_ENTRY_TTL
    );
    
    // 如果黑名单太大，保留最新的条目
    if (validBlacklist.length > LOGOUT_SECURITY_CONFIG.MAX_BLACKLIST_SIZE) {
      validBlacklist.sort((a, b) => b.timestamp - a.timestamp);
      validBlacklist.length = LOGOUT_SECURITY_CONFIG.MAX_BLACKLIST_SIZE;
    }
    
    return validBlacklist;
  }
  
  // 安全存储黑名单
  private static async secureStoreBlacklist(blacklist: BlacklistEntry[]): Promise<void> {
    try {
      const blacklistString = JSON.stringify(blacklist);
      const encryptionKey = this.generateEncryptionKey();
      
      // 加密黑名单
      const encrypted = AES.encrypt(blacklistString, encryptionKey).toString();
      
      localStorage.setItem(LOGOUT_SECURITY_CONFIG.TOKEN_BLACKLIST_KEY, encrypted);
    } catch (error) {
      console.error('Failed to store blacklist:', error);
      throw error;
    }
  }
  
  // 解密黑名单
  private static async decryptBlacklist(encrypted: string): Promise<string> {
    try {
      const encryptionKey = this.generateEncryptionKey();
      const decrypted = AES.decrypt(encrypted, encryptionKey);
      return decrypted.toString(enc.Utf8);
    } catch (error) {
      console.error('Failed to decrypt blacklist:', error);
      throw error;
    }
  }
  
  // 生成加密密钥
  private static generateEncryptionKey(): string {
    // 使用设备指纹和其他信息生成密钥
    const deviceInfo = this.getDeviceInfo();
    return SHA256(deviceInfo).toString();
  }
  
  // 获取设备信息
  private static getDeviceInfo(): string {
    const info = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    return JSON.stringify(info);
  }
  
  // 生成随机字符串
  private static generateRandomString(length: number): string {
    return lib.WordArray.random(length).toString();
  }
  
  // 执行完整的清理流程
  static async performFullCleanup(token: string, reason?: string): Promise<void> {
    let retryCount = 0;
    const maxRetries = LOGOUT_SECURITY_CONFIG.SECURE_CLEANUP_RETRIES;
    
    while (retryCount < maxRetries) {
      try {
        // 将当前token加入黑名单
        await this.addTokenToBlacklist(token, reason);
        
        // 清理所有存储
        this.cleanLocalStorage();
        this.cleanSessionStorage();
        this.cleanCookies();
        
        // 验证清理结果
        if (this.verifyCleanup()) {
          return; // 清理成功
        }
        
        retryCount++;
      } catch (error) {
        console.error(`Cleanup attempt ${retryCount + 1} failed:`, error);
        retryCount++;
        
        if (retryCount === maxRetries) {
          // 最后尝试强制清理
          this.forceCleanStorage();
          throw new Error('清理过程异常，已强制清理');
        }
      }
    }
  }
  
  // 验证清理结果
  private static verifyCleanup(): boolean {
    // 验证关键存储项是否已清理
    const storageClean = LOGOUT_SECURITY_CONFIG.SESSION_CLEANUP_TARGETS.every(
      key => !localStorage.getItem(key) && !sessionStorage.getItem(key)
    );
    
    // 验证cookie是否已清理
    const cookiesClean = document.cookie.split(';').length === 0;
    
    return storageClean && cookiesClean;
  }
} 