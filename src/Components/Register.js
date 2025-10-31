import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", {
        username,
        password,
        role: "ROLE_USER",
      });
      alert("🎉 Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("❌ Registration failed. Try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #a8edea, #fed6e3)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "400px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      >
        <h3 className="text-center mb-4 fw-bold text-success">
          Create Your Account ✍️
        </h3>

        <form onSubmit={handleRegister}>
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

          <div className="form-floating mb-4 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control rounded-4"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>

            {/* Bootstrap eye icon toggle */}
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "14px",
                cursor: "pointer",
                color: "#6c757d",
                fontSize: "1.2rem",
              }}
            ></i>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 py-2 rounded-4 fw-semibold shadow-sm"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0 text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="fw-bold text-success text-decoration-none"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
