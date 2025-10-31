import React, { useState, useEffect } from "react";
import API from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseForm() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [error, setError] = useState(null);

  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    date: "",
  });

  const chartData = expenses.map((e) => ({
    name: e.description,
    amount: Number(e.amount),
  }));

  // Load expenses
  const loadExpenses = async () => {
    try {
      const res = await API.get("/api/expense");
      setExpenses(Array.isArray(res.data) ? res.data : []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load expenses.");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedExpense) {
        await API.put(`/api/expense/${selectedExpense.id}`, expense);
      } else {
        await API.post("/api/expense", expense);
      }
      setExpense({ description: "", amount: "", date: "" });
      setSelectedExpense(null);
      loadExpenses();
    } catch (err) {
      console.error(err);
      setError("Error saving expense.");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/expense/${id}`);
      loadExpenses();
    } catch (err) {
      console.error(err);
      setError("Error deleting expense.");
    }
  };

  const handleEdit = (exp) => {
    setSelectedExpense(exp);
    setExpense({
      description: exp.description,
      amount: exp.amount,
      date: exp.date,
    });
  };

  const handleCancel = () => {
    setSelectedExpense(null);
    setExpense({ description: "", amount: "", date: "" });
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
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">💰 Secure Expense Tracker</h2>
          <p className="text-muted">Track and visualize your spending easily</p>
        </div>

        {/* Form */}
        <div className="card shadow-lg border-0 rounded-4 mb-4">
          <div className="card-body">
            <h5 className="text-center text-success fw-semibold mb-3">
              {selectedExpense ? "Edit Expense" : "Add New Expense"}
            </h5>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-3 rounded-pill"
                placeholder="Enter description"
                value={expense.description}
                onChange={(e) =>
                  setExpense({ ...expense, description: e.target.value })
                }
                required
              />
              <input
                type="number"
                className="form-control mb-3 rounded-pill"
                placeholder="Enter amount"
                value={expense.amount}
                onChange={(e) =>
                  setExpense({ ...expense, amount: e.target.value })
                }
                required
              />
              <input
                type="date"
                className="form-control mb-3 rounded-pill"
                value={expense.date}
                onChange={(e) =>
                  setExpense({ ...expense, date: e.target.value })
                }
                required
              />
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-success rounded-pill">
                  {selectedExpense ? "Update Expense" : "Add Expense"}
                </button>
                {selectedExpense && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Error */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* List */}
        <div className="card shadow-lg border-0 rounded-4 mb-4">
          <div className="card-body">
            <h5 className="text-center text-success mb-3">Your Expenses</h5>
            {expenses.length === 0 ? (
              <p className="text-center text-muted">No expenses yet</p>
            ) : (
              <ul className="list-group">
                {expenses.map((e) => (
                  <li
                    key={e.id}
                    className="list-group-item d-flex justify-content-between align-items-center border-0 mb-2 shadow-sm rounded-3"
                    style={{
                      backgroundColor: "#f8f9fa",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e9f7ef")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f8f9fa")
                    }
                  >
                    <span>
                      <strong>{e.description}</strong> | ₹{e.amount} | {e.date}
                    </span>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-primary me-2 rounded-pill"
                        onClick={() => handleEdit(e)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger rounded-pill"
                        onClick={() => handleDelete(e.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body">
            <h5 className="text-center text-success mb-3">
              📊 Expense Overview Chart
            </h5>
            {expenses.length === 0 ? (
              <p className="text-center text-muted">No data to display</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#198754" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseForm;
