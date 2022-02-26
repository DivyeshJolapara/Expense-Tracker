export const calcTime = (ms) => {
  let date = new Date(ms);
  let formattedDate =
    // date.getDate() +
    // "/" +
    // (date.getMonth() + 1) +
    // "/" +
    // date.getFullYear() +
    // "   " +
    // date.getHours() +
    // ":" +
    // date.getMinutes() +
    // ":" +
    // date.getSeconds();
    date.toLocaleDateString() + " " + date.toLocaleTimeString();
  return formattedDate;
};

//yyyy-MM-ddThh:mm
export const timeForInputValue = (ms) => {
  let date = new Date(ms);

  let year = date.getFullYear();
  let month = "" + (date.getMonth() + 1);
  if (month.length === 1) month = "0" + month;
  let day = "" + date.getDate();
  if (day.length === 1) day = "0" + day;
  let hours = "" + date.getHours();
  if (hours.length === 1) hours = "0" + hours;
  let mins = "" + date.getMinutes();
  if (mins.length === 1) mins = "0" + mins;

  let formattedDate = year + "-" + month + "-" + day + "T" + hours + ":" + mins;

  return formattedDate;
};
