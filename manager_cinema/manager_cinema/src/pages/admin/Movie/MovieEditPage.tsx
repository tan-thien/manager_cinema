import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../../services/MovieService";
import { getAllGenres } from "../../../services/genreService";
import type { Genre } from "../../../types/Genre";
import type { Movie } from "../../../types/Movie";

export default function MovieEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [form, setForm] = useState<Partial<Movie>>({});

  useEffect(() => {
    if (id) {
      movieService.getById(id).then(setForm);
      getAllGenres().then(setGenres);
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: any = value;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    } else if (type === "number") {
      newValue = Number(value);
    }

    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await movieService.update(id, form as any);
      navigate("/admin/movies");
    }
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
    title: { textAlign: "center", fontSize: 28, fontWeight: "bold", color: "#7c3aed", marginBottom: 24 },
    input: { width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", marginBottom: 16, fontSize: 16, boxSizing: "border-box" },
    button: { width: "100%", padding: 14, background: "linear-gradient(to right, #7c3aed, #f97316)", border: "none", borderRadius: 10, color: "white", fontWeight: "bold", fontSize: 16, cursor: "pointer", transition: "all 0.3s" },
    backBtn: { display: "inline-block", marginBottom: 20, padding: "8px 16px", borderRadius: 8, border: "1px solid #ccc", backgroundColor: "#f0f0f0", cursor: "pointer" },
    checkboxLabel: { display: "flex", alignItems: "center", gap: 8, marginBottom: 16 },
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      {/* Nút Quay lại */}
      <button style={styles.backBtn} onClick={() => navigate("/admin/movies")}>
        ← Quay lại
      </button>

      <h2 style={styles.title}>Chỉnh sửa phim</h2>
      <form onSubmit={handleSubmit}>
        <input name="TenPhim" value={form.TenPhim || ""} onChange={handleChange} placeholder="Tên phim" required style={styles.input} />
        <textarea name="MoTa" value={form.MoTa || ""} onChange={handleChange} placeholder="Mô tả" rows={4} style={styles.input} />
        <input name="ThoiLuong" type="number" value={form.ThoiLuong || 0} onChange={handleChange} placeholder="Thời lượng (phút)" style={styles.input} />
        <input name="Ngay" type="date" value={form.Ngay ? form.Ngay.substring(0, 10) : ""} onChange={handleChange} style={styles.input} />
        <input name="AnhPhim" value={form.AnhPhim || ""} onChange={handleChange} placeholder="Link ảnh" style={styles.input} />
        <input name="trailerUrl" value={form.trailerUrl || ""} onChange={handleChange} placeholder="Trailer URL" style={styles.input} />
        <select
          name="MaTheLoai"
          value={typeof form.MaTheLoai === "string" ? form.MaTheLoai : form.MaTheLoai?.id || ""}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">-- Chọn thể loại --</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.TenTheLoai}
            </option>
          ))}
        </select>

        <label style={styles.checkboxLabel}>
          <input type="checkbox" name="TrangThai" checked={!!form.TrangThai} onChange={handleChange} />
          Đang chiếu
        </label>

        <button type="submit" style={styles.button}>Cập nhật</button>
      </form>
    </div>
  );
}
