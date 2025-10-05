import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serviceService } from "../../../services/ServiceService";
import type { Service } from "../../../types/Service";

export default function ServiceListPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    serviceService.getAll().then(setServices);
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
      await serviceService.remove(id);
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: 24, fontFamily: "Arial, sans-serif", maxWidth: 1000, margin: "0 auto" },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      background: "linear-gradient(to right, #3b82f6, #f97316)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    addBtn: { background: "linear-gradient(to right, #3b82f6, #f97316)", color: "#fff", padding: "8px 16px", borderRadius: 8, textDecoration: "none", fontWeight: 600, marginBottom: 12, display: "inline-block" },
    tableWrapper: { overflowX: "auto", borderRadius: 12, border: "1px solid #ddd" },
    table: { width: "100%", borderCollapse: "separate", borderSpacing: 0 },
    th: { padding: 12, textAlign: "left", background: "#f3f4f6" },
    td: { padding: 10, borderTop: "1px solid #eee", verticalAlign: "middle" },
    actionBtn: { marginRight: 8, color: "#fff", padding: "4px 10px", borderRadius: 8, textDecoration: "none", fontWeight: 600 },
    editBtn: { background: "linear-gradient(to right, #3b82f6, #f97316)" },
    deleteBtn: { background: "#ef4444", color: "#fff", border: "none", padding: "4px 10px", borderRadius: 8, cursor: "pointer" },
    imgWrapper: { width: 80, height: 80, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 },
    img: { width: "100%", height: "100%", objectFit: "cover" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Quản lý Dịch vụ</h2>
      <Link to="/admin/services/create" style={styles.addBtn}>
        + Thêm dịch vụ
      </Link>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Ảnh</th>
              <th style={styles.th}>Tên dịch vụ</th>
              <th style={styles.th}>Giá</th>
              <th style={styles.th}>Trạng thái</th>
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <td style={styles.td}>
                  <div style={styles.imgWrapper}>
                    <img src={s.HinhAnh} alt={s.TenDichVu} style={styles.img} />
                  </div>
                </td>
                <td style={styles.td}>
                  <Link to={`/admin/services/${s.id}`} style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>
                    {s.TenDichVu}
                  </Link>
                </td>
                <td style={styles.td}>{s.Gia.toLocaleString()} đ</td>
                <td style={styles.td}>{s.TrangThai ? "Hiển thị" : "Ẩn"}</td>
                <td style={styles.td}>
                  <Link to={`/admin/services/edit/${s.id}`} style={{ ...styles.actionBtn, ...styles.editBtn }}>
                    Sửa
                  </Link>
                  <button onClick={() => handleDelete(s.id)} style={styles.deleteBtn}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
