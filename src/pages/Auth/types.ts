export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface LoginFormData {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    refreshToken?: string;
    user: UserProfile;
  };
}

export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  identifier?: string;
  rememberMe?: string;
  [key: string]: string | undefined;
}

export type SocialProvider = 'google' | 'github' | 'twitter';

export interface AuthState {
  user: {
    id: string;
    username: string;
    email: string;
    avatar?: string;
  } | null;
  token: string | null;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    refreshToken?: string;
    user: UserProfile;
  };
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordData {
  email: string;
  code: string;
  newPassword: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
}
