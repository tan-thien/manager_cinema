// src/pages/admin/Cinema/CinemaListPage.tsx
import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

interface Cinema {
  _id: string;
  TenRap: string;
  SoLuongGhe: number;
  TrangThai: boolean;
}

const CinemaListPage: React.FC = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const navigate = useNavigate();

  const fetchCinemas = async () => {
    try {
      const res = await api.get("/cinema/getall");
      setCinemas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCinemas();
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
      background: "linear-gradient(to right, #4f46e5, #3b82f6)", // từ tím sang xanh dương
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    tableWrapper: {
      overflowX: "auto",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
      borderRadius: "12px",
      overflow: "hidden",
    },
    th: {
      padding: "10px",
      background: "linear-gradient(to right, #4f46e5, #3b82f6)", // tím -> xanh dương
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    td: {
      padding: "10px",
      textAlign: "center",
      borderBottom: "1px solid #ddd",
    },
    btn: {
      background: "linear-gradient(to right, #f97316, #facc15)", // cam -> vàng nhấn mạnh
      color: "#fff",
      border: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 600,
      transition: "0.3s",
    },
    btnHover: { opacity: 0.85 },
    statusActive: { color: "#4f46e5", fontWeight: "bold" }, // xanh tím
    statusInactive: { color: "red", fontWeight: "bold" },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Danh sách Rạp Chiếu</h1>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, borderTopLeftRadius: "12px" }}>Tên Rạp</th>
              <th style={styles.th}>Số Lượng Ghế</th>
              <th style={styles.th}>Trạng Thái</th>
              <th style={{ ...styles.th, borderTopRightRadius: "12px" }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {cinemas.map((c) => (
              <tr key={c._id}>
                <td style={{ ...styles.td, borderLeft: "1px solid #ddd" }}>{c.TenRap}</td>
                <td style={styles.td}>{c.SoLuongGhe}</td>
                <td style={{ ...styles.td, ...(c.TrangThai ? styles.statusActive : styles.statusInactive) }}>
                  {c.TrangThai ? "Hoạt động" : "Không hoạt động"}
                </td>
                <td style={{ ...styles.td, borderRight: "1px solid #ddd" }}>
                  <button
                    onClick={() => navigate(`/admin/seat/${c._id}`)}
                    style={styles.btn}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Xem ghế
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CinemaListPage;
