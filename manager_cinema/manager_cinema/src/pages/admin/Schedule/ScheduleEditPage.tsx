import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScheduleService } from "../../../services/ScheduleService";
import api from "../../../utils/api";

const ScheduleEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movies, setMovies] = useState<any[]>([]);
  const [cinemas, setCinemas] = useState<any[]>([]);
  const [form, setForm] = useState({
    GioChieu: "",
    TrangThai: true,
    MaPhim: "",
    MaRap: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, cinemaRes] = await Promise.all([
          api.get("/movie/getall"),
          api.get("/cinema/getall"),
        ]);
        setMovies(movieRes.data);
        setCinemas(cinemaRes.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phim/rạp:", error);
      }
    };

    const fetchSchedule = async () => {
      try {
        if (!id) return;
        const data = await ScheduleService.getById(id);
        setForm({
          GioChieu: data.GioChieu
            ? new Date(data.GioChieu).toISOString().slice(0, 16)
            : "",
          TrangThai: data.TrangThai ?? true,
          MaPhim: data.MaPhim?._id || data.MaPhim || "",
          MaRap: data.MaRap?._id || data.MaRap || "",
        });
      } catch (error) {
        console.error("Lỗi tải dữ liệu lịch chiếu:", error);
        alert("Không thể tải lịch chiếu!");
      }
    };

    fetchData();
    fetchSchedule();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!id) return;
      await ScheduleService.update(id, form);
      alert("Cập nhật lịch chiếu thành công!");
      navigate("/admin/schedules");
    } catch (err) {
      console.error("❌ Lỗi cập nhật lịch chiếu:", err);
      alert("Cập nhật lịch chiếu thất bại!");
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: { maxWidth: "500px", margin: "40px auto", padding: "24px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", fontFamily: "Arial, sans-serif" },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      background: "linear-gradient(to right, #7c3aed, #f97316)",
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
      <h1 style={styles.header}>Chỉnh sửa lịch chiếu</h1>

      <div style={styles.formGroup}>
        <label style={styles.label}>Phim:</label>
        <select
          name="MaPhim"
          value={form.MaPhim}
          onChange={handleChange}
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
          name="MaRap"
          value={form.MaRap}
          onChange={handleChange}
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
          name="GioChieu"
          value={form.GioChieu}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.toggleContainer}>
        <label style={styles.label}>Trạng thái:</label>
        <input
          type="checkbox"
          name="TrangThai"
          checked={form.TrangThai}
          onChange={handleChange}
        />
        <span>{form.TrangThai ? "Đang chiếu" : "Ngừng"}</span>
      </div>

      <div style={styles.btnGroup}>
        <button style={styles.backBtn} onClick={() => navigate("/admin/schedules")}>
          ← Quay lại
        </button>
        <button style={styles.submitBtn} onClick={handleSubmit}>
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default ScheduleEditPage;
