import React, { useState } from "react";
import config from "../config";
import { timeForInputValue } from "../utils/timeFormat";

const BaseModal = ({ expense, setModalOpen, setEditModalClosedToggle }) => {
  const [name, setName] = useState(expense.name);
  const [amount, setAmount] = useState(expense.amount);
  const [date, setDate] = useState(timeForInputValue(expense.date));
  const [newDate, setNewDate] = useState(date);
  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function handleEditSubmit() {
    setModalOpen(false);
    if (newDate === date) {
      console.log(expense.date);
      setNewDate(expense.date);
      console.log("INSIDE iFFFFFFFFFFFFF");
    }
    console.log(newDate); //, "jehdheu newwww dateeeeeeee"); // in case date not edited send the previos value formatted correctly
    editExpenseInternal(
      expense.id,
      { name, amount, newDate: expense.date },
      setEditModalClosedToggle
    );
  }
  const handleDateChange = (event) => {
    setNewDate(new Date(event.target.value) * 1);
    setDate(event.target.value);
  };

  // console.log("MODAL props: " + props);
  return (
    <div id="editModal" className="modal-bg-edit modal-open">
      <div className="modal-body">
        <div id="editForm" className="form">
          NAME:{" "}
          <input
            type="text"
            onChange={handleNameChange}
            className="form-control"
            value={name}
          />
          AMOUNT:
          <input
            type="number"
            className="form-control"
            onChange={handleAmountChange}
            value={amount}
          />
          <input
            type="datetime-local"
            value={date}
            onChange={handleDateChange}
            className="form-control"
          />
          <button
            className="btn btn-danger"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button className="btn btn-success" onClick={handleEditSubmit}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

const editExpenseInternal = (id, expense, semc) => {
  fetch(config.backendUrl + "/edit/" + id, {
    method: "PUT",
    headers: {
      "content-type": "Application/json",
      token: sessionStorage.getItem("token"),
    },

    body: JSON.stringify({
      name: expense.name,
      amount: expense.amount,
      date: expense.newDate,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("edited");
    })
    .finally(() => {
      semc((prev) => !prev);
    });
};
export default BaseModal;
