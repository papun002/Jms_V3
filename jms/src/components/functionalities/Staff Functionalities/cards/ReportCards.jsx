import React from "react";
import Cards from "../../../cards/Cards";

function ReportCards() {
  const CardData = [
    {
      title: "Today's Sales",
      value: 100,
      cat: [
        { title: "Gold", value: "89786.00 gm" },
        { title: "Silver", value: "89786.00 gm" },
      ],
    },
    {
      title: "Monthly Sales",
      value: 99,
      cat: [
        { title: "Gold", value: "89786.00 gm" },
        { title: "Silver", value: "89786.00 gm" },
      ],
    },
  ];
  return <Cards cardData={CardData} />;
}

export default ReportCards;
