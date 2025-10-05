// src/pages/admin/Seat/SeatListPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SeatService } from "../../../services/SeatService";
import GenerateSeatModal from "./GenerateSeatModal";

interface Seat {
  id: string;
  SoGhe: string; // VD: A1, B5...
  LoaiGhe: string;
  TrangThai: boolean;
  MaRap: string;
}

const SeatListPage: React.FC = () => {
  const { cinemaId } = useParams();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchSeats = async () => {
    if (!cinemaId) return;
    const data = await SeatService.getByCinema(cinemaId);
    setSeats(data);
  };

  useEffect(() => {
    fetchSeats();
  }, [cinemaId]);

  const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: "20px", fontFamily: "Arial, sans-serif" },
    title: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
      background: "linear-gradient(to right, #4f46e5, #3b82f6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    btn: {
      marginBottom: "20px",
      background: "linear-gradient(to right, #f97316, #facc15)",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 600,
    },
    seatGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
      gap: "8px",
      marginBottom: "20px",
    },
    seatBox: {
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#fff",
    },
    seatActive: { background: "#4f46e5" }, // tím
    seatInactive: { background: "#f97316" }, // cam
    infoTable: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    th: {
      padding: "10px",
      background: "linear-gradient(to right, #4f46e5, #3b82f6)",
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    td: {
      padding: "10px",
      textAlign: "center",
      borderBottom: "1px solid #ddd",
    },
    statusActive: { color: "#4f46e5", fontWeight: "bold" },
    statusInactive: { color: "red", fontWeight: "bold" },
  };

  // Lấy danh sách hàng (A, B, C...) từ ghế
  const rowMap: { [key: string]: Seat[] } = {};
  seats.forEach((s) => {
    const row = s.SoGhe.charAt(0); // A, B, C
    if (!rowMap[row]) rowMap[row] = [];
    rowMap[row].push(s);
  });

  // Sắp xếp ghế trong mỗi hàng theo số
  Object.keys(rowMap).forEach((row) => {
    rowMap[row].sort((a, b) => {
      const numA = parseInt(a.SoGhe.slice(1));
      const numB = parseInt(b.SoGhe.slice(1));
      return numA - numB;
    });
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Danh sách Ghế</h1>

      <button style={styles.btn} onClick={() => setIsOpen(true)}>
        Generate Ghế
      </button>

      {/* Grid ghế */}
      {Object.keys(rowMap).sort().map((row) => (
        <div key={row} style={{ marginBottom: "12px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "6px" }}>Hàng {row}</div>
          <div style={styles.seatGrid}>
            {rowMap[row].map((s) => (
              <div
                key={s.id}
                style={{
                  ...styles.seatBox,
                  ...(s.TrangThai ? styles.seatActive : styles.seatInactive),
                }}
              >
                {s.SoGhe}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Thông tin chi tiết */}
      <table style={styles.infoTable}>
        <thead>
          <tr>
            <th style={styles.th}>Số ghế</th>
            <th style={styles.th}>Loại ghế</th>
            <th style={styles.th}>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((s) => (
            <tr key={s.id}>
              <td style={styles.td}>{s.SoGhe}</td>
              <td style={styles.td}>{s.LoaiGhe}</td>
              <td
                style={{
                  ...styles.td,
                  ...(s.TrangThai ? styles.statusActive : styles.statusInactive),
                }}
              >
                {s.TrangThai ? "Hoạt động" : "Không hoạt động"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOpen && (
        <GenerateSeatModal
          cinemaId={cinemaId!}
          onClose={() => setIsOpen(false)}
          onSuccess={fetchSeats}
        />
      )}
    </div>
  );
};

export default SeatListPage;
