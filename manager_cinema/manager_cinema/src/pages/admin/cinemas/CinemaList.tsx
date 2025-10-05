import React, { useEffect, useState } from "react";
import { getAllCinemas } from "../../../services/cinemaService";
import type { Cinema } from "../../../types/Cinema";
import { useNavigate } from "react-router-dom";

const CinemaList: React.FC = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCinemas();
        setCinemas(data);
      } catch (error) {
        console.error("Error fetching cinemas:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ color: "#333" }}>🎥 Danh sách Rạp</h1>
        <button
          onClick={() => navigate("/admin/cinemas/create")}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 16px",
            cursor: "pointer",
            fontSize: "15px",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#0056b3")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#007bff")
          }
        >
          ➕ Thêm Rạp
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#f8f9fa" }}>
          <tr>
            {["ID", "Tên Rạp", "Số Ghế", "Trạng Thái", "Chi Nhánh", "Hành động"].map(
              (header) => (
                <th
                  key={header}
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "2px solid #dee2e6",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {cinemas.length > 0 ? (
            cinemas.map((c, index) => (
              <tr
                key={c.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                }}
              >
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #eee" }}>
                  {c.id}
                </td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #eee" }}>
                  {c.TenRap}
                </td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #eee" }}>
                  {c.SoLuongGhe}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #eee",
                    color: c.TrangThai ? "green" : "red",
                    fontWeight: 600,
                  }}
                >
                  {c.TrangThai ? "Hoạt động" : "Ngưng"}
                </td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #eee" }}>
                  {typeof c.MaChiNhanh === "object" && c.MaChiNhanh !== null
                    ? c.MaChiNhanh.TenChiNhanh
                    : c.MaChiNhanh}
                </td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #eee" }}>
                  <button
                    onClick={() => navigate(`/admin/cinemas/edit/${c.id}`)}
                    style={{
                      backgroundColor: "#ffc107",
                      border: "none",
                      color: "#212529",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "background 0.3s",
                    }}
                    onMouseOver={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        "#e0a800")
                    }
                    onMouseOut={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        "#ffc107")
                    }
                  >
                    ✏️ Sửa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#666",
                }}
              >
                Không có rạp nào được tìm thấy.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CinemaList;
