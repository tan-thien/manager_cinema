// src/services/ScheduleSeatService.ts
import api from "../utils/api";

export const ScheduleSeatService = {
  generate: async (scheduleId: string, cinemaId: string) => {
    const res = await api.post("/schedule-seat/generate", {
      scheduleId,
      cinemaId,
    });
    return res.data;
  },

  getBySchedule: async (scheduleId: string) => {
    const res = await api.get(`/schedule-seat/${scheduleId}`);
    return res.data;
  },
};
