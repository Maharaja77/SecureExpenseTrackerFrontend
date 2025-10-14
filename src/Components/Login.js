import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Login(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleLogin = async (e)=>{
        e.preventDefault();
        try{

            const response = await API.post("/auth/login",{username,password});

            localStorage.setItem("token",response.data.accessToken);
            localStorage.setItem("refreshToken",response.data.refreshToken);
            alert("login success");
            navigate("/expense");

        }
        catch(error){
            alert("Login failed");
        }
    };
    return(
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
                  <Link to="/Register" className="text-decoration-none text-success">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          );
    



}

export default Login;