import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBranch } from "../../../services/branchService";
import type { Branch } from "../../../types/Branch";
import "../../../styles/BranchCreate.css";

const BranchCreate: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<Branch, "id">>({
    TenChiNhanh: "",
    DiaChi: "",
    SDT: "",
    Status: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBranch(form);
    navigate("/admin/branches");
  };

  return (
    <div className="branch-create-container">
      <div className="branch-create-card">
        <h1>➕ Thêm chi nhánh mới</h1>

        <form onSubmit={handleSubmit} className="branch-form">
          <div className="form-group">
            <label>Tên chi nhánh</label>
            <input
              name="TenChiNhanh"
              value={form.TenChiNhanh}
              onChange={handleChange}
              placeholder="Nhập tên chi nhánh"
              required
            />
          </div>

          <div className="form-group">
            <label>Địa chỉ</label>
            <input
              name="DiaChi"
              value={form.DiaChi}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
              required
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              name="SDT"
              value={form.SDT}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/admin/branches")}>
              Hủy
            </button>
            <button type="submit" className="submit-btn">
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchCreate;
