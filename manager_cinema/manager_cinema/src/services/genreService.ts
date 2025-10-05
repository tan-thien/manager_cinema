import api from "../utils/api";
import type { Genre } from "../types/Genre";

// Lấy danh sách thể loại
export const getAllGenres = async (): Promise<Genre[]> => {
  const res = await api.get("/genre/getall");
  return res.data.map((g: any) => ({
    id: g._id,
    TenTheLoai: g.TenTheLoai,
  }));
};

// Lấy chi tiết thể loại
export const getGenreById = async (id: string): Promise<Genre> => {
  const res = await api.get(`/genre/getbyid/${id}`);
  const g = res.data;
  return {
    id: g._id,
    TenTheLoai: g.TenTheLoai,
  };
};

// Tạo mới thể loại
export const createGenre = async (data: Omit<Genre, "id">): Promise<Genre> => {
  const res = await api.post("/genre/create", data);
  const g = res.data;
  return {
    id: g._id,
    TenTheLoai: g.TenTheLoai,
  };
};

// Cập nhật thể loại
export const updateGenre = async (id: string, data: Partial<Genre>): Promise<Genre> => {
  const res = await api.put(`/genre/update/${id}`, data);
  const g = res.data;
  return {
    id: g._id,
    TenTheLoai: g.TenTheLoai,
  };
};

// Xóa thể loại
export const deleteGenre = async (id: string): Promise<void> => {
  await api.delete(`/genre/delete/${id}`);
};
