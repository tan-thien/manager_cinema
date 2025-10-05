import React, { useEffect, useState } from "react";
import { getCinemaById, updateCinema } from "../../../services/cinemaService";
import { getAllBranches } from "../../../services/branchService";
import { useNavigate, useParams } from "react-router-dom";
import type { Branch } from "../../../types/Branch";

const CinemaEdit: React.FC = () => {
  const { id } = useParams();
  const [TenRap, setTenRap] = useState("");
  const [SoLuongGhe, setSoLuongGhe] = useState(0);
  const [TrangThai, setTrangThai] = useState(true);
  const [MaChiNhanh, setMaChiNhanh] = useState("");
  const [branches, setBranches] = useState<Branch[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllBranches().then((data: Branch[]) => setBranches(data));
  }, []);

  useEffect(() => {
    if (id) {
      getCinemaById(id).then((c) => {
        setTenRap(c.TenRap);
        setSoLuongGhe(c.SoLuongGhe);
        setTrangThai(c.TrangThai);
        setMaChiNhanh(
          typeof c.MaChiNhanh === "object" && c.MaChiNhanh !== null
            ? c.MaChiNhanh.id
            : c.MaChiNhanh
        );
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCinema(id, { TenRap, SoLuongGhe, TrangThai, MaChiNhanh });
        navigate("/admin/cinemas");
      }
    } catch (err) {
      console.error("Error updating cinema:", err);
    }
  };

  // ---- CSS gộp trong TSX ----
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px 30px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "30px",
      color: "#333",
    },
    formGroup: {
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      borderRadius: "6px",
      border: "1px solid #ced4da",
      fontSize: "16px",
    },
    checkboxWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "20px",
    },
    buttons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "30px",
    },
    btnPrimary: {
      backgroundColor: "#0d6efd",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      fontWeight: 600,
      cursor: "pointer",
    },
    btnPrimaryHover: {
      backgroundColor: "#0b5ed7",
    },
    btnSecondary: {
      backgroundColor: "#6c757d",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      fontWeight: 600,
      cursor: "pointer",
    },
    btnSecondaryHover: {
      backgroundColor: "#5c636a",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✏️ Sửa Rạp</h1>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label>Tên Rạp:</label>
          <input
            type="text"
            value={TenRap}
            onChange={(e) => setTenRap(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Số Lượng Ghế:</label>
          <input
            type="number"
            value={SoLuongGhe}
            onChange={(e) => setSoLuongGhe(+e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.checkboxWrapper}>
          <input
            type="checkbox"
            checked={TrangThai}
            onChange={(e) => setTrangThai(e.target.checked)}
          />
          <label>Hoạt động</label>
        </div>

        <div style={styles.formGroup}>
          <label>Chi Nhánh:</label>
          <select
            value={MaChiNhanh}
            onChange={(e) => setMaChiNhanh(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">-- Chọn chi nhánh --</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.TenChiNhanh}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.buttons}>
          <button
            type="button"
            style={styles.btnSecondary}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = styles.btnSecondaryHover.backgroundColor!)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = styles.btnSecondary.backgroundColor!)
            }
            onClick={() => navigate("/admin/cinemas")}
          >
            ← Quay lại
          </button>
          <button
            type="submit"
            style={styles.btnPrimary}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = styles.btnPrimaryHover.backgroundColor!)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = styles.btnPrimary.backgroundColor!)
            }
          >
            💾 Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default CinemaEdit;
