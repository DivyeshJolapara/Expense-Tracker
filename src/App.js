import logo from "./logo.svg";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import AddExpense from "./components/AddExpense";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Error from "./components/Error";
import BaseModal from "./components/BaseModal";
import UserRegister from "./components/UserRegister";
import ProfileDetails from "./components/ProfileDetails";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<ExpenseList />} />
          <Route path="error" element={<Error />} />
          <Route path="edit" element={<BaseModal />} />
          <Route path="register" element={<UserRegister />} />
          <Route path="profile" element={<ProfileDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
