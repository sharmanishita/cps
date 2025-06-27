import axios from "axios";

const APP_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: APP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface Credentials {
  username: string;
  password: string;
  role: 'user' | 'admin';
  loginStreak?: number;
  lastLogin?: string;
}

export interface User {
  username: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export const login = (credentials: Credentials): Promise<{ data: AuthResponse }> =>
  api.post('/auth/login', credentials);

export const signup = (credentials: Credentials): Promise<{ data: AuthResponse }> =>
  api.post('/auth/register', credentials);

export const getCurrentMonthCalendar = () =>
  api.get('/calendar/current-month');

export const getCurrentUser = (): User | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return {
      username: decoded.username,
      role: decoded.role
    };
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

export default api;
