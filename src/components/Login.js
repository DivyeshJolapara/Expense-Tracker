import React, { createContext, useRef } from "react";
import { useState, useEffect } from "react";
import config from "../config";
import { useNavigate } from "react-router";
import { shakeIt } from "../utils/expenseUtils";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passreq, setPassReq] = useState(false);
  const [usernameReq, setUsernameReq] = useState(false);
  const [err, setErr] = useState(false);

  let a = useRef();

  let nav = useNavigate();
  let status;

  useEffect(() => {
    console.log(a);
    return () => {};
  }, []);

  const userLogin = () => {
    // validate();
    setPassReq(false);
    setUsernameReq(false);

    if (password === "") {
      setPassReq(true);
      shakeIt("loginForm");

      return;
    }
    if (username === "") {
      setUsernameReq(true);
      shakeIt("loginForm");
      return;
    }
    fetch(config.backendUrl + "/auth", {
      method: "POST",

      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        status = res.status;
        return res.text();
      })
      .then((res) => {
        if (status !== 200) {
          shakeIt("loginForm");
          setErr(true);
          return;
        }
        sessionStorage.setItem("token", res);
        nav("/home");
      });
  };
  const usernameChange = (e) => {
    setUsername(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="loginForm col-md-4">
      {err && (
        <>
          <div ref={a} className="error">
            Invalid credentials
          </div>
        </>
      )}
      <h1>Login</h1>
      <div className="form">
        <div className="form-group">
          username
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={usernameChange}
          />
          <div id="unameError">{usernameReq && <ReqError />}</div>
        </div>
        <div className="form-group">
          password
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={passwordChange}
          />
          <div id="passError">{passreq && <ReqError />}</div>
        </div>
        <button className="btn btn-success form-control" onClick={userLogin}>
          Login
        </button>
        <Link style={{ color: "white" }} to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};
const ReqError = () => {
  return <div style={{ color: "red" }}>Required</div>;
};
export default Login;
