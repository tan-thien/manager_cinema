import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieService } from "../../../services/MovieService";
import type { Movie } from "../../../types/Movie";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (id) {
      movieService.getById(id).then(setMovie);
    }
  }, [id]);

  if (!movie) return <div style={{ padding: 16 }}>Loading...</div>;

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: 24,
      maxWidth: 700,
      margin: "0 auto",
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    backBtn: {
      marginBottom: 16,
      padding: "8px 16px",
      borderRadius: 8,
      border: "none",
      background: "linear-gradient(to right, #7c3aed, #f97316)",
      color: "#fff",
      cursor: "pointer",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 16,
      color: "#7c3aed",
    },
    imageWrapper: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 16,
    },
    image: {
      width: 256,
      height: "auto",
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    infoRow: {
      marginBottom: 8,
      color: "#333",
    },
    label: {
      fontWeight: "bold",
      marginRight: 4,
    },
    link: {
      color: "#f97316",
      textDecoration: "underline",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate("/admin/movies")}>
        &larr; Quay lại
      </button>

      <h2 style={styles.title}>{movie.TenPhim}</h2>

      <div style={styles.imageWrapper}>
        <img src={movie.AnhPhim} alt={movie.TenPhim} style={styles.image} />
      </div>

      <div>
        <p style={styles.infoRow}>
          <span style={styles.label}>Mô tả:</span> {movie.MoTa}
        </p>
        <p style={styles.infoRow}>
          <span style={styles.label}>Thể loại:</span>{" "}
          {typeof movie.MaTheLoai === "string" ? movie.MaTheLoai : movie.MaTheLoai?.TenTheLoai}
        </p>
        <p style={styles.infoRow}>
          <span style={styles.label}>Thời lượng:</span> {movie.ThoiLuong} phút
        </p>
        <p style={styles.infoRow}>
          <span style={styles.label}>Ngày chiếu:</span> {new Date(movie.Ngay).toLocaleDateString()}
        </p>
        {movie.trailerUrl && (
          <p style={styles.infoRow}>
            <span style={styles.label}>Trailer:</span>{" "}
            <a href={movie.trailerUrl} target="_blank" rel="noreferrer" style={styles.link}>
              Xem Trailer
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
