import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!formData.email || !formData.userName || !formData.password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:9999/account/register', formData);
      
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        toast.success('Đăng ký thành công!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Đợi 2 giây trước khi chuyển hướng để người dùng thấy thông báo
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đã có lỗi xảy ra khi đăng ký', {
        position: "top-right",
        autoClose: 3000,
      });
      setError(err.response?.data?.message || 'Đã có lỗi xảy ra khi đăng ký');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ToastContainer />
      <div className="register-left-section">
        <h1>Cách tốt nhất để học. Đăng ký miễn phí.</h1>
        <img
          alt="Colorful notebooks and white headphones"
          height="800"
          src="https://th.bing.com/th/id/OIG4._8czaS_hxnpxvorG7z_D?w=1024&h=1024&rs=1&pid=ImgDetMain"
          width="800"
        />
      </div>
      <div className="register-right-section">
        <div className="register-login-container">
          <div className="register-tabs">
            <h2 className="register-active">Đăng ký</h2>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <h2>Đăng nhập</h2>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="register-email-login">
            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
            
            <p>Email</p>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập địa chỉ email của bạn"
              type="email"
            />
            
            <p>Tên người dùng</p>
            <input
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Nhập tên người dùng của bạn"
              type="text"
            />
            
            <p>Mật khẩu</p>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu của bạn"
              type="password"
            />

            <button
              type="submit"
              disabled={loading}
              className="register-login-button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                backgroundColor: loading ? "#cccccc" : "#4CAF50",
                color: "white",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
          </form>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <button
              className="register-login-button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                backgroundColor: "#008CBA",
                color: "white",
                border: "none",
              }}
            >
              Bạn đã có tài khoản? Đăng nhập
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;