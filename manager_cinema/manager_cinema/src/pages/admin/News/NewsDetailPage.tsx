import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNewsById } from "../../../services/NewsService";
import type { News } from "../../../types/News";

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);

  useEffect(() => {
    if (id) getNewsById(id).then(setNews);
  }, [id]);

  if (!news) return <div className="p-4">Đang tải...</div>;

  const styles: { [key: string]: React.CSSProperties } = {
    container: { maxWidth: 700, margin: "40px auto", padding: 24, borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.1)", fontFamily: "Arial, sans-serif" },
    title: { fontSize: 28, fontWeight: "bold", color: "#7c3aed", marginBottom: 16 },
    img: { width: "100%", maxWidth: 400, borderRadius: 12, marginBottom: 16 },
    contentBox: { border: "1px solid #ddd", padding: 12, borderRadius: 8, whiteSpace: "pre-line", marginBottom: 12 },
    label: { fontWeight: "bold", marginTop: 8, display: "block" },
    btn: { display: "inline-block", padding: "8px 16px", borderRadius: 8, color: "#fff", textDecoration: "none", fontWeight: 600, marginRight: 8 },
    backBtn: { backgroundColor: "#6b7280" },
    editBtn: { backgroundColor: "#3b82f6" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{news.TieuDe}</h2>
      <img src={news.AnhTinTuc} alt={news.TieuDe} style={styles.img} />
      <span style={styles.label}>Nội dung:</span>
      <div style={styles.contentBox}>{news.NoiDung}</div>
      <p><span style={styles.label}>Phim liên quan:</span> {typeof news.MaPhim === "string" ? news.MaPhim : news.MaPhim?.TenPhim}</p>
      <p><span style={styles.label}>Trạng thái:</span> {news.TrangThai ? "Hiển thị" : "Ẩn"}</p>

      <div style={{ marginTop: 16 }}>
        <Link to="/admin/news" style={{ ...styles.btn, ...styles.backBtn }}>← Quay lại</Link>
        <Link to={`/admin/news/edit/${news.id}`} style={{ ...styles.btn, ...styles.editBtn }}>Sửa</Link>
      </div>
    </div>
  );
}
