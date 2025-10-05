import React from "react";
import { useUsers } from "../../hooks/useUsers";
import "../../styles/Users.css";

const Users: React.FC = () => {
  const { users, loading } = useUsers();

  if (loading)
    return <div className="loading-container"><div className="loader"></div></div>;

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>👤 Users Management</h1>
        <button className="add-user-btn">+ Add New User</button>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u._id}</td>
                <td>{u.TenTK}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`role-badge ${u.role}`}>
                    {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${u.trangthai ? "active" : "inactive"}`}>
                    {u.trangthai ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
