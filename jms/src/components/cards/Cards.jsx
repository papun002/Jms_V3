import React from "react";

const Cards = ({ cardData }) => {
  return (
    <>
      {cardData.map((item, index) => (
        <div key={index} className="col-xl-3 col-lg-3 col-md-6">
        <div className="card">
            <div className={`card-header`}>
                <h3 className="card-title">{item.title}</h3>
            </div>
            <div className={`card-body`}>
                <h5 className="number mb-0 font-32 counter">{item.value}</h5>
                {/* <span className="font-12">Measure How Fast... <a href="#">More</a></span> */}
            </div>
        </div>
    </div>
      ))}
    </>
  );
};

export default Cards;
