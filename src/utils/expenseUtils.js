import config from "../config";

export const deleteExpense = (index, setDelFlag) => {
  fetch(config.backendUrl + "/delete/" + index, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .catch(() => {
      setDelFlag((prev) => !prev); //true ? false : true);
    })
    .finally(() => {
      setDelFlag((prev) => !prev); //delFlag ? false : true);
    });
  // console.log("deletd" + index);
};

export const editExpense = (setModalExpense, expense, setModalOpen) => {
  setModalExpense(expense);
  // setModalOpen(true);
};

export const createPaginationArray = (
  totalPages,
  setPageNumber,
  pageNumber
) => {
  let pageArr = [];
  for (let i = 0; i < totalPages; i++) {
    pageArr.push(
      <button
        className="btn"
        key={i}
        onClick={() => setPageNumber(i)}
        style={
          i === pageNumber
            ? { backgroundColor: "#e2b842", color: "black", fontWeight: "bold" }
            : { fontWeight: "bold", color: "gray", backgroundColor: "#fae09a" }
        }
      >
        {i + 1}
      </button>
    );
  }
  return pageArr;
};

export const shakeIt = (name) => {
  document.getElementsByClassName(name)[0].classList.add("shake");

  setTimeout(
    () => document.getElementsByClassName(name)[0].classList.remove("shake"),
    500
  );
};
