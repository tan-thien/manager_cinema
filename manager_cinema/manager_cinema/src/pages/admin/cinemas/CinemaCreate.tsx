import React, { useState, useEffect } from "react";
import { createCinema } from "../../../services/cinemaService";
import { getAllBranches } from "../../../services/branchService";
import { useNavigate } from "react-router-dom";
import type { Branch } from "../../../types/Branch";
import '../../../styles/CinemaCreate.css'; // import CSS gom chung

const CinemaCreate: React.FC = () => {
  const [TenRap, setTenRap] = useState("");
  const [SoLuongGhe, setSoLuongGhe] = useState(0);
  const [TrangThai, setTrangThai] = useState(true);
  const [MaChiNhanh, setMaChiNhanh] = useState("");
  const [branches, setBranches] = useState<Branch[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllBranches().then((data: Branch[]) => setBranches(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCinema({ TenRap, SoLuongGhe, TrangThai, MaChiNhanh });
      navigate("/admin/cinemas");
    } catch (err) {
      console.error("Error creating cinema:", err);
    }
  };

  return (
    <div className="cinema-create-container">
      <h1 className="page-title">🎬 Thêm Rạp Mới</h1>

      <form onSubmit={handleSubmit}>
        {/* Tên Rạp */}
        <div className="form-group">
          <label>Tên Rạp:</label>
          <input
            type="text"
            value={TenRap}
            onChange={(e) => setTenRap(e.target.value)}
            required
            placeholder="Nhập tên rạp..."
            className="form-control"
          />
        </div>

        {/* Số lượng ghế */}
        <div className="form-group">
          <label>Số Lượng Ghế:</label>
          <input
            type="number"
            value={SoLuongGhe}
            onChange={(e) => setSoLuongGhe(+e.target.value)}
            required
            className="form-control"
          />
        </div>

        {/* Trạng thái */}
        <div className="form-check">
          <input
            type="checkbox"
            checked={TrangThai}
            onChange={(e) => setTrangThai(e.target.checked)}
            className="form-check-input"
            id="trangThaiCheck"
          />
          <label className="form-check-label" htmlFor="trangThaiCheck">
            Hoạt động
          </label>
        </div>

        {/* Chi nhánh */}
        <div className="form-group">
          <label>Chi Nhánh:</label>
          <select
            value={MaChiNhanh}
            onChange={(e) => setMaChiNhanh(e.target.value)}
            required
            className="form-control"
          >
            <option value="">-- Chọn chi nhánh --</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.TenChiNhanh}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate("/admin/cinemas")}
            className="btn btn-secondary"
          >
            ← Quay lại
          </button>
          <button type="submit" className="btn btn-primary">
            ➕ Thêm mới
          </button>
        </div>
      </form>
    </div>
  );
};

export default CinemaCreate;
