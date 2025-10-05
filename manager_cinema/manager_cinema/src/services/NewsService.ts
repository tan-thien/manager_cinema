import api from "../utils/api";
import type { News } from "../types/News";

// Lấy tất cả tin tức
export const getAllNews = async (): Promise<News[]> => {
  const res = await api.get("/news/getall");
  return res.data.data.map((n: any) => ({
    id: n._id,
    TieuDe: n.TieuDe,
    NoiDung: n.NoiDung,
    AnhTinTuc: n.AnhTinTuc,
    MaPhim: typeof n.MaPhim === "object" ? {
      id: n.MaPhim._id,
      TenPhim: n.MaPhim.TenPhim,
      AnhPhim: n.MaPhim.AnhPhim,
      MoTa: n.MaPhim.MoTa,
      ThoiLuong: n.MaPhim.ThoiLuong,
      Ngay: n.MaPhim.Ngay,
      trailerUrl: n.MaPhim.trailerUrl,
      TrangThai: n.MaPhim.TrangThai,
      MaTheLoai: n.MaPhim.MaTheLoai,
    } : n.MaPhim,
    TrangThai: n.TrangThai,
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
  }));
};

// Lấy chi tiết theo id
export const getNewsById = async (id: string): Promise<News> => {
  const res = await api.get(`/news/getbyid/${id}`);
  const n = res.data.data;
  return {
    id: n._id,
    TieuDe: n.TieuDe,
    NoiDung: n.NoiDung,
    AnhTinTuc: n.AnhTinTuc,
    MaPhim: n.MaPhim,
    TrangThai: n.TrangThai,
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
  };
};

// Tạo tin tức
export const createNews = async (data: Omit<News, "id">): Promise<News> => {
  const res = await api.post("/news/create", data);
  return res.data.data;
};

// Cập nhật tin tức
export const updateNews = async (id: string, data: Partial<News>): Promise<News> => {
  const res = await api.put(`/news/update/${id}`, data);
  return res.data.data;
};

// Xóa tin tức
export const deleteNews = async (id: string): Promise<void> => {
  await api.delete(`/news/delete/${id}`);
};
