import api from "../utils/api";
import type { Branch } from "../types/Branch";

// Lấy danh sách chi nhánh
export const getAllBranches = async (): Promise<Branch[]> => {
  const res = await api.get("/branch/getall");
  const list = res.data.data; // ✅ lấy đúng "data"
  return list.map((b: any) => ({
    id: b._id,
    TenChiNhanh: b.TenChiNhanh,
    DiaChi: b.DiaChi,
    SDT: b.SDT,
    Status: b.Status,
  }));
};

// Lấy chi nhánh theo ID
export const getBranchById = async (id: string): Promise<Branch> => {
  const res = await api.get(`/branch/getbyid/${id}`);
  const b = res.data.data; // ✅ lấy đúng "data"
  return {
    id: b._id,
    TenChiNhanh: b.TenChiNhanh,
    DiaChi: b.DiaChi,
    SDT: b.SDT,
    Status: b.Status,
  };
};

// Tạo mới
export const createBranch = async (
  branch: Omit<Branch, "id">
): Promise<Branch> => {
  const res = await api.post("/branch/create", branch);
  const b = res.data.data; // ✅
  return {
    id: b._id,
    TenChiNhanh: b.TenChiNhanh,
    DiaChi: b.DiaChi,
    SDT: b.SDT,
    Status: b.Status,
  };
};

// Cập nhật
export const updateBranch = async (
  id: string,
  branch: Omit<Branch, "id">
): Promise<Branch> => {
  const res = await api.put(`/branch/update/${id}`, branch);
  const b = res.data.data; // ✅
  return {
    id: b._id,
    TenChiNhanh: b.TenChiNhanh,
    DiaChi: b.DiaChi,
    SDT: b.SDT,
    Status: b.Status,
  };
};

// Xóa
export const deleteBranch = async (id: string): Promise<void> => {
  await api.delete(`/branch/delete/${id}`);
};
