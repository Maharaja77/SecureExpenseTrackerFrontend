import './App.css';
import Header from './Components/Header';
import Register from './Components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Footer from './Components/Footer';
import ExpenseForm from './Components/ExpenseForm';
//import ExpenseList from './Components/ExpenseList';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/expense"element={<ExpenseForm/>}/>
       {/* // <Route path="/expense" element={<ExpenseList/>}/> */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
