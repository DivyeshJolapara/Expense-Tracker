import React, { useState, useEffect } from "react";
import config from "../config";

const AddExpense = ({ setAddClicked }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(config.backendUrl + "/categories", {
      headers: { token: sessionStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(JSON.stringify(res));
        setCategories(res);
        setCategory(res[0].id);
      });
    return () => {};
  }, []);

  // let categories = ["grocery", "utility", "other"];

  const handleNameChange = (event) => {
    setName(event.target.value);
    // console.log(name);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const submitExpense = (e) => {
    e.preventDefault();
    if (name.trim() === "" || amount.trim() === "") {
      document.getElementById("addForm").classList.add("shake");
      e.preventDefault();
      setTimeout(() => {
        document.getElementById("addForm").classList.remove("shake");
      }, 500);

      return;
    } else {
      fetch(config.backendUrl + "/create", {
        method: "POST",
        headers: {
          "content-type": "Application/json",
          token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: name,
          amount: amount,
          category: {
            id: category,
            // category: category,
          },
        }),
      }).then((res) => {
        console.log(res);
        setName("");
        setAmount(0);
        setAddClicked(false);
        document.querySelector(".modal-bg").classList.remove("modal-open");
      });
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    // setAddClicked(false);
    document.querySelector(".modal-bg").classList.remove("modal-open");

    // return;
  };
  const selectChange = (e) => {
    console.log(e.target.options[e.target.options.selectedIndex].value); //.selectedIndex);
    setCategory(e.target.options[e.target.options.selectedIndex].value);
  };
  // let categories = ["groceries", "utility", "others"];
  return (
    <div className="modal-bg">
      <div class="modal-body">
        <form id="addForm" className="form col-md-4">
          <label>
            <b>Name</b>
          </label>
          <input
            className="form-control"
            value={name}
            type="text"
            onChange={handleNameChange}
          />

          <label>
            <b>Amount</b>
          </label>
          <input
            className="form-control"
            value={amount}
            type="number"
            onChange={handleAmountChange}
          />

          <label>
            <b>Category</b>
          </label>
          <select onChange={selectChange} className="form-control">
            {categories.map((c) => {
              return <option value={c.id}>{c.category}</option>;
            })}
          </select>
          <div className="form-group" style={{ marginTop: "1rem" }}>
            <button className="btn btn-danger col-md-6" onClick={handleCancel}>
              Cancel
            </button>
            <button
              id="addBtn"
              className="btn btn-success col-md-6"
              onClick={submitExpense}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
    // <!-- Button trigger modal -->
  );
};

export default AddExpense;
