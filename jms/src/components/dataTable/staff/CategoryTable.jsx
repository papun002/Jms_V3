import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "../DataTable";

function CategoryTable() {
  const [cat, setcat] = useState([]);
  const header = [
      { Header: "Category Type", accessor: "pdt_type" },
    { Header: "Category", accessor: "cat_name" }
  ];
  const tablePass = {
    tablename: "Category Details",
    delLink: "http://localhost:4000/staffs/cat/catdelete",
  };
  const fetchCat = async () => {
    axios
      .get("http://localhost:4000/staffs/cat/getAllcat", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setcat(res.data.data);
        console.log("Cat Data", res.data.data);
      })
      .catch((err) => console.error("Fetching Error", err));
  };
  useEffect(() => {
    fetchCat();
  }, []);
  return <DataTable data={cat} columns={header} tablePass={tablePass} />;
}

export default CategoryTable;
