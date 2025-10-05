import React, { useEffect, useState } from "react";
import { ScheduleService } from "../../../services/ScheduleService";
import { useNavigate } from "react-router-dom";

const ScheduleListPage: React.FC = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchSchedules = async () => {
    const data = await ScheduleService.getAll();
    setSchedules(data);
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: "24px", fontFamily: "Arial, sans-serif" },
    headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    pageTitle: {
      fontSize: "26px",
      fontWeight: "bold",
      background: "linear-gradient(to right, #7c3aed, #3b82f6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    createBtn: {
      backgroundColor: "#f97316",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
      border: "1px solid #ddd",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    },
    thead: {
      background: "linear-gradient(to right, #7c3aed, #3b82f6)",
      color: "#fff",
    },
    th: { padding: "12px", textAlign: "left", fontWeight: 600 },
    td: { padding: "12px", borderBottom: "1px solid #eee", verticalAlign: "middle" },
    trHover: { transition: "background-color 0.2s" },
    btnEdit: { backgroundColor: "#6366f1", color: "#fff", padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer", marginRight: "6px" },
    btnDelete: { backgroundColor: "#f97316", color: "#fff", padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer" },
    statusActive: { color: "#16a34a", fontWeight: "bold" },
    statusInactive: { color: "#ef4444", fontWeight: "bold" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h1 style={styles.pageTitle}>Danh sách lịch chiếu</h1>
        <button
          style={styles.createBtn}
          onClick={() => navigate("/admin/schedules/create")}
        >
          + Tạo lịch chiếu
        </button>
      </div>

      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Phim</th>
            <th style={styles.th}>Rạp</th>
            <th style={styles.th}>Giờ chiếu</th>
            <th style={styles.th}>Trạng thái</th>
            <th style={styles.th}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s) => (
            <tr
              key={s._id}
              style={styles.trHover}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <td style={styles.td}>{s.MaPhim?.TenPhim}</td>
              <td style={styles.td}>{s.MaRap?.TenRap}</td>
              <td style={styles.td}>
                {new Date(s.GioChieu).toLocaleString("en-GB", {
                  timeZone: "UTC",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td style={styles.td}>
                <span style={s.TrangThai ? styles.statusActive : styles.statusInactive}>
                  {s.TrangThai ? "Đang chiếu" : "Ngừng"}
                </span>
              </td>
              <td style={styles.td}>
                <button
                  style={styles.btnEdit}
                  onClick={() => navigate(`/admin/schedules/edit/${s._id}`)}
                >
                  Sửa
                </button>
                <button
                  style={styles.btnDelete}
                  onClick={async () => {
                    if (window.confirm("Xác nhận xóa lịch chiếu?")) {
                      await ScheduleService.delete(s._id);
                      fetchSchedules();
                    }
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleListPage;
