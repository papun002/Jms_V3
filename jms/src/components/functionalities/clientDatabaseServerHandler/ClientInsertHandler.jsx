import axios from "axios";
import React, { useEffect, useState } from "react";
import MessageDisplay from "../../alert/MessageDisplay";

const ClientStaffInsert = ({ data }) => {
  const [response, setResponse] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    try {
      if (data) {
        console.log("Data:", data);
        axios
          .post("http://localhost:4000/client/staffs/insertstaff", data,{
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            if (res) {
              console.log(res.data);
              setResponse({
                title: res.data.data,
                icon: "success",
                message: "",
              });
            } else {
              setResponse({
                title: "Error in Insert!",
                icon: "error",
                message: "Error in Insert!",
              });
            }
          });
      }
    } catch (error) {
      console.error("Error during staff insertion:", error);
      setResponse({
        title: "Error",
        icon: "error",
        message: "An error occurred while adding the staff.",
      });
    }
  }, [data]);

  return response && (
    <MessageDisplay
      title={response.title}
      icon={response.icon}
      message={response.message}
    />
  );
};

function ClientInsertHandler(cStaffInsert) {
  return (
    <div>{cStaffInsert ? <ClientStaffInsert data={cStaffInsert} /> : null}</div>
  );
}

export default ClientInsertHandler;
