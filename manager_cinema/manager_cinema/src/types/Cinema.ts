import type { Branch } from "./Branch";

export interface Cinema {
  id: string;       // chuẩn hóa lại từ _id
  TenRap: string;
  SoLuongGhe: number;
  TrangThai: boolean;
  MaChiNhanh: string | Branch; // hoặc populate thêm thông tin chi nhánh
}
