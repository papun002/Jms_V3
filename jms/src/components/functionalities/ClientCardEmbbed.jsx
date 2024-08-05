import React from "react";
import Cards from "../cards/Cards";

function AdminCardEmbbed() {
  const AdminCardData = [
    {
      title: "Today's Sales",
      value: 100,
      cat: [
        { title: "Gold", value: "89786.00 gm" },
        { title: "Silver", value: "89786.00 gm" },],
    },
    {
      title: "Monthly Sales",
      value: 99,
      cat: [
        { title: "Gold", value: "89786.00 gm" },
        { title: "Silver", value: "89786.00 gm" },],
    },
    {
      title: "Yearly Sales",
      value: 80,
      cat: [
        { title: "Gold", value: "89786.00 gm" },
        { title: "Silver", value: "89786.00 gm" },],
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
