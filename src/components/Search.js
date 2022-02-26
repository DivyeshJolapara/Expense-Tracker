import React from "react";

const Search = ({ expenses, setExpenses }) => {
  //   let expCopy = expenses;
  //   console.log("SEARCH");
  //   console.log(expenses);
  const handleSearch = (e) => {
    let filtered = expenses.filter(
      (expense) => expense.name.toLowerCase().indexOf(e.target.value) !== -1
    );
    // console.log(filtered);
    setExpenses(filtered);
  };
  return (
    <div className="col-md-3 bg-dark search">
      <label>Filter (for this page)</label>
      <input
        className="form-control"
        placeholder="Search"
        type="text"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
