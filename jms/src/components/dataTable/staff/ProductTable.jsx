import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "../DataTable";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const header = [
    { Header: "Barcode", accessor: "pbarcode" },
    { Header: "Name", accessor: "pname" },
    { Header: "Category", accessor: "cname" },
    { Header: "HUID", accessor: "phuid" },
    { Header: "Weight(gm)", accessor: "pweight" },
    { Header: "Desc", accessor: "pdescription" },
    { Header: "Status", accessor: "sts" },
  ];
  const tablePass = {
    tablename: "Product Details",
    delLink: "http://localhost:4000/staffs/pdt/productdelete",
  };
  const fetchProduct = async () => {
    axios
      .get("http://localhost:4000/staffs/pdt/getAllProducts", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProducts(res.data.data);
        // console.log("Product Data", res.data.data);
      })
      .catch((err) => console.error("Fetching Error", err));
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return <DataTable data={products} columns={header} tablePass={tablePass} />;
}

export default ProductTable;
