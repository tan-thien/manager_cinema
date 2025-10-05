import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { movieService } from "../../../services/MovieService";
import type { Movie } from "../../../types/Movie";

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);

    const loadData = async () => {
        const data = await movieService.getAll();
        setMovies(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Bạn có chắc muốn xóa phim này?")) {
            await movieService.remove(id);
            loadData();
        }
    };

    const styles: { [key: string]: React.CSSProperties } = {
        container: { padding: 24, fontFamily: "Arial, sans-serif", margin: "0 auto" },
        title: { fontSize: 28, fontWeight: "bold", marginBottom: 16, background: "linear-gradient(to right, #7c3aed, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
        addBtn: { background: "linear-gradient(to right, #7c3aed, #f97316)", color: "#fff", padding: "10px 20px", borderRadius: 12, textDecoration: "none", fontWeight: 600, display: "inline-block", marginBottom: 16, transition: "all 0.3s" },
        tableWrapper: { overflowX: "auto", borderRadius: 12, border: "1px solid #ddd" },
        table: { width: "100%", borderCollapse: "separate", borderSpacing: 0, borderRadius: 12, overflow: "hidden" },
        headerRow: { background: "linear-gradient(to right, #7c3aed, #f97316)", color: "#fff" },
        th: { padding: 12, textAlign: "left" },
        td: { padding: 10, borderTop: "1px solid #eee", verticalAlign: "middle" },
        actionBtn: { marginRight: 8, padding: "4px 12px", borderRadius: 8, fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.2s" },
        editBtn: { backgroundColor: "#7c3aed", color: "#fff" },
        deleteBtn: { backgroundColor: "#f97316", color: "#fff" },
        movieTitle: { color: "#7c3aed", fontWeight: 600 },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Quản lý Phim</h2>
            <Link to="/admin/movies/create" style={styles.addBtn}>+ Thêm phim</Link>

            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.headerRow}>
                            <th style={styles.th}>Tên phim</th>
                            <th style={styles.th}>Mô tả</th>
                            <th style={styles.th}>Thể loại</th>
                            <th style={styles.th}>Thời lượng</th>
                            <th style={styles.th}>Ngày</th>
                            <th style={styles.th}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((m) => (
                            <tr key={m.id}>
                                <td style={styles.td}>
                                    <Link
                                        to={`/admin/movies/${m.id}`}
                                        style={{ color: "#7c3aed", textDecoration: "none", fontWeight: 600 }}
                                    >
                                        {m.TenPhim}
                                    </Link>
                                </td>

                                <td style={styles.td}>{m.MoTa}</td>
                                <td style={styles.td}>{typeof m.MaTheLoai === "string" ? m.MaTheLoai : m.MaTheLoai?.TenTheLoai}</td>
                                <td style={styles.td}>{m.ThoiLuong} phút</td>
                                <td style={styles.td}>{new Date(m.Ngay).toLocaleDateString()}</td>
                                <td style={styles.td}>
                                    <Link
                                        to={`/admin/movies/edit/${m.id}`}
                                        style={{ ...styles.actionBtn, ...styles.editBtn, textDecoration: "none" }}
                                    >
                                        Sửa
                                    </Link>
                                    <button onClick={() => handleDelete(m.id)} style={{ ...styles.actionBtn, ...styles.deleteBtn }}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
