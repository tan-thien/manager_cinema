import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getNewsById, updateNews } from "../../../services/NewsService";
import { movieService } from "../../../services/MovieService";
import type { Movie } from "../../../types/Movie";

const NewsEditPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState<any>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNewsById(id!);
      setForm(data);
      setMovies(await movieService.getAll());
    };
    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateNews(id!, form);
      navigate("/admin/news");
    } catch (err) {
      console.error("Cập nhật tin tức thất bại:", err);
    }
  };

  if (!form) return <p className="p-4">Đang tải...</p>;

  const styles: { [key: string]: React.CSSProperties } = {
    container: { maxWidth: 700, margin: "0 auto", padding: 24, fontFamily: "Arial, sans-serif" },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 24,
      textAlign: "center",
      background: "linear-gradient(to right, #3b82f6, #f97316)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    backBtn: { display: "inline-block", marginBottom: 16, background: "#6b7280", color: "#fff", padding: "8px 16px", borderRadius: 8, textDecoration: "none" },
    formWrapper: { border: "1px solid #ddd", borderRadius: 12, padding: 24, boxShadow: "0 4px 8px rgba(0,0,0,0.05)", background: "#fff", display: "flex", flexDirection: "column", gap: 16 },
    input: { border: "1px solid #ddd", padding: 10, borderRadius: 8, width: "100%", fontSize: 14 },
    textarea: { border: "1px solid #ddd", padding: 10, borderRadius: 8, width: "100%", fontSize: 14, minHeight: 120, resize: "vertical" },
    select: { border: "1px solid #ddd", padding: 10, borderRadius: 8, width: "100%", fontSize: 14 },
    checkboxLabel: { display: "flex", alignItems: "center", gap: 8 },
    submitBtn: { background: "linear-gradient(to right, #3b82f6, #f97316)", color: "#fff", padding: "10px 20px", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 16, transition: "all 0.3s" },
    submitBtnHover: { opacity: 0.9 },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Chỉnh sửa tin tức</h2>
      <Link to="/admin/news" style={styles.backBtn}>Quay lại</Link>

      <form onSubmit={handleSubmit} style={styles.formWrapper}>
        <input
          type="text"
          name="TieuDe"
          value={form.TieuDe}
          onChange={handleChange}
          placeholder="Tiêu đề"
          style={styles.input}
        />
        <textarea
          name="NoiDung"
          value={form.NoiDung}
          onChange={handleChange}
          placeholder="Nội dung"
          style={styles.textarea}
        />
        <input
          type="text"
          name="AnhTinTuc"
          value={form.AnhTinTuc}
          onChange={handleChange}
          placeholder="Link ảnh"
          style={styles.input}
        />
        <select
          name="MaPhim"
          value={typeof form.MaPhim === "object" ? form.MaPhim._id : form.MaPhim}
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
          <input type="checkbox" name="TrangThai" checked={form.TrangThai} onChange={handleChange} />
          Hiển thị
        </label>

        <button type="submit" style={styles.submitBtn}>Cập nhật</button>
      </form>
    </div>
  );
};

export default NewsEditPage;
