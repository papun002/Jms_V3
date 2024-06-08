import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "../DataTable";


function OrderTable() {
  const [order, setOrder] = useState([]);
  const column = [
    { Header: "Date", accessor: "order_date" },
    { Header: "Name", accessor: "customer_name" },
    { Header: "Contact", accessor: "contact" },
    { Header: "Address", accessor: "address" },
    { Header: "Advance Type", accessor: "advance_type" },
    { Header: "Status", accessor: "sts" },
  ];
  const tablePass = {
    tablename: "Orders Details",
    delLink: "http://localhost:4000/client/pdt/productdelete",
  };
  const fetchProduct = async () => {
    axios
      .get("http://localhost:4000/client/order/getorders", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setOrder(res.data.data);
      })
      .catch((err) => console.error("Fetching Error", err));
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return <DataTable data={order} columns={column} tablePass={tablePass} />;
}

export default OrderTable;
