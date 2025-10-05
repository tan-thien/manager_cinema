import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { serviceService } from "../../../services/ServiceService";
import type { Service } from "../../../types/Service";

export default function ServiceEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<Service>>({
    TenDichVu: "",
    MoTa: "",
    Gia: 0,
    HinhAnh: "",
    TrangThai: true,
  });

  useEffect(() => {
    if (id) {
      serviceService.getById(id).then((data) => setFormData(data));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await serviceService.update(id, formData);
      navigate("/admin/services");
    } catch (error) {
      console.error("Update service failed", error);
      alert("Cập nhật thất bại");
    }
  };

  if (!formData) return <p>Đang tải...</p>;

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: "600px",
      margin: "3rem auto",
      padding: "2rem",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
      background: "linear-gradient(to right, #3b82f6, #f97316)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "1.5rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "1rem",
    },
    input: {
      padding: "0.5rem",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      fontSize: "1rem",
    },
    textarea: {
      padding: "0.5rem",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      fontSize: "1rem",
      resize: "vertical",
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "1rem",
      fontSize: "1rem",
    },
    button: {
      padding: "0.6rem 1.2rem",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      background: "linear-gradient(to right, #3b82f6, #f97316)",
      color: "#fff",
    },
    previewImg: {
      marginTop: "0.5rem",
      width: "160px",
      height: "160px",
      objectFit: "cover",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
    },
    backButton: {
      display: "inline-block",
      marginTop: "1.5rem",
      padding: "0.5rem 1rem",
      backgroundColor: "#6b7280",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sửa dịch vụ</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <input
            type="text"
            name="TenDichVu"
            placeholder="Tên dịch vụ"
            value={formData.TenDichVu || ""}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <textarea
            name="MoTa"
            placeholder="Mô tả"
            value={formData.MoTa || ""}
            onChange={handleChange}
            style={styles.textarea}
            rows={4}
          />
        </div>

        <div style={styles.formGroup}>
          <input
            type="number"
            name="Gia"
            placeholder="Giá"
            value={formData.Gia ?? 0}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <input
            type="text"
            name="HinhAnh"
            placeholder="Link ảnh dịch vụ"
            value={formData.HinhAnh || ""}
            onChange={handleChange}
            style={styles.input}
          />
          {formData.HinhAnh && (
            <img
              src={formData.HinhAnh}
              alt="Preview"
              style={styles.previewImg}
            />
          )}
        </div>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="TrangThai"
            checked={!!formData.TrangThai}
            onChange={handleChange}
          />
          Kích hoạt
        </label>

        <button type="submit" style={styles.button}>
          Cập nhật
        </button>
      </form>

      <div style={{ textAlign: "center" }}>
        <Link to="/admin/services" style={styles.backButton}>
          Quay lại
        </Link>
      </div>
    </div>
  );
}
