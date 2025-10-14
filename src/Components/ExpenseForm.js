import React, { useState, useEffect } from "react";
import API from "../api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function ExpenseForm() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [error, setError] = useState(null);

  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    date: "",
  });

  // Prepare chart data
const chartData = expenses.map(e => ({
  name: e.description,
  amount: Number(e.amount)
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

  // Handle Add / Update
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

  // Delete expense
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/expense/${id}`);
      loadExpenses();
    } catch (err) {
      console.error(err);
      setError("Error deleting expense.");
    }
  };

  // Edit expense
  const handleEdit = (exp) => {
    setSelectedExpense(exp);
    setExpense({
      description: exp.description,
      amount: exp.amount,
      date: exp.date,
    });
  };

  // Cancel edit
  const handleCancel = () => {
    setSelectedExpense(null);
    setExpense({ description: "", amount: "", date: "" });
  };



  return (
    <div className="container py-5">
      {/* Header Section with Logout */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-success">Expense Tracker</h3>
      </div>

      {/* Expense Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="text-success text-center mb-3">
            {selectedExpense ? "Edit Expense" : "Add Expense"}
          </h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Description"
              value={expense.description}
              onChange={(e) =>
                setExpense({ ...expense, description: e.target.value })
              }
              required
            />
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Amount"
              value={expense.amount}
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
              required
            />
            <input
              type="date"
              className="form-control mb-3"
              value={expense.date}
              onChange={(e) =>
                setExpense({ ...expense, date: e.target.value })
              }
              required
            />
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success">
                {selectedExpense ? "Update" : "Add"}
              </button>
              {selectedExpense && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {/* Expense List */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="text-success mb-3 text-center">Your Expenses</h5>
          <ul className="list-group">
            {expenses.length === 0 ? (
              <li className="list-group-item text-center text-muted">
                No expenses found
              </li>
            ) : (
              expenses.map((e) => (
                <li
                  key={e.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong>{e.description}</strong> | ₹{e.amount} | {e.date}
                  </span>
                  <div>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(e)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <div className="card shadow-sm mt-4">
  <div className="card-body">
    <h5 className="text-success mb-3 text-center">Expenses Chart</h5>
    {expenses.length === 0 ? (
      <p className="text-center text-muted">No expenses to display</p>
    ) : (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#198754" />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
</div>

    </div>
  );
}

export default ExpenseForm;
