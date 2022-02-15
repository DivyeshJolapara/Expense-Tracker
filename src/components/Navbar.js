import React from "react";
import { useNavigate } from "react-router";
import config from "../config";
// import
const Navbar = () => {
  const nav = useNavigate();
  const handleLogout = () => {
    fetch(config.backendUrl + "/logout", {
      headers: { token: sessionStorage.getItem("token") },
      method: "POST",
    })
      .then((res) => res.text())
      .then((res) => {
        nav("/");
        sessionStorage.removeItem("token");
      });
  };
  return (
    <div
      style={{
        color: "white",
        zIndex: 10,
        backgroundColor: "black",
        width: "100%",
      }}
    >
      <h1>Expense Tracker</h1>
      <button onClick={handleLogout} className="btn btn-danger logout">
        {sessionStorage.getItem("token") ? "Logout" : ""}
      </button>
    </div>
  );
};

export default Navbar;
