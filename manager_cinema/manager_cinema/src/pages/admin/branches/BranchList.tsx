import React from "react";
import { useNavigate } from "react-router-dom";
import { useBranches } from "../../../hooks/useBranches";
import { deleteBranch } from "../../../services/branchService";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "../../../styles/BranchList.css"; // 👈 import file CSS

const BranchList: React.FC = () => {
  const { branches, loading, fetchBranches } = useBranches();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa chi nhánh này?")) {
      await deleteBranch(id);
      fetchBranches();
    }
  };

  if (loading) return <p className="loading">Đang tải dữ liệu...</p>;

  return (
    <div className="branch-container">
      <div className="branch-header">
        <h1>Quản lý chi nhánh</h1>
        <button
          className="add-btn"
          onClick={() => navigate("/admin/branches/create")}
        >
          <FiPlus /> Thêm chi nhánh
        </button>
      </div>

      <div className="table-wrapper">
        <table className="branch-table">
          <thead>
            <tr>
              <th>Tên chi nhánh</th>
              <th>Địa chỉ</th>
              <th>SĐT</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((b) => (
              <tr key={b.id}>
                <td>{b.TenChiNhanh}</td>
                <td>{b.DiaChi}</td>
                <td>{b.SDT}</td>
                <td>
                  <span className={b.Status ? "status active" : "status inactive"}>
                    {b.Status ? "Hoạt động" : "Ngừng hoạt động"}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/branches/edit/${b.id}`)}
                  >
                    <FiEdit /> Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(b.id)}
                  >
                    <FiTrash2 /> Xóa
                  </button>
                </td>
              </tr>
            ))}
            {branches.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  Chưa có chi nhánh nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchList;
