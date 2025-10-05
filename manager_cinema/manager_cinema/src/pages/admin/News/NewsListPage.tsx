import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNews, deleteNews } from "../../../services/NewsService";
import type { News } from "../../../types/News";

export default function NewsListPage() {
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        getAllNews().then(setNews);
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Bạn có chắc muốn xóa tin tức này?")) {
            await deleteNews(id);
            setNews(news.filter((n) => n.id !== id));
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
        actionBtn: { padding: "6px 12px", borderRadius: 8, fontWeight: 600, cursor: "pointer", border: "none", color: "#fff" },
        editBtn: { background: "#7c3aed", marginRight: 8 },
        deleteBtn: { background: "#f97316" },
        imageWrapper: { width: 80, height: 80, overflow: "hidden", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ccc" },
        image: { width: "100%", height: "100%", objectFit: "cover" },
        newsLink: { color: "#7c3aed", textDecoration: "none", fontWeight: 600 },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Quản lý Tin tức</h2>
            <Link to="/admin/news/create" style={styles.addBtn}>+ Thêm tin tức</Link>

            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.headerRow}>
                            <th style={styles.th}>Ảnh</th>
                            <th style={styles.th}>Tiêu đề</th>
                            <th style={styles.th}>Phim</th>
                            <th style={styles.th}>Trạng thái</th>
                            <th style={styles.th}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map((n) => (
                            <tr key={n.id}>
                                <td style={styles.td}>
                                    <div style={styles.imageWrapper}>
                                        <img src={n.AnhTinTuc} alt={n.TieuDe} style={styles.image} />
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <Link to={`/admin/news/${n.id}`} style={styles.newsLink}>{n.TieuDe}</Link>
                                </td>
                                <td style={styles.td}>{typeof n.MaPhim === "string" ? n.MaPhim : n.MaPhim?.TenPhim}</td>
                                <td style={styles.td}>{n.TrangThai ? "Hiển thị" : "Ẩn"}</td>
                                <td style={styles.td}>
                                    <Link
                                        to={`/admin/news/edit/${n.id}`}
                                        style={{
                                            ...styles.actionBtn,
                                            ...styles.editBtn,
                                            textDecoration: "none" // bỏ underline
                                        }}
                                    >
                                        Sửa
                                    </Link>

                                    <button onClick={() => handleDelete(n.id)} style={{ ...styles.actionBtn, ...styles.deleteBtn }}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
