import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function AdminExpenseReport() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Check admin access
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ROLE_ADMIN") {
      navigate("/login");
    }
  }, [navigate]);

  // Load users
  const loadUsers = async () => {
    try {
      const res = await API.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Load expenses by user
  const loadExpenses = async (userId) => {
    try {
      const res = await API.get(`/api/admin/expenses?userId=${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load expenses.");
    }
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    if (userId) loadExpenses(userId);
    else setExpenses([]);
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #a8edea, #fed6e3)",
        padding: "40px 10px",
      }}
    >
      <div className="container">
        <div className="card shadow-lg border-0 rounded-4 p-4">
          <h2 className="text-success text-center mb-3">
            🧾 Admin Expense Report
          </h2>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {/* User Selection */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Select User:</label>
            <select
              className="form-select rounded-pill shadow-sm"
              value={selectedUserId}
              onChange={handleUserChange}
            >
              <option value="">-- Choose User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          {/* Expense Table */}
          <div className="card shadow-sm border-0 rounded-4 mt-3">
            <div className="card-body">
              {expenses.length > 0 ? (
                <>
                  <h5 className="text-success text-center mb-3">
                    Expense Details
                  </h5>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-success text-center">
                        <tr>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((exp) => (
                          <tr key={exp.id} className="text-center">
                            <td>{exp.date}</td>
                            <td>{exp.description}</td>
                            <td className="fw-semibold text-success">
                              ₹{exp.amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : selectedUserId ? (
                <p className="text-center text-muted">
                  No expenses found for this user.
                </p>
              ) : (
                <p className="text-center text-muted">
                  Please select a user to view their expenses.
                </p>
              )}
            </div>
          </div>

          
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary rounded-pill px-4"
              onClick={() => navigate("/expense")}
            >
               Back to My Expense
            </button>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default AdminExpenseReport;
