// src/pages/admin/Seat/GenerateSeatModal.tsx
import React, { useState } from "react";
import { SeatService } from "../../../services/SeatService";

interface Props {
  cinemaId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const GenerateSeatModal: React.FC<Props> = ({ cinemaId, onClose, onSuccess }) => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(10);
  const [seatType, setSeatType] = useState("Thuong");

  const handleGenerate = async () => {
    const totalSeats = rows * cols;
    await SeatService.generate({ cinemaId, totalSeats, rows, cols, seatType });
    onSuccess();
    onClose();
  };

  const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "#fff",
      padding: "24px",
      borderRadius: "12px",
      width: "360px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "16px",
      textAlign: "center",
      background: "linear-gradient(to right, #4f46e5, #3b82f6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    label: { display: "block", marginBottom: "6px", fontWeight: 600 },
    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      marginBottom: "12px",
    },
    select: {
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      marginBottom: "12px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "12px",
    },
    btnCancel: {
      padding: "8px 16px",
      borderRadius: "6px",
      backgroundColor: "#f97316", // cam nổi bật
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
    },
    btnGenerate: {
      padding: "8px 16px",
      borderRadius: "6px",
      background: "linear-gradient(to right, #4f46e5, #3b82f6)", // gradient tím-xanh
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Generate Ghế</h2>

        <div>
          <label style={styles.label}>Số hàng:</label>
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>Số cột:</label>
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>Loại ghế:</label>
          <select
            value={seatType}
            onChange={(e) => setSeatType(e.target.value)}
            style={styles.select}
          >
            <option value="Thuong">Thường</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.btnCancel} onClick={onClose}>
            Hủy
          </button>
          <button style={styles.btnGenerate} onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateSeatModal;
