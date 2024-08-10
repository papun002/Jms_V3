import React from "react";
import Cards from "../../cards/Cards";

function SetRatesCard() {
  const setRatesData = [
    {
      title: "22K916 ",
      value: 80,
      anchor:'Click to Update'
    },
    {
      title: "22K ",
      value: 80,
       anchor:'Click to Update'
    },
    {
      title: "92 Silver ",
      value: 80,
       anchor:'Click to Update'
    },
    {
      title: "Silver",
      value: 80,
       anchor:'Click to Update'
    },
    {
        title: "HSN no",
        value: 80,
         anchor:'Click to Update'
      },
      {
        title: "Default MC",
        value: 80,
         anchor:'Click to Update'
      },
      {
        title: "Order Pen.",
        value: 80,
         anchor:'Click to Update'
      },    
      {
        title: "Non HUIDs",
        value: 80,
         anchor:'Click to Check'
      },    
  ];
  return <div className="row">
    <Cards cardData={setRatesData} />
  </div>;
}

export default SetRatesCard;
