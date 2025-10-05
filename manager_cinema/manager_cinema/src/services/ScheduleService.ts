// src/services/ScheduleService.ts
import api from "../utils/api";

export const ScheduleService = {
  getAll: async () => {
    const res = await api.get("/schedule/getall");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get(`/schedule/getbyid/${id}`);
    return res.data;
  },

  create: async (data: any) => {
    const res = await api.post("/schedule/create", data);
    return res.data;
  },

  update: async (id: string, data: any) => {
    const res = await api.put(`/schedule/update/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/schedule/delete/${id}`);
    return res.data;
  },

  getByCinemaId: async (cinemaId: string) => {
    const res = await api.get(`/schedule/by-cinema/${cinemaId}`);
    return res.data;
  },
};
