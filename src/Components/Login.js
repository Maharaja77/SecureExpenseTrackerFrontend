import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { username, password });
      const token = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      const decoded = jwtDecode(token);
      const userRole = decoded.role;
      localStorage.setItem("role", userRole);

      alert("✅ Login successful!");

      if (userRole === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/expense");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
         background: "linear-gradient(135deg, #a8edea, #fed6e3)",
         animation: "fadeIn 1s ease-in-out",
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .form-control:focus {
            border-color: #198754;
            box-shadow: 0 0 6px rgba(25, 135, 84, 0.5);
          }
          .btn-success:hover {
            background-color: #157347 !important;
            transform: scale(1.02);
            transition: 0.2s ease;
          }
          .card {
            transition: transform 0.3s ease;
          }
          .card:hover {
            transform: translateY(-5px);
          }
        `}
      </style>

      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "400px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-success">
          Welcome Back 👋
        </h3>

        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control rounded-4"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control rounded-4"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 py-2 rounded-4 fw-semibold shadow-sm"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0 text-muted">
            New user?{" "}
            <Link
              to="/register"
              className="fw-bold text-success text-decoration-none"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
