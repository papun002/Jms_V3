import React from "react";
import "./sub.css";

function Subscription({ subType, price, priceDetails, handleSubBtn }) {
  return (
        <div className="col-lg-4 col-md-6">
          <div className="pricing">
            <div className="pricing-title">{subType}</div>
            <div className="pricing-padding">
              <div className="pricing-price">
                <div>&#x20B9;{price}</div>
                <div>{priceDetails}</div>
              </div>
              <div className="pricing-details">
                <div className="pricing-item">
                  <div className="pricing-item-icon bg-dark">
                    <i className="fa fa-right text-white"></i>
                  </div>
                  <div className="pricing-item-label">1 user agent</div>
                </div>
                <div className="pricing-item">
                  <div className="pricing-item-icon bg-dark">
                    <i className="fa fa-support text-white"></i>
                  </div>
                  <div className="pricing-item-label">Live Support</div>
                </div>
              </div>
            </div>
            <div className="pricing-cta">
              <a onClick={()=>handleSubBtn(price)}>
                Subscribe <i className="fa fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
  );
}

export default Subscription;
