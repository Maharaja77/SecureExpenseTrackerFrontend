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
      navigate("/login"); // redirect non-admins
    }
  }, [navigate]);

  // Load users for dropdown
  const loadUsers = async () => {
    try {
      const res = await API.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Load expenses for selected user
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
    <div>
      <div className="container py-5">
        <h3 className="text-success mb-4 text-center">Admin Expense Report</h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* User Dropdown */}
        <div className="mb-4">
          <label className="form-label">Select User:</label>
          <select
            className="form-select"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        {/* Expenses Table */}
        {expenses.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.date}</td>
                  <td>{exp.description}</td>
                  <td>₹{exp.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : selectedUserId ? (
          <p className="text-center text-muted">No expenses found for this user.</p>
        ) : (
          <p className="text-center text-muted">Select a user to view expenses.</p>
        )}
      </div>
    </div>
  );
}

export default AdminExpenseReport;
