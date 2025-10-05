import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../../../services/MovieService";
import { getAllGenres } from "../../../services/genreService";
import type { Genre } from "../../../types/Genre";

export default function MovieCreate() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [form, setForm] = useState({
    TenPhim: "",
    MoTa: "",
    ThoiLuong: 0,
    Ngay: "",
    AnhPhim: "",
    trailerUrl: "",
    TrangThai: true,
    MaTheLoai: "",
  });

  useEffect(() => {
    getAllGenres().then(setGenres);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await movieService.create(form as any);
    navigate("/admin/movies");
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: 500,
      margin: "40px auto",
      padding: 24,
      backgroundColor: "#fff",
      borderRadius: 12,
      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: 28,
      fontWeight: "bold",
      color: "#7c3aed",
      marginBottom: 24,
    },
    input: {
      width: "100%",
      padding: 12,
      borderRadius: 8,
      border: "1px solid #ccc",
      marginBottom: 16,
      fontSize: 16,
      boxSizing: "border-box",
    },
    flexRow: {
      display: "flex",
      gap: 12,
      marginBottom: 16,
    },
    flexInput: { flex: 1 },
    button: {
      width: "100%",
      padding: 14,
      background: "linear-gradient(to right, #7c3aed, #f97316)",
      border: "none",
      borderRadius: 10,
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      cursor: "pointer",
      transition: "all 0.3s",
    },
    backBtn: {
      display: "inline-block",
      marginBottom: 20,
      padding: "8px 16px",
      borderRadius: 8,
      border: "1px solid #ccc",
      backgroundColor: "#f0f0f0",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      {/* Nút Quay lại */}
      <button style={styles.backBtn} onClick={() => navigate("/admin/movies")}>
        ← Quay lại
      </button>

      <h2 style={styles.title}>Thêm phim mới</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="TenPhim"
          placeholder="Tên phim"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="MoTa"
          placeholder="Mô tả"
          onChange={handleChange}
          rows={4}
          required
          style={styles.input}
        />
        <div style={styles.flexRow}>
          <input
            name="ThoiLuong"
            type="number"
            placeholder="Thời lượng (phút)"
            onChange={handleChange}
            required
            style={{ ...styles.input, ...styles.flexInput }}
          />
          <input
            name="Ngay"
            type="date"
            onChange={handleChange}
            required
            style={{ ...styles.input, ...styles.flexInput }}
          />
        </div>
        <input
          name="AnhPhim"
          placeholder="Link ảnh phim"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="trailerUrl"
          placeholder="Trailer URL"
          onChange={handleChange}
          style={styles.input}
        />
        <select
          name="MaTheLoai"
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">-- Chọn thể loại --</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.TenTheLoai}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>
          Lưu
        </button>
      </form>
    </div>
  );
}
