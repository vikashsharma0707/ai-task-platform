import api from './api';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  async register(data: RegisterPayload): Promise<AuthResponse> {
    const res = await api.post('/auth/register', data);
    return res.data;
  },

  async login(data: LoginPayload): Promise<AuthResponse> {
    const res = await api.post('/auth/login', data);
    return res.data;
  },

  async getProfile(): Promise<AuthResponse['user']> {
    const res = await api.get('/auth/profile');
    return res.data;
  },
};
