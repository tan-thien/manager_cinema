import api from "../utils/api"; // axios instance
import type { Account } from "../types/Account";

export const getAllUsers = async (): Promise<Account[]> => {
  const res = await api.get("/getall");
  // đảm bảo backend trả đúng dạng
  return res.data.accounts as Account[];
};
