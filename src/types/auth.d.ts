export interface VerificationCodeResponse {
  success: boolean;
  message: string;
  data?: {
    expiresIn?: number;
    timestamp?: number;
  };
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  data?: {
    redirectUrl?: string;
    token?: string;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: ApiError;
} 