import React from "react";
import Sidebar from "../header/LeftSidebar";

function ClientSidebarEmbbed() {
  const ClientSidebarData = [
    { title: "Dashboard", path: "/", icon: "fa fa-home" },
    {
      title: "Staffs",
      path: "/staffs",
      icon: " fa fa-users",
      category: "staffs",
    },
    {
      category: "Stocks",
      title: "Category",
      icon: " fa fa-square",
      path: "/products/category",
    },
    {
      title: "Products",
      icon: " fa fa-product-hunt",
      path: "/products/products",
    },
    {
      category: "Orders",
      title: "Orders Section",
      icon: " fa fa-shopping-cart",
      path: "/orders/products",
    },
    {
      category: "Barcodes",
      title: "Barcodes",
      path: "/barcodes/generate-barcodes",
      icon: "fa fa-barcode",
    },
    { category: "Reports",title: "Selling History", path: "/reports", icon: "fa fa-bar-chart" },
  ];

  const srtIcon = [
    {
      path: "/",
      icon: "fa fa-envelope",
      text: "Inbox",
    },

    {
      path: "/",
      icon: "fa fa-bell",
      text: "Notifications",
    },
    {
      path: "/clients/profile",
      icon: "fa fa-user",
      text: "Profile",
    },
  ];
  return (
    <div>
      <Sidebar sideItem={ClientSidebarData} head={"Client"} srtIcon={srtIcon} />
    </div>
  );
}

export default ClientSidebarEmbbed;
