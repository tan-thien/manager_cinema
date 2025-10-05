import type { Movie } from "./Movie";

export interface News {
  id: string;              // từ _id
  TieuDe: string;
  NoiDung: string;
  AnhTinTuc: string;
  MaPhim: string | Movie;  // có thể populate phim
  TrangThai: boolean;
  createdAt?: string;
  updatedAt?: string;
}
