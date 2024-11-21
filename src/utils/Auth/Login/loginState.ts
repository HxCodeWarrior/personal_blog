import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SessionManager } from './loginSecurity';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
}

interface LoginState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token: string | null;
  loginTime: number | null;
  lastActivity: number | null;
  sessionExpiration: string | null;
  setLoginState: (data: { user: UserProfile; token: string }) => void;
  logout: () => void;
  checkAuthStatus: () => boolean;
  updateLastActivity: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
}

export const useLoginStore = create<LoginState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      loginTime: null,
      lastActivity: null,
      sessionExpiration: null,

      setLoginState: (data) => {
        const { user, token } = data;
        const now = Date.now();
        
        SessionManager.setSession(token);
        
        set({
          isAuthenticated: true,
          user,
          token,
          loginTime: now,
          lastActivity: now,
          sessionExpiration: new Date(now + 30 * 60 * 1000).toISOString() // 30分钟后过期
        });
      },

      logout: () => {
        SessionManager.clearSession();
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          loginTime: null,
          lastActivity: null,
          sessionExpiration: null
        });
      },

      checkAuthStatus: () => {
        const state = get();
        const now = Date.now();

        // 检查会话是否过期
        if (state.sessionExpiration && new Date(state.sessionExpiration) < new Date()) {
          get().logout();
          return false;
        }

        // 检查最后活动时间
        if (state.lastActivity && now - state.lastActivity > 30 * 60 * 1000) {
          get().logout();
          return false;
        }

        // 检查token是否有效
        if (!SessionManager.isSessionValid()) {
          get().logout();
          return false;
        }

        return state.isAuthenticated && !!state.token;
      },

      updateLastActivity: () => {
        const now = Date.now();
        set({
          lastActivity: now,
          sessionExpiration: new Date(now + 30 * 60 * 1000).toISOString()
        });
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        return user?.permissions?.includes(permission) || false;
      },

      hasRole: (role: string) => {
        const { user } = get();
        return user?.roles?.includes(role) || false;
      },

      updateUserProfile: (updates: Partial<UserProfile>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...updates }
          });
        }
      }
    }),
    {
      name: 'login-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        loginTime: state.loginTime
      })
    }
  )
);

// 自动更新最后活动时间
if (typeof window !== 'undefined') {
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  events.forEach(event => {
    window.addEventListener(event, () => {
      useLoginStore.getState().updateLastActivity();
    });
  });
} 