import React, { useState, useEffect } from "react";
import { ScheduleService } from "../../../services/ScheduleService";
import { ScheduleSeatService } from "../../../services/ScheduleSeatService";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const ScheduleCreatePage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [cinemas, setCinemas] = useState<any[]>([]);
  const [form, setForm] = useState({
    GioChieu: "",
    TrangThai: true,
    MaPhim: "",
    MaRap: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const movieRes = await api.get("/movie/getall");
      const cinemaRes = await api.get("/cinema/getall");
      setMovies(movieRes.data);
      setCinemas(cinemaRes.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const schedule = await ScheduleService.create(form);
      await ScheduleSeatService.generate(schedule._id, form.MaRap);
      alert("Tạo lịch chiếu & sinh ghế thành công!");
      navigate("/admin/schedules");
    } catch (err) {
      console.error(err);
      alert("Tạo lịch chiếu thất bại!");
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: { maxWidth: "500px", margin: "40px auto", padding: "24px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", fontFamily: "Arial, sans-serif" },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      background: "linear-gradient(to right, #7c3aed, #3b82f6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "24px",
      textAlign: "center",
    },
    formGroup: { marginBottom: "16px" },
    label: { display: "block", marginBottom: "6px", fontWeight: 600 },
    selectInput: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" },
    input: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" },
    btnGroup: { display: "flex", justifyContent: "space-between", marginTop: "20px" },
    submitBtn: {
      background: "linear-gradient(to right, #7c3aed, #f97316)",
      color: "#fff",
      fontWeight: 600,
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      flex: 1,
      marginLeft: "8px",
    },
    backBtn: {
      background: "#ccc",
      color: "#333",
      fontWeight: 600,
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      flex: 1,
      marginRight: "8px",
    },
    toggleContainer: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Tạo lịch chiếu</h1>

      <div style={styles.formGroup}>
        <label style={styles.label}>Phim:</label>
        <select
          value={form.MaPhim}
          onChange={(e) => setForm({ ...form, MaPhim: e.target.value })}
          style={styles.selectInput}
        >
          <option value="">-- Chọn phim --</option>
          {movies.map((m) => (
            <option key={m._id} value={m._id}>
              {m.TenPhim}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Rạp:</label>
        <select
          value={form.MaRap}
          onChange={(e) => setForm({ ...form, MaRap: e.target.value })}
          style={styles.selectInput}
        >
          <option value="">-- Chọn rạp --</option>
          {cinemas.map((c) => (
            <option key={c._id} value={c._id}>
              {c.TenRap}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Giờ chiếu:</label>
        <input
          type="datetime-local"
          value={form.GioChieu}
          onChange={(e) => setForm({ ...form, GioChieu: e.target.value })}
          style={styles.input}
        />
      </div>

      <div style={styles.toggleContainer}>
        <label style={styles.label}>Trạng thái:</label>
        <input
          type="checkbox"
          checked={form.TrangThai}
          onChange={(e) => setForm({ ...form, TrangThai: e.target.checked })}
        />
        <span>{form.TrangThai ? "Đang chiếu" : "Ngừng"}</span>
      </div>

      <div style={styles.btnGroup}>
        <button style={styles.backBtn} onClick={() => navigate("/admin/schedules")}>
          ← Quay lại
        </button>
        <button style={styles.submitBtn} onClick={handleSubmit}>
          Tạo lịch chiếu
        </button>
      </div>
    </div>
  );
};

export default ScheduleCreatePage;
