// src/services/ServiceService.ts
import api from "../utils/api";
import type { Service } from "../types/Service";

const mapService = (s: any): Service => ({
  id: s._id,
  TenDichVu: s.TenDichVu,
  MoTa: s.MoTa,
  Gia: s.Gia,
  HinhAnh: s.HinhAnh,
  TrangThai: s.TrangThai,
  createdAt: s.createdAt,
  updatedAt: s.updatedAt,
});

export const serviceService = {
  getAll: async (): Promise<Service[]> => {
    const res = await api.get("/service/getall");
    return res.data.data.map(mapService);
  },

  getById: async (id: string): Promise<Service> => {
    const res = await api.get(`/service/getbyid/${id}`);
    return mapService(res.data.data); // ✅ lấy đúng data
  },


  create: async (data: Omit<Service, "id">) => {
    return api.post("/service/create", data);
  },

  update: async (id: string, data: Partial<Service>) => {
    return api.put(`/service/update/${id}`, data);
  },

  remove: async (id: string) => {
    return api.delete(`/service/delete/${id}`);
  },
};
