import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { jwtDecode } from "jwt-decode"; // ✅ fixed import

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

      // Decode JWT
      const decoded = jwtDecode(token); // use named import
      const userRole = decoded.role; // "ROLE_USER" or "ROLE_ADMIN"
      localStorage.setItem("role", userRole);

      alert("Login successful");

      if (userRole === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/expense");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleLogin}
        className="p-4 rounded shadow bg-white"
        style={{ width: "350px" }}
      >
        <h2 className="text-center mb-4 text-success">Login Account</h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-success w-100 mb-3 border border-dark"
        >
          Login
        </button>

        <p className="text-center mb-0">
          New user? Create your account here.{" "}
          <Link to="/register" className="text-decoration-none text-success">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
