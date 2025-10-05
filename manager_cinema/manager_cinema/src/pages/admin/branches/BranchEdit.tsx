import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBranchById, updateBranch } from "../../../services/branchService";
import type { Branch } from "../../../types/Branch";

const BranchEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<Branch, "id">>({
    TenChiNhanh: "",
    DiaChi: "",
    SDT: "",
    Status: true,
  });

  useEffect(() => {
    if (id) {
      getBranchById(id).then((b) => {
        setForm({
          TenChiNhanh: b.TenChiNhanh,
          DiaChi: b.DiaChi,
          SDT: b.SDT,
          Status: b.Status,
        });
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "Status") {
      setForm({ ...form, Status: value === "true" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateBranch(id, form);
      navigate("/admin/branches");
    }
  };

  const handleBack = () => {
    navigate("/admin/branches");
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        background: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Cập nhật chi nhánh
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          name="TenChiNhanh"
          value={form.TenChiNhanh}
          onChange={handleChange}
          placeholder="Tên chi nhánh"
          required
          style={{
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />

        <input
          name="DiaChi"
          value={form.DiaChi}
          onChange={handleChange}
          placeholder="Địa chỉ"
          required
          style={{
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />

        <input
          name="SDT"
          value={form.SDT}
          onChange={handleChange}
          placeholder="Số điện thoại"
          required
          style={{
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />

        <label style={{ fontSize: "15px", color: "#555" }}>
          Trạng thái:
          <select
            name="Status"
            value={form.Status ? "true" : "false"}
            onChange={handleChange}
            style={{
              marginLeft: "10px",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
          >
            <option value="true">Hoạt động</option>
            <option value="false">Ngừng hoạt động</option>
          </select>
        </label>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <button
            type="button"
            onClick={handleBack}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "10px 14px",
              cursor: "pointer",
              fontSize: "16px",
              flex: 1,
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#5a6268";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#6c757d";
            }}
          >
            Quay lại
          </button>

          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "10px 14px",
              cursor: "pointer",
              fontSize: "16px",
              flex: 1,
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#0056b3";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#007bff";
            }}
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default BranchEdit;
