import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [TenTK, setTenTK] = useState('');
  const [pass, setPass] = useState('');
  const setAuth = useAuthStore((state: any) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await login({ TenTK, pass });
      if (!user.trangthai) {
        alert("Tài khoản đã bị khóa hoặc chưa được kích hoạt!");
        return;
      }
      setAuth(token, user);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        alert('Chỉ tài khoản admin mới được truy cập');
      }
    } catch (err: any) {
      alert(err.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logoblack.PNG" alt="Logo" className="login-logo" />
        <h2 className="login-title">Đăng nhập hệ thống</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={TenTK}
            onChange={(e) => setTenTK(e.target.value)}
            placeholder="Tên tài khoản"
            className="login-input"
            required
          />
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Mật khẩu"
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
