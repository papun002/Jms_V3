import React, { useEffect, useState } from "react";
import Sidebar from "../../../header/LeftSidebar";
import axios from "axios";

function StaffNavbar() {
  const [data, setData] = useState([]);

  const StaffSidebarData = [
    { title: "Dashboard", path: "/staff/dashboard", icon: "fa fa-home" },
    {
      category: "customer",
      title: "Customer Section",
      path: "/staff/customer",
      icon: " fa fa-users",
    },
    {
      category: "stocks",
      title: "Stocks Section",
      icon: " fa fa-product-hunt",
      path: "/staff/stocks",
    },
    {
      category: "Orders",
      title: "Orders Section",
      icon: " fa fa-shopping-cart",
      path: "/staff/orders",
    },
    {
      category: "Reports",
      title: "Selling Report",
      path: "/reports",
      icon: "fa fa-bar-chart",
    },
    { title: "GST Report", path: "/staff/gstreport", icon: "fa fa-line-chart" },
  ];

  const srtIcon = [
    {
      path: "/staff/dashboard",
      icon: "fa fa-home",
      text: "Dashboard",
    },
    {
      path: "/staff/customer",
      icon: "fa fa-users",
      text: "Customer Section",
    },
    {
      path: "/staff/stocks",
      icon: "fa fa-cube",
      text: "Stock Section",
    },
    {
      path: "/staff/orders",
      icon: "fa fa-gavel",
      text: "Order Section",
    },
    {
      path: "/staff/report",
      icon: "fa fa-folder-open",
      text: "Report",
    },
    {
      path: "/staff/profile",
      icon: "fa fa-user",
      text: "Profile",
    },
  ];

  // Fetching the data from the database
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/staffs/profile", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setData(res.data.data);
      // console.log("Data", res.data.data);
    } catch (error) {
      console.error("Fetching Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      <Sidebar
        sideItem={StaffSidebarData}
        head={"Staff"}
        srtIcon={srtIcon}
        data={data}
      />
    </div>
  );
}

export default StaffNavbar;
