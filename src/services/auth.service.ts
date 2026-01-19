import { apiClient } from '../config/api';
import { AuthResponse, LoginRequest } from '../types/api';

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email: credentials.email,
      password: credentials.password
    });
    const data = response.data;
    
    // Salva tokens no localStorage
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('role', data.role);
    localStorage.setItem('ownerId', data.ownerId);
    
    return data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('ownerId');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },

  isAdmin: (): boolean => {
    const role = localStorage.getItem('role');
    if (!role) return false;
    // Normaliza o role (remove "ROLE_" se existir)
    const normalizedRole = role.toUpperCase().replace(/^ROLE_/, '');
    return normalizedRole === 'ADMIN';
  },

  getRole: (): string | null => {
    return localStorage.getItem('role');
  },

  getToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },
};
