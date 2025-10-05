// src/types/Movie.ts
import type { Genre } from "./Genre";

export interface Movie {
  id: string;              // chuẩn hóa từ _id
  TenPhim: string;
  MoTa: string;
  ThoiLuong: number;
  Ngay: string;            // ISO string, khi cần thì convert sang Date trong FE
  AnhPhim: string;
  trailerUrl?: string;
  TrangThai: boolean;
  MaTheLoai: string | Genre; // có thể là id hoặc object Genre (nếu populate)
}
