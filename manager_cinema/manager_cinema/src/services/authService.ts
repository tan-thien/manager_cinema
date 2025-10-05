// services/authService.ts
import type { Account } from '../types/Account';
import api from "../utils/api";

// const API_URL = 'http://localhost:3000'; // tùy backend


// services/authService.ts
export const login = async ({ TenTK, pass }: { TenTK: string; pass: string }) => {
  const res = await api.post("/login", { TenTK, pass });
  return res.data as {
    status: boolean;
    message: string;
    token: string;
    user: Account;
  };
};
