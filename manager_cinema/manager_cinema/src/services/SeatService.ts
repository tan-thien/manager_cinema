import api from "../utils/api";
import type { Seat } from "../types/Seat";

export const SeatService = {
  getByCinema: async (cinemaId: string): Promise<Seat[]> => {
    const res = await api.get(`/api/seats/getbycinema/${cinemaId}`);
    return res.data.map((s: any) => ({
      id: s._id,
      SoGhe: s.SoGhe,
      LoaiGhe: s.LoaiGhe,
      TrangThai: s.TrangThai,
      MaRap: s.MaRap,
    }));
  },

generate: async (body: any) => {
  const res = await api.post("/api/seats/generate", body);
  return res.data;
},

};
