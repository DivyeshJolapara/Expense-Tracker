import React, { useEffect, useState } from "react";
import config from "../config";
import BaseModal from "./BaseModal";
import { calcTime } from "../utils/timeFormat";
import AddExpense from "./AddExpense";
import {
  deleteExpense,
  editExpense,
  createPaginationArray,
} from "../utils/expenseUtils";
import { useNavigate } from "react-router";
import Error from "./Error";
import Search from "./Search";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalExpense, setModalExpense] = useState({});
  const [delFlag, setDelFlag] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffset] = useState(0);
  const [grossAmount, setGrossAmount] = useState(0);
  const [addCLicked, setAddClicked] = useState(false);
  const [expCopy, setExpCopy] = useState([]);
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  let nav = useNavigate();
  let status;
  let url =
    config.backendUrl +
    `/all?sort=${sortField},${sortDir}&size=${config.pageSize}&page=${pageNumber}`;

  useEffect(() => {
    fetch(url, {
      headers: { token: sessionStorage.getItem("token") },
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((res) => {
        if (status !== 200) {
          setIsLoading(false);

          nav("/error");
          return;
        }
        setExpenses(res.expenses.content);
        setIsLoading(false);
        let _total = res.expenses.content.reduce((a, b) => a + b.amount, 0);
        setTotal(_total);
        setTotalPages(res.expenses.totalPages);
        setOffset(res.expenses.pageable.offset);
        setGrossAmount(res.grossExpense);
        setExpCopy(res.expenses.content);
        // console.log("Hwdjhwh");
        // console.log(expCopy);
      })
      .catch((err) => {
        console.log(err);
        nav("/error");
      });
  }, [delFlag, pageNumber, sortField, sortDir]);

  let pageArr = createPaginationArray(totalPages, setPageNumber, pageNumber);

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  const sortAmount = () => {
    if (sortField === "amount") {
      // if clicked again on same, just change sorting direction
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    }
    setSortField("amount");
    // setUrl(
    //   config.backendUrl +
    //     `/all?sort=${sortField},${sortDir}&size=${config.pageSize}&page=${pageNumber}`
    // );
  };

  return (
    <div className="">
      {/* {addCLicked && <AddExpense setAddClicked={setAddClicked} />} */}
      <h2 style={{ display: "flex", justifyContent: "center" }}>Expenses</h2>
      <Search expenses={expCopy} setExpenses={setExpenses} />
      <table className="table">
        <thead className="thead">
          <tr className="">
            <th className="">Sr No</th>
            <th className="">Name</th>
            <th className="">Category</th>
            <th className="amount-head" onClick={sortAmount}>
              Amount
            </th>
            <th className="">Timestamp</th>
            <th
              className="btn btn-success col-md-10"
              style={{ color: "white", margin: "2px" }}
              onClick={() => {
                setAddClicked(true);
                document.querySelector(".modal-bg").classList.add("modal-open");
              }}
            >
              Add
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            return (
              <tr className="" key={expense.id}>
                <td className="col-md-1">{offset + index + 1}</td>
                <td className="col-md-2">{expense.name}</td>
                <td className="col-md-2">
                  {expense.category && expense.category.category
                    ? expense.category.category
                    : ""}
                </td>
                <td className="col-md-1">{expense.amount}</td>
                <td className="col-md-2">{calcTime(expense.date)}</td>
                <td className="col-md-2">
                  <button
                    className="btn btn-danger "
                    style={{ width: "5rem" }}
                    onClick={() =>
                      deleteExpense(expense.id, setDelFlag, delFlag)
                    }
                  >
                    Delete
                  </button>
                  <button
                    style={{ marginLeft: "0.2rem", width: "5rem" }}
                    className="btn btn-primary "
                    onClick={() => {
                      // editExpense(setModalExpense, expense, setModalOpen);
                      setModalOpen(true);

                      // document
                      //   .querySelector(".modal-bg-edit")
                      //   .classList.add("modal-open");
                      // console.log(expense);

                      nav("/edit", { state: { expense: expense } });
                      setModalExpense(expense);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
          <tr className="">
            <th className="">Page Total</th>
            <th className=""></th>
            <th className=""></th>

            <th className="">Rs {total}/-</th>
            <th className=""></th>
            <th className=""></th>
          </tr>
          <tr className="">
            <th className="">Gross Total</th>
            <th className=""></th>
            <th className=""></th>

            <th className="">Rs {grossAmount}/-</th>
            <th className=""></th>
            <th className=""></th>
          </tr>
        </tbody>
      </table>

      {<div id="pageNums">{pageArr}</div>}

      {/* {modalOpen && (
        <BaseModal expense={modalExpense} setModalOpen={setModalOpen} />
      )} */}
      {/* <BaseModal expense={modalExpense} setModalOpen={setModalOpen} /> */}

      <AddExpense />
    </div>
  );
};

export default ExpenseList;
