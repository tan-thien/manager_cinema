import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createNews } from "../../../services/NewsService";
import { movieService } from "../../../services/MovieService";
import type { Movie } from "../../../types/Movie";

export default function NewsCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    TieuDe: "",
    NoiDung: "",
    AnhTinTuc: "",
    MaPhim: "",
    TrangThai: true,
  });
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    movieService.getAll().then(setMovies);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNews(form);
      navigate("/admin/news");
    } catch (err) {
      console.error("Tạo tin tức thất bại:", err);
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: { maxWidth: 700, margin: "40px auto", padding: 24, borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.1)", fontFamily: "Arial, sans-serif" },
    title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 16, background: "linear-gradient(to right, #3b82f6, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    input: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" },
    textarea: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" },
    select: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" },
    checkboxLabel: { display: "flex", alignItems: "center", gap: 8, marginTop: 8 },
    btnSubmit: { background: "linear-gradient(to right, #3b82f6, #f97316)", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600 },
    btnBack: { background: "linear-gradient(to right, #3b82f6, #f97316)", color: "#fff", padding: "8px 16px", borderRadius: 8, textDecoration: "none", fontWeight: 600, display: "inline-block", marginBottom: 16 },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Thêm tin tức mới</h2>

      <Link to="/admin/news" style={styles.btnBack}>← Quay lại</Link>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="TieuDe"
          placeholder="Tiêu đề"
          value={form.TieuDe}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="NoiDung"
          placeholder="Nội dung"
          value={form.NoiDung}
          onChange={handleChange}
          rows={6}
          style={styles.textarea}
        />
        <input
          type="text"
          name="AnhTinTuc"
          placeholder="Link ảnh"
          value={form.AnhTinTuc}
          onChange={handleChange}
          style={styles.input}
        />
        <select
          name="MaPhim"
          value={form.MaPhim}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">-- Chọn phim --</option>
          {movies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.TenPhim}
            </option>
          ))}
        </select>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="TrangThai"
            checked={form.TrangThai}
            onChange={handleChange}
          />
          Hiển thị
        </label>
        <button type="submit" style={styles.btnSubmit}>Lưu</button>
      </form>
    </div>
  );
}
