import axios from "axios";
import type { AxiosInstance } from "axios";


// Tạo 1 instance của axios
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // 👈 link backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động gắn token (nếu có)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
