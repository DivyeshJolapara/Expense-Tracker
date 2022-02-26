import React from "react";
import { useNavigate } from "react-router";
import config from "../config";
// import
const Navbar = () => {
  const nav = useNavigate();
  const handleLogout = () => {
    fetch(config.backendUrl + "/logout2", {
      headers: {
        token: sessionStorage.getItem("token"),
      },
      method: "POST",
    })
      .then((res) => res.text())
      .then((res) => {
        nav("/");
        sessionStorage.removeItem("token");
      });
  };
  return (
    <div className="navbar">
      <h1>Expense Tracker</h1>
      {sessionStorage.getItem("token") && (
        <button onClick={handleLogout} className="btn btn-danger logout">
          {sessionStorage.getItem("token") ? "Logout" : ""}
        </button>
      )}
    </div>
  );
};

export default Navbar;
