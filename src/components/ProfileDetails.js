import React from "react";
import config from "../config";
import useFetch from "../hooks/useFetch";

const ProfileDetails = () => {
  let [data, error] = useFetch(config.backendUrl + "/user/profile");
  if (!data) return <>Loading......</>;
  if (data)
    return (
      <div className="bg-white">
        ProfileDetails
        {data && JSON.stringify(data)}
      </div>
    );
};

export default ProfileDetails;
