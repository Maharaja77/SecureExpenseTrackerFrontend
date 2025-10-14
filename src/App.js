import './App.css';
import Header from './Components/Header';
import Register from './Components/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Footer from './Components/Footer';
import ExpenseForm from './Components/ExpenseForm';
//import ExpenseList from './Components/ExpenseList';
import AdminExpenseReport from './Components/AdminExpenseReport';
function App() {
  const role = localStorage.getItem("role"); // "ROLE_USER" or "ROLE_ADMIN"
  const token = localStorage.getItem("token"); // JWT token
  
  return (
    <Router>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Route */}
        <Route
          path="/expense"
          element={token ? <ExpenseForm /> : <Navigate to="/login" replace />}
        />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            token && role === "ROLE_ADMIN" ? (
              <AdminExpenseReport />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Redirect any unknown route to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
