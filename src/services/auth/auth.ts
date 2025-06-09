import { axiosInstance } from '../../lib/axios';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '../../types/auth';

export type UserRole = 'admin' | 'judge' | string;

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      '/api/v1/auth/login',
      data
    );
    return response.data;
  },

  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      '/api/v1/auth/register',
      data
    );
    return response.data;
  },

  async getRole(): Promise<User> {
    const response = await axiosInstance.get<User>('/api/v1/auth/get_role');
    return response.data;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('user_role');
  },

  setAuthData(data: LoginResponse) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('token_type', data.token_type);
  },

  getAuthData() {
    const access_token = localStorage.getItem('access_token');
    const token_type = localStorage.getItem('token_type');
    return {
      access_token,
      token_type: token_type as 'bearer' | null,
    };
  },

  isAuthenticated(): boolean {
    return !!this.getAuthData().access_token;
  },
};
