import { useEffect, useState } from "react";
import { getAllGenres, deleteGenre } from "../../../services/genreService";
import type { Genre } from "../../../types/Genre";
import { Link } from "react-router-dom";

const GenreListPage = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  const fetchGenres = async () => {
    const data = await getAllGenres();
    setGenres(data);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      await deleteGenre(id);
      fetchGenres();
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: { maxWidth: "600px", margin: "40px auto", padding: "24px", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", fontFamily: "Arial, sans-serif" },
    header: { fontSize: "24px", fontWeight: "bold", background: "linear-gradient(to right, #7c3aed, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "20px", textAlign: "center" },
    addBtn: { display: "inline-block", marginBottom: "16px", background: "linear-gradient(to right, #7c3aed, #f97316)", color: "#fff", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontWeight: 600 },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { border: "1px solid #ddd", padding: "10px", backgroundColor: "#f0f0f0", textAlign: "left", borderRadius: "8px 8px 0 0" },
    td: { border: "1px solid #ddd", padding: "10px" },
    actionBtn: { marginRight: "8px", padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: 600 },
    editBtn: { background: "#7c3aed", color: "#fff" },
    deleteBtn: { background: "#f97316", color: "#fff" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Danh sách thể loại</h2>
      <Link to="/admin/genres/create" style={styles.addBtn}>+ Thêm thể loại</Link>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Tên thể loại</th>
            <th style={styles.th}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((g) => (
            <tr key={g.id}>
              <td style={styles.td}>{g.TenTheLoai}</td>
              <td style={styles.td}>
                <Link to={`/admin/genres/edit/${g.id}`}>
                  <button style={{ ...styles.actionBtn, ...styles.editBtn }}>Sửa</button>
                </Link>
                <button
                  style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                  onClick={() => handleDelete(g.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenreListPage;
