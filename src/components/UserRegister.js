import React, { useState } from "react";
import { useNavigate } from "react-router";
import config from "../config";
import { shakeIt } from "../utils/expenseUtils";

let model = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  dob: "",
};

const UserRegister = () => {
  const [user, setUser] = useState(model);
  const [resp, setResp] = useState();
  const [passMatch, setPassMatch] = useState(true);
  let nav = useNavigate();
  let status;
  const formSubmit = () => {
    if (
      !passMatch ||
      !user.firstName ||
      !user.lastName ||
      !user.password ||
      !user.dob
    ) {
      shakeIt("register");
      setResp("All fields are required");
      return;
    }
    console.log(user);
    fetch(config.backendUrl + "/user/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((res) => {
        if (status !== 201) {
          setResp(res.message);

          shakeIt("register");
          return;
        }
        nav("/");
      });
  };
  return (
    <div id="register" className="register col-md-4">
      <h1>Register</h1>
      {resp && <div className="error">{resp}</div>}

      <div className="form">
        <div className="form-group">
          <label for="">First Name</label>
          <input
            type="text"
            onChange={(e) => {
              setUser({ ...user, firstName: e.target.value });
              //   console.log(user);
            }}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label for="">Last Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setUser({ ...user, lastName: e.target.value });
              //   console.log(user);
            }}
          />
        </div>

        <div className="form-group">
          <label for="">Username</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
              //   console.log(user);
            }}
          />
        </div>

        <div className="form-group">
          <label for="">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
              //   console.log(user);
            }}
          />
        </div>
        <div className="form-group">
          <label for="">Confirm Password</label>
          <input
            type="password"
            onBlur={(e) => {
              //   console.log(e.target.val);
              //   console.log(user.password);
              if (e.target.value !== user.password) {
                setPassMatch(false);
                console.log("not match");
              } else {
                setPassMatch(true);
              }
            }}
            className="form-control"
          />
        </div>
        {!passMatch && <div className="error">Passwords do not match</div>}

        <div className="form-group">
          <label for="">DOB</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => {
              setUser({ ...user, dob: e.target.value });
              //   console.log(user);
            }}
          />
        </div>

        <div className="form-group">
          {/* <label for="">First Name</label> */}
          <input
            type="button"
            id="regBtn"
            className="form-control btn btn-success"
            value="Register"
            onClick={formSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
