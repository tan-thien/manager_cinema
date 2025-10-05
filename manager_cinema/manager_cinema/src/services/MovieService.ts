import api from "../utils/api";
import type { Movie } from "../types/Movie";

const mapMovie = (movie: any): Movie => ({
  id: movie._id,
  TenPhim: movie.TenPhim,
  MoTa: movie.MoTa,
  ThoiLuong: movie.ThoiLuong,
  Ngay: movie.Ngay,
  AnhPhim: movie.AnhPhim,
  trailerUrl: movie.trailerUrl,
  TrangThai: movie.TrangThai,
  MaTheLoai: movie.MaTheLoai?._id
    ? { id: movie.MaTheLoai._id, TenTheLoai: movie.MaTheLoai.TenTheLoai }
    : movie.MaTheLoai,
});

export const movieService = {
  getAll: async (): Promise<Movie[]> => {
    const res = await api.get("/movie/getall");
    return res.data.map(mapMovie);
  },

  getById: async (id: string): Promise<Movie> => {
    const res = await api.get(`/movie/getbyid/${id}`);
    return mapMovie(res.data);
  },

  create: async (data: Omit<Movie, "id">) => {
    const payload = {
      ...data,
      MaTheLoai: typeof data.MaTheLoai === "string" ? data.MaTheLoai : data.MaTheLoai.id,
    };
    return api.post("/movie/create", payload);
  },

  update: async (id: string, data: Omit<Movie, "id">) => {
    const payload = {
      ...data,
      MaTheLoai: typeof data.MaTheLoai === "string" ? data.MaTheLoai : data.MaTheLoai.id,
    };
    return api.put(`/movie/update/${id}`, payload);
  },

  remove: async (id: string) => {
    return api.delete(`/movie/delete/${id}`);
  },
};
