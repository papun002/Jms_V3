import React from "react";

const Cards = ({ cardData }) => {
  return (
    <>
      {cardData.map((item, index) => (
        <>
          {item.cat ? (
            <div key={index} className="col-lg-6 col-md-6">
              <div className="card">
                <div className={`card-header`}>
                  <h3 className="card-title">{item.title}</h3>
                </div>
                <div className={`card-body`}>
                  <h5 className="number mb-0 font-25   counter">{item.value}</h5>
                  {/* <span className="font-12">Measure How Fast... <a href="#">More</a></span> */}
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between">
                    {item.cat.map((cat, index) => (
                      <div key={index} className="d-flex align-items-center">
                        <span className="text-dark">
                          <small>
                            {cat.title}: {cat.value}
                          </small>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="card">
                <div className={`card-header`}>
                  <h3 className="card-title">{item.title}</h3>
                </div>
                <div className={`card-body`}>
                  <h5 className="number mb-0 font-32 counter">{item.value}</h5>
                  {item.anchor &&(
                    
                     <span className="font-12"><a href="#">{item.anchor}</a></span>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default Cards;
