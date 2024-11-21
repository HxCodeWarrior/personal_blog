import axios, { AxiosInstance } from 'axios';
import { LoginFormData, LoginResponse, SocialProvider, ResetPasswordResponse } from '@/pages/Auth/types';

interface AuthService {
  login(data: LoginFormData): Promise<LoginResponse>;
  socialLogin(provider: SocialProvider): Promise<LoginResponse>;
  sendVerificationCode(email: string): Promise<{ success: boolean; message: string }>;
  resetPassword(data: { 
    email: string; 
    code: string; 
    newPassword: string 
  }): Promise<ResetPasswordResponse>;
}

class AuthServiceImpl implements AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async login(data: LoginFormData): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>('/auth/login', data);
    return response.data;
  }

  async socialLogin(provider: SocialProvider): Promise<LoginResponse> {
    const response = await this.api.post<LoginResponse>(`/auth/${provider}/login`);
    return response.data;
  }

  async sendVerificationCode(email: string): Promise<{ success: boolean; message: string }> {
    const response = await this.api.post('/auth/send-verification', { email });
    return response.data;
  }

  async resetPassword(data: { 
    email: string; 
    code: string; 
    newPassword: string 
  }): Promise<ResetPasswordResponse> {
    const response = await this.api.post('/auth/reset-password', data);
    return response.data;
  }
}

const authService = new AuthServiceImpl();
export default authService; 