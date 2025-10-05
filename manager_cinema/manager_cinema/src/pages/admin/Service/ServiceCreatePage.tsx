import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { serviceService } from "../../../services/ServiceService";

export default function ServiceCreatePage() {
  const [form, setFormData] = useState({ TenDichVu: "", MoTa: "", Gia: 0, HinhAnh: "", TrangThai: true });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    await serviceService.create(form);
    navigate("/admin/services");
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: 24,
      maxWidth: 600,
      margin: "40px auto",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #eee",
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      background: "linear-gradient(to right, #3b82f6, #f97316)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    input: { width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 8 },
    textarea: { width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 8, minHeight: 80 },
    label: { display: "flex", alignItems: "center", gap: 8 },
    submitBtn: {
      background: "linear-gradient(to right, #3b82f6, #f97316)",
      color: "#fff",
      fontWeight: 600,
      padding: "10px 20px",
      border: "none",
      borderRadius: 12,
      cursor: "pointer",
      marginTop: 12,
      width: "100%",
    },
    backBtn: {
      display: "inline-block",
      marginBottom: 16,
      padding: "8px 16px",
      borderRadius: 12,
      backgroundColor: "#aaa",
      color: "#fff",
      textDecoration: "none",
      fontWeight: 600,
    },
  };

  return (
    <div style={styles.container}>
      <Link to="/admin/services" style={styles.backBtn}>← Quay lại</Link>
      <h2 style={styles.title}>Thêm dịch vụ</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="TenDichVu"
          placeholder="Tên dịch vụ"
          value={form.TenDichVu}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="MoTa"
          placeholder="Mô tả"
          value={form.MoTa}
          onChange={handleChange}
          style={styles.textarea}
        />
        <input
          type="number"
          name="Gia"
          placeholder="Giá"
          value={form.Gia}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="HinhAnh"
          placeholder="Link hình ảnh"
          value={form.HinhAnh}
          onChange={handleChange}
          style={styles.input}
        />
        <label style={styles.label}>
          <input type="checkbox" name="TrangThai" checked={form.TrangThai} onChange={handleChange} />
          Hiển thị
        </label>
        <button type="submit" style={styles.submitBtn}>
          Lưu
        </button>
      </form>
    </div>
  );
}
