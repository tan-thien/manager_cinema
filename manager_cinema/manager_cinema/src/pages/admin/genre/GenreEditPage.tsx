import { useEffect, useState } from "react";
import { getGenreById, updateGenre } from "../../../services/genreService";
import { useNavigate, useParams, Link } from "react-router-dom";

const GenreEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [tenTheLoai, setTenTheLoai] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getGenreById(id).then((data) => setTenTheLoai(data.TenTheLoai));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateGenre(id, { TenTheLoai: tenTheLoai });
        alert("Cập nhật thể loại thành công!");
        navigate("/admin/genres");
      }
    } catch (err) {
      console.error(err);
      alert("Cập nhật thể loại thất bại!");
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: { maxWidth: "500px", margin: "40px auto", padding: "24px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontFamily: "Arial, sans-serif" },
    header: { fontSize: "24px", fontWeight: "bold", background: "linear-gradient(to right, #7c3aed, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "20px", textAlign: "center" },
    label: { display: "block", marginBottom: "6px", fontWeight: 600 },
    input: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "16px", outline: "none", fontSize: "14px" },
    buttonGroup: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    submitBtn: { background: "linear-gradient(to right, #7c3aed, #f97316)", color: "#fff", padding: "10px 20px", borderRadius: "8px", border: "none", fontWeight: 600, cursor: "pointer" },
    backBtn: { textDecoration: "none", color: "#7c3aed", fontWeight: 600 },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sửa thể loại</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Tên thể loại:</label>
        <input
          type="text"
          placeholder="Nhập tên thể loại..."
          value={tenTheLoai}
          onChange={(e) => setTenTheLoai(e.target.value)}
          required
          style={styles.input}
        />

        <div style={styles.buttonGroup}>
          <Link to="/admin/genres" style={styles.backBtn}>
            ← Quay lại
          </Link>
          <button type="submit" style={styles.submitBtn}>
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenreEditPage;
