import api from "../utils/api";
import type { Cinema } from "../types/Cinema";

// Lấy danh sách rạp
export const getAllCinemas = async (): Promise<Cinema[]> => {
  const res = await api.get("/cinema/getall");
  return res.data.map((c: any) => ({
    id: c._id,
    TenRap: c.TenRap,
    SoLuongGhe: c.SoLuongGhe,
    TrangThai: c.TrangThai,
    MaChiNhanh: c.MaChiNhanh,
  }));
};

// Lấy chi tiết rạp
export const getCinemaById = async (id: string): Promise<Cinema> => {
  const res = await api.get(`/cinema/getbyid/${id}`);
  const c = res.data;
  return {
    id: c._id,
    TenRap: c.TenRap,
    SoLuongGhe: c.SoLuongGhe,
    TrangThai: c.TrangThai,
    MaChiNhanh: c.MaChiNhanh,
  };
};

// Tạo rạp
export const createCinema = async (data: Omit<Cinema, "id">): Promise<Cinema> => {
  const res = await api.post("/cinema/create", data);
  const c = res.data;
  return {
    id: c._id,
    TenRap: c.TenRap,
    SoLuongGhe: c.SoLuongGhe,
    TrangThai: c.TrangThai,
    MaChiNhanh: c.MaChiNhanh,
  };
};

// Cập nhật rạp
export const updateCinema = async (id: string, data: Partial<Cinema>): Promise<Cinema> => {
  const res = await api.put(`/cinema/update/${id}`, data);
  const c = res.data;
  return {
    id: c._id,
    TenRap: c.TenRap,
    SoLuongGhe: c.SoLuongGhe,
    TrangThai: c.TrangThai,
    MaChiNhanh: c.MaChiNhanh,
  };
};

// Xóa rạp
export const deleteCinema = async (id: string): Promise<void> => {
  await api.delete(`/cinema/delete/${id}`);
};
