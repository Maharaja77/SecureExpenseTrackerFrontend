import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // By default, new users will get ROLE_USER
      await API.post("/auth/register", {
        username,
        password,
        role: "ROLE_USER", // assign role
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleRegister}
        className="p-4 rounded shadow bg-white"
        style={{ width: "350px" }}
      >
        <h2 className="text-center mb-4 text-success">Create Account</h2>

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
          Register
        </button>

        <p className="text-center mb-0">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none text-success">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
