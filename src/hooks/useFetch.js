import React, { useState } from "react";

const useFetch = (url, properties) => {
  let [data, setData] = useState(null);
  let [error, setError] = useState(null);
  React.useEffect(() => {
    fetch(url, {
      headers: { token: sessionStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        setError(e);
      });

    return () => {};
  }, [url]);

  return [data, error];
};

export default useFetch;
