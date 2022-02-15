import React from "react";

const Error = ({ status }) => {
  return (
    <div className="errorPage">
      <h1>{status}Oops, Some error occurred.</h1>
    </div>
  );
};

export default Error;
