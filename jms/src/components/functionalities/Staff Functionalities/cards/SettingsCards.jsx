import React from "react";
import Cards from "../../../cards/Cards";


function SettingsCards() {
  const settingCardData = [
    {
      title: "Default MC",
      value: 899,
      anchor: "Click to Update"
    },
    {
      title: "HSN No.",
      value: 7113,
      anchor: "Click to Update"
    },
    {
      title: "Gold 22K916 ",
      value: 7688,
      anchor: "Click to Update"
    },
    {
      title: "Silver 92",
      value: 200,
      anchor: "Click to Update"
    },
    {
      title: "Silver",
      value: 92,
      anchor: "Click to Update"
    },
    {
        title: "Orders Pending",
        value: 12,
        anchor: "Click to Edit"
    }
  ];
  return <Cards cardData={settingCardData} />;
}

export default SettingsCards;
