import React from "react";
import Cards from "../cards/Cards";

function AdminCardEmbbed() {
  const AdminCardData = [
    {
      title: "Total Users",
      value: 100,
    },
    {
      title: "Total Products",
      value: 99,
    },
    {
      title: "Total Orders",
      value: 80,
    },
    {
      title: "Total Orders",
      value: 80,
    },
    {
      title: "Total Orders",
      value: 80,
    },
    {
      title: "Total Orders",
      value: 80,
    },
    {
      title: "Total Orders",
      value: 80,
    },
    {
      title: "Total Orders",
      value: 80,
    },
  ];
  return (
    <div className="row">
      <Cards cardData={AdminCardData} />
    </div>
  );
}

export default AdminCardEmbbed;
