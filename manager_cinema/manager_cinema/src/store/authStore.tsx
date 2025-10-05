// store/authStore.ts
import { create } from 'zustand';
import type { Account } from '../types/Account';

interface AuthState {
  token: string | null;
  user: Account | null;
  setAuth: (token: string, user: Account) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'), // Load từ localStorage khi khởi động
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },
}));
