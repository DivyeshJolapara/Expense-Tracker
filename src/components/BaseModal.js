import React, { useState } from "react";
import config from "../config";

const BaseModal = (props) => {
  const [name, setName] = useState(""); //props.expense.name);
  const [amount, setAmount] = useState(""); //props.expense.amount);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function handleEditSubmit() {
    editExpenseInternal(props.expense.id, { name, amount }, props.setModalOpen);
  }

  console.log("MODAL props: " + props);
  return (
    <div id="#test" className="modal-bg-edit modal-open">
      <div className="modal-body">
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
        <button className="btn btn-success" onClick={handleEditSubmit}>
          SAVE
        </button>
      </div>
    </div>
  );
};

const editExpenseInternal = (id, expense, smo) => {
  fetch(config.backendUrl + "/edit/" + id, {
    method: "PUT",
    headers: { "content-type": "Application/json" },

    body: JSON.stringify(expense),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("edited");
    })
    .finally(() => {
      // smo(false);
    });
};
export default BaseModal;
